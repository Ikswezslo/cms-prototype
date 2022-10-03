import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {UniversityService} from "../../../assets/service/university.service";
import {FormControl, Validators} from "@angular/forms";
import {UniversityForm} from 'src/assets/models/university';

@Component({
  selector: 'app-dialog-university-create',
  templateUrl: './dialog-university-create.component.html',
  styleUrls: ['./dialog-university-create.component.scss']
})
export class DialogUniversityCreateComponent implements OnInit {

  readonly university = {} as UniversityForm;
  nameValid = new FormControl('', Validators["required"]);
  shortNameValid = new FormControl('', Validators["required"]);

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
      this.universityService.addNewUniversity(this.university).subscribe({next: university => console.log(university)});
    }
    this.close();
  }
}
