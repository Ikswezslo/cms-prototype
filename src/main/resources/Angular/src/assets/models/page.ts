import {University} from "./university";
import {User} from "./user";

export interface Page {
    id: number;
    title: string;
    creator: User;
    description: string;
    hidden: boolean;
    content: string;
    parent: Page;
    university: University;
    children: Page[];
    createdOn: string;
    updatedOn: string;
    keyWords: string;
}
export interface PageForm {
  id: number;
  title: string;
  description: string;
  content: string;
  creatorId: number;
  parentId: number;
  keyWords: string;
}

export interface PageUpdateForm {
  title: string;
  description: string;
}
