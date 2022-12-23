import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {University} from "../../../../assets/models/university";
import {UniversityService} from "../../../../assets/service/university.service";
import {UserService} from "../../../../assets/service/user.service";
import {map, Observable, startWith} from "rxjs";
import {FormControl} from "@angular/forms";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {User} from "../../../../assets/models/user";
import {DialogService} from "../../../../assets/service/dialog.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-dialog-user-enrolled-universities',
  templateUrl: './dialog-user-enrolled-universities.component.html',
  styleUrls: ['./dialog-user-enrolled-universities.component.scss']
})
export class DialogUserEnrolledUniversitiesComponent implements OnInit {

  @ViewChild('universityInput') universityInput!: ElementRef<HTMLInputElement>;
  universityControl = new FormControl<string | University>('');
  availableUniversities: University[] = [];
  selectedUniversities: University[] = [];
  filteredUniversities!: Observable<University[]>;
  pending: Boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogUserEnrolledUniversitiesComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private universityService: UniversityService,
              private userService: UserService,
              private dialogService: DialogService,
              private translate: TranslateService) {
    dialogRef.disableClose = true;

    this.filteredUniversities = this.universityControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.availableUniversities.slice();
      }),
    );
  }

  ngOnInit(): void {
    this.loadUniversities();
  }

  onEnter(event: MatChipInputEvent): void {
    event.chipInput!.clear();
    this.universityControl.setValue(null);
  }

  remove(university: University): void {
    this.availableUniversities.push(university);
    const index = this.selectedUniversities.indexOf(university);
    if (index >= 0) {
      this.selectedUniversities.splice(index, 1);
    }
    this.universityControl.setValue(null);
    this.universityInput.nativeElement.value = '';
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedUniversities.push(event.option.value);
    const index = this.availableUniversities.indexOf(event.option.value);
    if (index >= 0) {
      this.availableUniversities.splice(index, 1);
    }
    this.universityInput.nativeElement.value = '';
    this.universityControl.setValue(null);
  }

  loadUniversities() {
    if (this.userService.loggedUser) {
      let loggedUser: User = this.userService.loggedUser;
      if (loggedUser.accountType === "ADMIN") {
        this.universityService.getUniversities()
          .subscribe(res => {
            this.selectedUniversities = [...this.data.user.enrolledUniversities];
            this.availableUniversities = res.filter(u => !this.selectedUniversities.map(x => x.id).includes(u.id));
            this.universityControl.setValue("");
          });
      } else {
        this.selectedUniversities = [...this.data.user.enrolledUniversities];
        this.availableUniversities = this.userService.loggedUser?.enrolledUniversities
          .filter(u => !this.selectedUniversities.map(x => x.id).includes(u.id)) ?? [];
        this.universityControl.setValue("");
      }
    }
  }

  private _filter(name: string): University[] {
    const filterValue = name.toLowerCase();
    return this.availableUniversities.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  updateEnrolledUniversities() {
    this.dialogService.openConfirmationDialog().afterClosed().subscribe(value => {
      if (value && this.data.user) {
        this.pending = true;
        this.userService.updateUserEnrolledUniversities(this.data.user.id, this.selectedUniversities.map(u => u.id))
          .subscribe({
            next: user => {
              this.dialogService.openSuccessDialog(this.translate.instant("USER_ENROLLED"));
              this.dialogRef.close(user);
            },
            error: () => {
              this.pending = false;
            }
          })
      }
    })
  }

  isChipDisabled(university: University): boolean {
    return this.userService.loggedUser?.accountType === "MODERATOR" &&
      !this.userService.loggedUser.enrolledUniversities.map(u => u.id).includes(university.id);
  }
}
