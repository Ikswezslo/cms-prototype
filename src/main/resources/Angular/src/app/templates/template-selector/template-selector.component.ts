import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {Template} from "../../../assets/models/template";
import {TemplateService} from "../../../assets/service/template.service";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-template-selector',
  templateUrl: './template-selector.component.html',
  styleUrls: ['./template-selector.component.scss']
})
export class TemplateSelectorComponent implements OnInit {

  @Input() universityId?: number;
  @Input() form?: FormGroup;
  @Output() templateChanged = new EventEmitter<Template>;
  safeContent?: SafeHtml;
  templateControl = new FormControl<string | Template>('', [this.objectTypeValidator()]);
  options: Template[] = [];
  filteredOptions!: Observable<Template[]>;

  constructor(private templateService: TemplateService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.loadTemplates();
    this.templateControl.statusChanges.subscribe(status => {
      if (status === "VALID") {
        let value: Template = this.templateControl.value as Template;
        this.safeContent = this.sanitizer.bypassSecurityTrustHtml(value.content);
        this.templateChanged.emit(value);
      } else {
        this.safeContent = undefined;
        this.templateChanged.emit(undefined);
      }
    })

    this.filteredOptions = this.templateControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );

    if(this.form) {
      this.form.addControl("template", this.templateControl);
    }
  }

  private objectTypeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = typeof control.value === "object";
      return valid ? null : {forbiddenType: {value: control.value}};
    };
  }

  loadTemplates() {
    if (this.universityId) {
      this.templateService.getUniversityTemplates(this.universityId)
        .subscribe(res => {
          this.options = [
            {
              id: 0,
              name: "Pusty Szablon",
              content: "",
              universities: []
            },
            ...res];
          this.templateControl.setValue("");
        });
    }
  }

  displayFn(template: Template): string {
    return template && template.name ? template.name : '';
  }

  private _filter(name: string): Template[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  clearValue() {
    this.templateControl.setValue(null);
    this.safeContent = undefined;
  }
}
