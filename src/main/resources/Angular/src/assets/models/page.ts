import { university } from "./university";
import { User } from "./user";
import {Timestamp} from "rxjs";

export interface page {
    id: number;
    title: string;
    creator: User;
    hidden: boolean;
    content: string;
    parent: page;
    university: university;
    children: page[];
    createdOn: Timestamp<any>;
    updatedOn: Timestamp<any>;
}
