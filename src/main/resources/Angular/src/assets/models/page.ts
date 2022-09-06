import {University} from "./university";
import {User} from "./user";

export interface Page {
    id: number;
    title: string;
    creator: User;
    hidden: boolean;
    content: string;
    parent: Page;
    university: University;
    children: Page[];
    createdOn: string;
    updatedOn: string;
}
