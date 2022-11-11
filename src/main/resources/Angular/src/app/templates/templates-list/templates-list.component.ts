import {Component, OnInit} from '@angular/core';
import {Template} from "../../../assets/models/template";
import {University} from "../../../assets/models/university";
import {DialogService} from "../../../assets/service/dialog.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {TemplateService} from "../../../assets/service/template.service";
import {SpinnerService} from "../../../assets/service/spinner.service";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {MatDialog} from "@angular/material/dialog";
import {DialogTemplateCreateComponent} from "../dialog-template-create/dialog-template-create.component";
import {DialogTemplateChangeNameComponent} from "../dialog-template-change-name/dialog-template-change-name.component";

@Component({
  selector: 'app-templates-list',
  templateUrl: './templates-list.component.html',
  styleUrls: ['./templates-list.component.scss']
})
export class TemplatesListComponent implements OnInit {

  isEditMode: boolean = false;
  selectedTemplate?: TemplateItem;
  selectedUniversity?: University;

  constructor(private dialogService: DialogService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private templateService: TemplateService,
              private spinnerService: SpinnerService,
              private sanitizer: DomSanitizer,
              private dialog: MatDialog) {
  }

  templates: TemplateItem[] = [];

  ngOnInit(): void {
    this.loadTemplates();

    this.activatedRoute.queryParams.subscribe(params => {
      let id: number = Number(params['id']);
      this.selectedTemplate = this.templates.filter(template => template.id === id)[0];
    })
  }

  loadTemplates() {
    this.spinnerService.show();
    this.templateService.getAllTemplates()
      .subscribe({
        next: res => {
          this.templates = res;
          this.spinnerService.hide();
          this.templates.forEach(template => {
            template.safeContent = this.sanitizer.bypassSecurityTrustHtml(template.content);
          })
        },
        error: err => {
          this.spinnerService.hide();
          if (err.status !== 401)
            this.dialogService.openDataErrorDialog();
        }
      });
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode) {
      this.onUniversityChanged(undefined);
    }
  }

  onUniversityChanged(university?: University) {
    this.selectedUniversity = university;
    if (university) {
      this.templates.forEach(template => {
        template.assigned = template.universities.map(value => value.id).includes(university.id);
      })
    } else {
      this.templates.forEach(template => {
        template.assigned = undefined;
      })
    }
  }

  onDelete() {
    this.dialogService.openConfirmationDialog().afterClosed().subscribe(value => {
      if (value && this.selectedTemplate) {
        this.templates = this.templates.filter(template => {
          return template.id !== this.selectedTemplate?.id;
        })
        this.templateService.deleteTemplate(this.selectedTemplate.id).subscribe({
          next: () => {
            this.router.navigate(
              [],
              {
                relativeTo: this.activatedRoute,
              });
          }
        });
      }
    });
  }

  onTemplateClicked(id: number) {
    const queryParams: Params = {id: id};
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: queryParams,
      });
  }

  onAddUniversity() {
    if (this.selectedTemplate && this.selectedUniversity) {
      this.templateService.addUniversityToTemplate(this.selectedTemplate.id, this.selectedUniversity.id).subscribe({
        next: res => {
          this.templates = this.templates.map(template => {
            if (template.id === res.id) {
              template = res as TemplateItem;
              template.assigned = true;
              template.safeContent = this.sanitizer.bypassSecurityTrustHtml(template.content);
              this.selectedTemplate = template;
              return res;
            }
            return template;
          })
        }
      });
    }
  }

  onRemoveUniversity() {
    if (this.selectedTemplate && this.selectedUniversity) {
      this.templateService.removeUniversityFromTemplate(this.selectedTemplate.id, this.selectedUniversity.id).subscribe({
        next: res => {
          this.templates = this.templates.map(template => {
            if (template.id === res.id) {
              template = res as TemplateItem;
              template.assigned = false;
              template.safeContent = this.sanitizer.bypassSecurityTrustHtml(template.content);
              this.selectedTemplate = template;
              return res;
            }
            return template;
          })
        }
      });
    }
  }

  onAddTemplate() {
    const dialogRef = this.dialog.open(DialogTemplateCreateComponent);

    dialogRef.afterClosed().subscribe(next => {
      if (next) {
        this.templates.push(next);
        this.onTemplateClicked(next.id);
      }
    })

  }

  onEdit() {
    if (this.selectedTemplate) {
      this.router.navigateByUrl(`/template/${this.selectedTemplate.id}/edit`);
    }
  }

  onChangeName() {
    if (this.selectedTemplate) {
      const dialogRef = this.dialog.open(DialogTemplateChangeNameComponent, {
          data: {id: this.selectedTemplate.id}
        }
      );

      dialogRef.afterClosed().subscribe(next => {
        if (next && this.selectedTemplate) {
          this.selectedTemplate.name = next;
          this.templates.forEach(template => {
            if (template.id === this.selectedTemplate?.id) {
              template.name = next;
            }
          });
        }
      })
    }
  }
}

interface TemplateItem extends Template {
  assigned?: boolean;
  safeContent?: SafeHtml;
}
