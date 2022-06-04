import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  usuario: AngularFirestoreDocument;

  constructor(private firestore: AngularFirestore) {
   }


createDocument(data: any, path: string, id: string){
  const collection = this.firestore.collection(path);
  console.log("HOGAR-TEMPORAL: ", data);
  return collection.doc(id).set(data)
}

readCollection(){
  console.log("HOGAR-TEMPORAL: Reading collection.")
  this.firestore.collection('users').valueChanges().subscribe( (res) => {
    console.log("HOGAR-TEMPORAL: ", res);
  });
}

}