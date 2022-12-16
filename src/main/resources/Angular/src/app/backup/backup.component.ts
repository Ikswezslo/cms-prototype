import {Component, OnInit} from '@angular/core';
import {BackupService} from "../../assets/service/backup.service";
import {Backup} from "../../assets/models/backup";
import {DialogService} from "../../assets/service/dialog.service";
import {saveAs} from 'file-saver';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.scss']
})
export class BackupComponent implements OnInit {

  backups: BackupItem[] = [];
  timeSinceLastBackup = "";
  createBackupPending: boolean = false;

  constructor(
    private backupService: BackupService,
    private dialogService: DialogService,
    private translateService: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.loadBackups();
  }

  loadBackups() {
    this.backupService.getBackups().subscribe(next => {
      this.backups = next.sort((a, b) => b.name.localeCompare(a.name))
        .map((value, index, array) => {
          return {...value, position: array.length - index} as BackupItem
        });
      this.updateTimeSinceLastBackup();
    });
  }

  displayedColumns: string[] = ['position', 'date', 'size', 'actions'];

  createBackup() {
    this.dialogService.openConfirmationDialog().afterClosed().subscribe(value => {
      if (value) {
        this.createBackupPending = true;
        this.backupService.createBackup().subscribe(() => {
          this.dialogService.openSuccessDialog(this.translateService.instant('BACKUP.CREATE_SUCCESS'));
          this.createBackupPending = false;
          this.loadBackups();
        })
      }
    })
  }

  downloadBackup(backup: BackupItem) {
    this.backupService.downloadBackup(backup.name).subscribe(blob => {
      saveAs(blob, `${backup.name}.zip`);
    })
  }

  deleteBackup(backup: BackupItem) {
    this.dialogService.openConfirmationDialog().afterClosed().subscribe(value => {
      if (value) {
        this.backupService.deleteBackup(backup.name).subscribe(() => {
          this.dialogService.openSuccessDialog(this.translateService.instant('BACKUP.DELETE_SUCCESS'));
          this.loadBackups();
        });
      }
    });
  }

  updateTimeSinceLastBackup() {
    if (this.backups.length > 0 && this.backups[0].name) {
      const milliseconds: number = Date.now() - Number.parseInt(this.backups[0].name);
      const seconds = Math.floor(milliseconds / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      let result = ''
      if (days > 0) {
        result += ` ${days} d`
      }
      if (hours > 0) {
        result += ` ${hours % 24} h`
      }
      result += ` ${minutes % 60} min`;

      this.timeSinceLastBackup = result;
    } else {
      this.timeSinceLastBackup = this.translateService.instant('BACKUP.NO_BACKUPS')
    }
  }
}

interface BackupItem extends Backup {
  position: number;
}
