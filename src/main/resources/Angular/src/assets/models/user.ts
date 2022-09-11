export interface User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    accountType: string;
    isAccountDisabled: boolean;
    enrolledUniversities?: [];
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

