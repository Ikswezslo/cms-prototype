import {University} from "./university";

export interface User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    accountType: string;
    enabled: boolean;
    enrolledUniversities: University[];
}

export interface UserForm {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    accountType: string;
}

