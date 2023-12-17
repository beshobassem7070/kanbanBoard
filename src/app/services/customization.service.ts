import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CustomizationService {
  constructor(private auth: AuthService, private fs: AngularFirestore) {}
  addColumnTitle(id: any, data: any) {
    return this.fs.collection(`user/${id}/columnTitle`).add(data);
  }

  getColumnsTitle(id: any) {
    return this.fs.collection(`user/${id}/columnTitle`).snapshotChanges();
  }

  editTodoColumnsTitle(data: any, id: any) {
    return this.fs
      .doc(`user/${this.auth.userId}/columnTitle/${id}`)
      .update(data);
  }
  editInprogressColumnsTitle(data: any, id: any) {
    return this.fs
      .doc(`user/${this.auth.userId}/columnTitle/${id}`)
      .update(data);
  }
  editDoneColumnsTitle(data: any, id: any) {
    return this.fs
      .doc(`user/${this.auth.userId}/columnTitle/${id}`)
      .update(data);
  }
}
