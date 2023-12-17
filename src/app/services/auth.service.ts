import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: Observable<firebase.default.User | null>;
  userId: string = '';
  constructor(private fireAuth: AngularFireAuth) {
    this.user = fireAuth.user;
  }

  register(email: any, pass: any) {
    return this.fireAuth.createUserWithEmailAndPassword(email, pass);
  }
  login(email: any, pass: any) {
    return this.fireAuth.signInWithEmailAndPassword(email, pass);
  }
  logout() {
    return this.fireAuth.signOut();
  }
}
