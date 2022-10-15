import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {University} from "../../../../assets/models/university";
import {map, Observable, startWith} from "rxjs";
import {UniversityService} from "../../../../assets/service/university.service";
import {UserService} from "../../../../assets/service/user.service";

@Component({
  selector: 'app-dialog-user-add-university',
  templateUrl: './dialog-user-add-university.component.html',
  styleUrls: ['./dialog-user-add-university.component.scss']
})
export class DialogUserAddUniversityComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogUserAddUniversityComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private universityService: UniversityService,
              private userService: UserService) {
        dialogRef.disableClose = true;
    }

    universityControl = new FormControl<string | University>('', [this.objectTypeValidator()]);
    options: University[] = [];
    filteredOptions!: Observable<University[]>;
    exiting: boolean = false;

    ngOnInit(): void {
        this.loadUniversities();

        this.filteredOptions = this.universityControl.valueChanges.pipe(
            startWith(''),
            map(value => {
                const name = typeof value === 'string' ? value : value?.name;
                return name ? this._filter(name as string) : this.options.slice();
            }),
        );
    }

    private objectTypeValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const valid = typeof control.value === "object";
            return valid ? null : {forbiddenType: {value: control.value}};
        };
    }

    loadUniversities() {
        this.universityService.getUniversities()
            .subscribe(res => {
                this.options = res;
                this.universityControl.setValue("");
            });
    }

    displayFn(university: University): string {
        return university && university.name ? university.name : '';
    }

    private _filter(name: string): University[] {
        const filterValue = name.toLowerCase();

        return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
    }

    addUniversity(university: any) {
        if (this.data.user) {
            this.exiting = true;
            this.userService.addUniversityToUser(this.data.user.id, university).subscribe(user => {
                this.dialogRef.close(user);
            })
        }
    }
}
