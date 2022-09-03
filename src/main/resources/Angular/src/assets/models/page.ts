import { university } from "./university";
import { User } from "./user";

export interface page {
    id: number;
    title: string;
    creator: User;
    hidden: boolean;
    content: string;
    parent: page;
    university: university;
    children: page[];
}