import {Page} from "./page";
import {User} from "./user";

export interface University {
  id: number;
  name: string;
  shortName: string;
  mainPage: Page;
  enrolledUsers: User[];
  hidden: boolean;
}

export interface UniversityForm {
  name: string;
  shortName: string;
  creatorUsername: string;
}
