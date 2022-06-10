import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import {getDownloadURL,ref,Storage,uploadString,} from '@angular/fire/storage';
import { Photo } from '@capacitor/camera';
import { AuthService } from './auth.service';
import { finalize } from 'rxjs/operators';
import { FirestoreService } from './firestore.service';


@Injectable({
  providedIn: 'root',
})
export class AvatarService {

  uniqueKey: number = Math.floor(Math.random() * 5);
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage,
    private authService: AuthService,
    private firestoreService: FirestoreService
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


/*   uploadImage2(file: any, path: string, nombre: string): Promise<string> {
    return new Promise(  resolve => {
        const filePath = path + '/' + nombre;
        const ref = this.storage.  ref(filePath);
        const task = ref.put(file);
        task.snapshotChanges().pipe(
          finalize(  () => {
                ref.getDownloadURL().subscribe( res => {
                  const downloadURL = res;
                  resolve(downloadURL);
                  return;
                });
          })
       )
      .subscribe();
    });
}
 */
      

//FUNCION QUE SUBE FOTO DE MASCOTA
  async uploadPhoto(cameraFile: Photo) {
    const user = this.auth.currentUser;
    const randomid = this.firestoreService.createRandomID();
    const userContador = user + '1';
    const path = `uploads/reportes/${randomid}/imagen.png`;
    const storageRef = ref(this.storage, path);

    try {
      await uploadString(storageRef, cameraFile.base64String, 'base64');

      const photoUrl = await getDownloadURL(storageRef);
      const uid = this.auth.currentUser.uid

      const userDocRef = doc(this.firestore, `reportes/${uid}`);
      await setDoc(userDocRef, {photoUrl, uid});
      return true;
    } catch (e) {
      return null;
    }
  }
}
