import {Injectable} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {FileUpload} from "../../model/file-upload";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {finalize} from "rxjs";
import firebase from "firebase/compat/app";
import firestore = firebase.firestore;
import {FileInfo} from "../../model/file-info";

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    private basePath: string = '/uploads';

    constructor(private storage: AngularFireStorage, private db: AngularFirestore) {
    }

    pushFileToStorage(fileUpload: FileUpload, directory: string): void {
        const filePath: string = `${this.basePath}/${directory}/${fileUpload.file.name}`;
        console.log(filePath);
        const storageRef = this.storage.ref(filePath);
        const uploadTask = this.storage.upload(filePath, fileUpload.file);

        uploadTask.snapshotChanges().pipe(
            finalize(() => {
                storageRef.getDownloadURL().subscribe(url => {
                    fileUpload.url = url;
                    fileUpload.name = fileUpload.file.name;
                    this.saveFileDataToDb(fileUpload, directory);
                });
            })
        ).subscribe();
    }

    saveFileDataToDb(fileUpload: FileUpload, id: string): void {
        this.db.collection('subjects2').doc(id).update({
            files: firestore.FieldValue.arrayUnion({name: fileUpload.name, url: fileUpload.url})
        });
    }

    removeFileFromDb(fileInfo: FileInfo, id: string): void {
        this.db.collection('subjects2').doc(id).update({
            files: firestore.FieldValue.arrayRemove({name: fileInfo.name, url: fileInfo.url})
        });
    }

    deleteFile(fileInfo: FileInfo, subjectId: string): void {
        this.storage.refFromURL(fileInfo.url).delete().pipe(
            finalize(() => this.removeFileFromDb(fileInfo, subjectId))
        ).subscribe();
    }
}
