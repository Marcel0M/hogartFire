import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import {getDownloadURL,ref,Storage,uploadString,} from '@angular/fire/storage';
import { Photo } from '@capacitor/camera';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AvatarService {
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage,
    private authService: AuthService
  ) {}

  getUserProfile() {
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `users/${user.uid}`);
    return docData(userDocRef);
  }

  getPet() {
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `reportes/${user.uid}`);
    return docData(userDocRef);
  }

  async uploadImage(cameraFile: Photo) {
    const user = this.auth.currentUser;
    const path = `uploads/${user.uid}/profile.png`;
    const storageRef = ref(this.storage, path);

    try {
      await uploadString(storageRef, cameraFile.base64String, 'base64');

      const imageUrl = await getDownloadURL(storageRef);
      const uid = this.auth.currentUser.uid

      const userDocRef = doc(this.firestore, `users/${uid}`);
      /* const userDocRef = doc(this.firestore, `users/${user.uid}`); */
      await setDoc(userDocRef, {imageUrl, uid});
      return true;
    } catch (e) {
      return null;
    }
  }


//FUNCION QUE SUBE FOTO DE MASCOTA
  async uploadPhoto(cameraFile: Photo) {
    const user = this.auth.currentUser;
    const path = `uploads/${user.uid}/profile.png`;
    const storageRef = ref(this.storage, path);

    try {
      await uploadString(storageRef, cameraFile.base64String, 'base64');

      const photoUrl = await getDownloadURL(storageRef);
      const uid = this.auth.currentUser.uid

      const userDocRef = doc(this.firestore, `reportes/${uid}`);
      /* const userDocRef = doc(this.firestore, `users/${user.uid}`); */
      await setDoc(userDocRef, {photoUrl, uid});
      return true;
    } catch (e) {
      return null;
    }
  }
}
