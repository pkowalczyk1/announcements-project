import {SubjectInfo} from "./subject-info";

export interface Subject {
  id: string;
  name: string;
  infos: SubjectInfo[];
}
