import {SubjectInfo} from "./subject-info";
import {FileInfo} from "./file-info";

export interface Subject {
    id: string;
    name: string;
    infos: SubjectInfo[];
    files: FileInfo[];
}
