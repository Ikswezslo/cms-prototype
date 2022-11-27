import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {UniversityService} from "../../../assets/service/university.service";
import {FormControl, Validators} from "@angular/forms";
import {University, UniversityForm} from 'src/assets/models/university';
import {UserService} from 'src/assets/service/user.service';
import { DialogService } from 'src/assets/service/dialog.service';

@Component({
  selector: 'app-dialog-university-create',
  templateUrl: './dialog-university-create.component.html',
  styleUrls: ['./dialog-university-create.component.scss']
})
export class DialogUniversityCreateComponent implements OnInit {
  readonly university = {} as UniversityForm;
  nameValid = new FormControl('', Validators["required"]);
  shortNameValid = new FormControl('', Validators["required"]);
  descriptionValid = new FormControl('', Validators["required"]);
  edit = false;

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private dialogService: DialogService,
    private universityService: UniversityService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {
    this.edit = this.data.edit ?? this.edit;
    this.changeUniversityToForm();
  }

  changeUniversityToForm(){
    this.university.id = this.data.university?.id ?? this.university.id;
    this.university.name = this.data.university?.name ?? this.university.name;
    this.university.shortName = this.data.university?.shortName ?? this.university.shortName;
    this.university.description = this.data.university?.description ?? this.university.description;
    this.university.creatorId = this.userService.loggedUser?.id ?? 0;
  }
  close() {
    this.dialog.closeAll()
  }
  createUniversity(){
    if(this.nameValid.status == 'VALID' && this.shortNameValid.status == 'VALID' && this.descriptionValid.status == 'VALID'){
      this.universityService.addNewUniversity(this.university).subscribe({
        next: university => {
          this.dialogService.openConfirmationDialog("ADDED_UNIVERSITY");
        },
        error: err => {
          this.dialogService.openDataErrorDialog("ADDED_UNIVERSITY_ERROR");
        }
      });
      this.close();
    }
  }
  editUser() {
    if(this.nameValid.status == 'VALID' && this.shortNameValid.status == 'VALID' && this.descriptionValid.status == 'VALID'){
      this.universityService.editUniversity(this.university).subscribe({next: university => console.log(university)});
      this.close();
    }
  }
}

export interface DialogData {
  edit?: boolean;
  university?: University;
}
