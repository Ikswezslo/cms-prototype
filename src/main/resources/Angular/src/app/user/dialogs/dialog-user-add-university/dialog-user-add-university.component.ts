import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {University} from "../../../../assets/models/university";
import {UniversityService} from "../../../../assets/service/university.service";
import {UserService} from "../../../../assets/service/user.service";

@Component({
  selector: 'app-dialog-user-add-university',
  templateUrl: './dialog-user-add-university.component.html',
  styleUrls: ['./dialog-user-add-university.component.scss']
})
export class DialogUserAddUniversityComponent implements OnInit {

  exiting: boolean = false;
  selectedUniversity?: University;

  constructor(public dialogRef: MatDialogRef<DialogUserAddUniversityComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private universityService: UniversityService,
              private userService: UserService) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }

  addUniversity() {
    if (this.data.user && this.selectedUniversity) {
      this.exiting = true;
      this.userService.addUniversityToUser(this.data.user.id, this.selectedUniversity).subscribe({
        next: user => {
          this.dialogRef.close(user);
        },
        error: () => {
          this.exiting = false;
        }
      })
    }
  }

  onUniversityChanged(university: University) {
    this.selectedUniversity = university;
  }
}
