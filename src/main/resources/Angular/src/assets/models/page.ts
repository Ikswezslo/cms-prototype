import { University } from "./university";
import { User } from "./user";
import {Timestamp} from "rxjs";

export interface Page {
    id: number;
    title: string;
    creator: User;
    hidden: boolean;
    content: string;
    parent: Page;
    university: University;
    children: Page[];
    createdOn: Timestamp<any>;
    updatedOn: Timestamp<any>;
}
