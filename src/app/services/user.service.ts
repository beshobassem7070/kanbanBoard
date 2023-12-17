import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private fs: AngularFirestore,
    private storage: AngularFireStorage,
    private toastr: ToastrService
  ) {}

  addNewUser(id: any, name: any, email: any) {
    return this.fs.doc('user/' + id).set({ name, email });
  }

  getUser(id: any) {
    // return this.fs.doc('user/' + id).get();
    // return this.fs.collection('user').doc(id).get();
    return this.fs.collection(`user`).doc(id).snapshotChanges();
  }

  addProfilePic(pic: File, id: any) {
    let ref = this.storage.ref('user/' + pic.name);
    ref.put(pic).then((res) => {
      console.log('pic', res);
      ref.getDownloadURL().subscribe((picUrl) => {
        this.fs.doc('user/' + id).update({ profilePic: picUrl });
        this.toastr.success('Your Profile Pic Upload Succesfully', 'Success!');
      });
    });
  }
}
