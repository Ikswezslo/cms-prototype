import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {UniversityService} from "../../../assets/service/university.service";
import {FormControl, Validators} from "@angular/forms";
import {University, UniversityForm} from 'src/assets/models/university';

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
    private universityService: UniversityService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {
    this.edit = this.data.edit ?? this.edit;
    this.changeUniversityToForm();
    this.university.creatorUsername = "admin";  //TODO: Pobrać aktualnego użytkownika skądś
  }

  changeUniversityToForm(){
    this.university.id = this.data.university?.id ?? this.university.id;
    this.university.name = this.data.university?.name ?? this.university.name;
    this.university.shortName = this.data.university?.shortName ?? this.university.shortName;
    this.university.description = this.data.university?.description ?? this.university.description;
  }
  close() {
    this.dialog.closeAll()
  }
  createUniversity(){
    if(this.nameValid.status == 'VALID' && this.shortNameValid.status == 'VALID' && this.descriptionValid.status == 'VALID'){
      this.universityService.addNewUniversity(this.university).subscribe({next: university => console.log(university)});
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
