import { Component, OnInit } from '@angular/core';
import {Template} from "../../../assets/models/template";
import {University} from "../../../assets/models/university";
import {DialogService} from "../../../assets/service/dialog.service";

@Component({
  selector: 'app-templates-list',
  templateUrl: './templates-list.component.html',
  styleUrls: ['./templates-list.component.scss']
})
export class TemplatesListComponent implements OnInit {

  isEditMode: boolean = false;
  selectedTemplate?: TemplateItem;

  constructor(private dialogService: DialogService) { }

  templates: TemplateItem[] = [
    {id: 1, name: "Template A", universities: [{id: 1} as University], content: "Content A"},
    {id: 2, name: "Template B", universities: [], content: "Content B"},
    {id: 3, name: "Template C", universities: [], content: "Content C"},
    {id: 4, name: "Template D", universities: [], content: "Content D"},
    {id: 5, name: "Template E", universities: [], content: "Content E"},
    {id: 6, name: "Template F", universities: [], content: "Content F"},
    {id: 7, name: "Template G", universities: [], content: "Content G"},
    {id: 8, name: "Template H", universities: [], content: "Content H"},
    {id: 9, name: "Template I", universities: [], content: "Content I"},
    {id: 10, name: "Template J", universities: [], content: "Content J"},
    {id: 11, name: "Template K", universities: [], content: "Content K"},
    {id: 12, name: "Template L", universities: [], content: "Content L"},
    {id: 13, name: "Template M", universities: [], content: "Content M"},
    {id: 14, name: "Template N", universities: [], content: "Content N"},
    {id: 15, name: "Template O", universities: [], content: "Content O"},
    {id: 16, name: "Template P", universities: [], content: "Content P"},
  ];

  ngOnInit(): void {
  }

  selectTemplate(template: TemplateItem) {
    this.selectedTemplate = template;
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  onUniversityChanged(university: University) {
    console.log(university)
    if(university) {
      this.templates.forEach(template => {
          template.assigned = template.universities.map(value => value.id).includes(university.id);
      })
    }
    else {
      this.templates.forEach(template => {
        template.assigned = undefined;
      })
    }
  }

  onDelete() {
    this.dialogService.openConfirmationDialog();
  }
}

interface TemplateItem extends Template {
  assigned?: boolean;
}
