import {Component, OnInit} from '@angular/core';
import {BackupService} from "../../../assets/service/backup.service";
import {Backup} from "../../../assets/models/backup";
import {DialogService} from "../../../assets/service/dialog.service";

@Component({
  selector: 'app-backup-list',
  templateUrl: './backup-list.component.html',
  styleUrls: ['./backup-list.component.scss']
})
export class BackupListComponent implements OnInit {

  backups: BackupItem[] = [];

  constructor(
    private backupService: BackupService,
    private dialogService: DialogService
  ) {
  }

  ngOnInit(): void {
    this.loadBackups();
  }

  loadBackups() {
    this.backupService.getBackups().subscribe(next => {
      this.backups = next.sort((a, b) => b.name.localeCompare(a.name))
        .map((value, index) => {
          return {...value, position: index + 1} as BackupItem
        });
    });
  }

  displayedColumns: string[] = ['position', 'date', 'size', 'actions'];

  createBackup() {
    this.dialogService.openConfirmationDialog().afterClosed().subscribe(value => {
      if (value) {
        this.backupService.createBackup().subscribe(next => {
          this.dialogService.openSuccessDialog("Kopia zapasowa została utworzona");
          this.loadBackups();
        })
      }
    })
  }
}

interface BackupItem extends Backup {
  position: number;
}
