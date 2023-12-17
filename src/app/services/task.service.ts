import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  user: Observable<firebase.default.User | null>;
  constructor(
    private auth: AuthService,
    private fs: AngularFirestore,
    private fireAuth: AngularFireAuth
  ) {
    this.user = fireAuth.user;
  }

  addNewTodoTask(data: any) {
    return this.fs.collection(`user/${this.auth.userId}/todoTasks`).add(data);
  }
  getTodoTasksList(id: any) {
    return this.fs.collection(`user/${id}/todoTasks`).snapshotChanges();
  }

  addNewInprogressTask(data: any) {
    return this.fs
      .collection(`user/${this.auth.userId}/inprogressTasks`)
      .add(data);
  }
  getInprogressTasksList() {
    return this.fs
      .collection(`user/${this.auth.userId}/inprogressTasks`)
      .snapshotChanges();
  }

  addNewDoneTask(data: any) {
    return this.fs.collection(`user/${this.auth.userId}/doneTasks`).add(data);
  }
  getDoneTasksList() {
    return this.fs
      .collection(`user/${this.auth.userId}/doneTasks`)
      .snapshotChanges();
  }

  deleteTask(id: any, phase: any) {
    return this.fs.doc(`user/${this.auth.userId}/${phase}/${id}`).delete();
  }

  editTodoTask(id: any, data: any) {
    return this.fs.doc(`user/${this.auth.userId}/todoTasks/${id}`).update(data);
  }
  editInprogressTask(id: any, data: any) {
    return this.fs
      .doc(`user/${this.auth.userId}/inprogressTasks/${id}`)
      .update(data);
  }
  editDoneTask(id: any, data: any) {
    return this.fs.doc(`user/${this.auth.userId}/doneTasks/${id}`).update(data);
  }

  // deleteInprogressTask(id: any) {
  //   return this.fs.doc(`user/${this.auth.userId}/inprogressTasks/${id}`).delete();
  // }
  // deleteDoneTask(id: any) {
  //   return this.fs.doc(`user/${this.auth.userId}/doneTasks/${id}`).delete();
  // }
}
