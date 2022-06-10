import { Injectable } from '@angular/core';
import {Auth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut} from '@angular/fire/auth';
import { FirestoreService } from './firestore.service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, 
              private fire: FirestoreService) {}

  async register({ email, password }) {
    try {
      const user = await createUserWithEmailAndPassword(this.auth,email,password);
      return user;
    } catch (e) {
      return null;
    }
  }

  async login({ email, password }) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (e) {
      return null;
    }
  }

test(){
  const id = this.auth.currentUser.uid;
  console.log(id);
  return id;
}

  logout() {
    return signOut(this.auth);
  }



}
