import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UniversityService} from "../../../assets/service/university.service";
import {FormControl, Validators} from "@angular/forms";
import {University, UniversityForm} from 'src/assets/models/university';
import {UserService} from 'src/assets/service/user.service';
import {DialogService} from 'src/assets/service/dialog.service';
import {TranslateService} from '@ngx-translate/core';

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
    public dialogRef: MatDialogRef<DialogUniversityCreateComponent>,
    public dialog: MatDialog,
    private userService: UserService,
    private dialogService: DialogService,
    private universityService: UniversityService,
    private translate: TranslateService,
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
    if (this.nameValid.status == 'VALID' && this.shortNameValid.status == 'VALID' && this.descriptionValid.status == 'VALID') {
      this.universityService.addNewUniversity(this.university).subscribe({
        next: () => {
          this.dialogService.openSuccessDialog(this.translate.instant("ADDED_UNIVERSITY"));
          this.dialogRef.close(true);
        }
      });
      this.close();
    }
  }

  editUniversity() {
    if (this.nameValid.status == 'VALID' && this.shortNameValid.status == 'VALID' && this.descriptionValid.status == 'VALID') {
      this.universityService.editUniversity(this.university).subscribe({
        next: university => this.dialogRef.close(university)
      });
    }
  }
}

export interface DialogData {
  edit?: boolean;
  university?: University;
}
