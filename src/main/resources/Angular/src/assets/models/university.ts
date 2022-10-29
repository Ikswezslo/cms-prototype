import {Page} from "./page";
import {User} from "./user";

export interface University {
  id: number;
  name: string;
  shortName: string;
  description: string;
  mainPage: Page;
  enrolledUsers: User[];
  hidden: boolean;
}

export interface UniversityForm {
  id: number;
  name: string;
  shortName: string;
  description: string;
  creatorUsername: string;
}
