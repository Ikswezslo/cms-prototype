import {University} from "./university";

export interface Template {
  id: number;
  name: string;
  content: string;
  universities: University[];
}
