import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UniversityService} from "../../assets/service/university.service";
import {UniversityForm} from "../../assets/models/university";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-dialog-university-create',
  templateUrl: './dialog-university-create.component.html',
  styleUrls: ['./dialog-university-create.component.scss']
})
export class DialogUniversityCreateComponent implements OnInit {

  readonly university = {} as UniversityForm;
  nameValid = new FormControl('', Validators["required"]);
  shortNameValid = new FormControl('', Validators["required"]);
  hide = true;


  constructor(
    public dialog: MatDialog,
    private universityService: UniversityService,) {}

  ngOnInit(): void {
    this.university.creatorUsername = "admin";  //TODO: Pobrać aktualnego użytkownika skądś
  }
  close() {
    this.dialog.closeAll()
  }
  createUniversity(){
    if(this.nameValid.status == 'VALID' && this.shortNameValid.status == 'VALID'){
      this.universityService.addNewUniveristy(this.university).subscribe({next: university => console.log(university)});
    }
    this.close();
  }
}
