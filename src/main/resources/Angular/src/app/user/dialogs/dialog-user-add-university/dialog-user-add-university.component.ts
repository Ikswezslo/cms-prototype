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

@Component({
  selector: 'app-dialog-user-add-university',
  templateUrl: './dialog-user-add-university.component.html',
  styleUrls: ['./dialog-user-add-university.component.scss']
})
export class DialogUserAddUniversityComponent implements OnInit {

  @ViewChild('universityInput') universityInput!: ElementRef<HTMLInputElement>;
  universityControl = new FormControl<string | University>('');
  availableUniversities: University[] = [];
  selectedUniversities: University[] = [];
  filteredUniversities!: Observable<University[]>;

  constructor(public dialogRef: MatDialogRef<DialogUserAddUniversityComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private universityService: UniversityService,
              private userService: UserService) {
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
            this.availableUniversities = res;
            this.universityControl.setValue("");
          });
      } else {
        this.availableUniversities = this.userService.loggedUser?.enrolledUniversities ?? []
        this.universityControl.setValue("");
      }
    }
  }

  private _filter(name: string): University[] {
    const filterValue = name.toLowerCase();
    return this.availableUniversities.filter(option => option.name.toLowerCase().includes(filterValue));
  }
}
