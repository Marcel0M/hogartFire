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
  return collection.doc(id).set(data);
}

readCollection(){
  console.log("HOGAR-TEMPORAL: Reading collection.")
  this.firestore.collection('users').valueChanges().subscribe( (res) => {
    console.log("HOGAR-TEMPORAL: ", res);
  });
}

getCollection<tipo>(path: string) {
  console.log("HOGAR-TEMPORAL: Reading collection.")
  const collection = this.firestore.collection<tipo>(path);
  console.log("HOGAR-TEMPORAL: ", collection);
  return collection.valueChanges();
}

updateDoc(data: any, path: string, id: string) {
  const collection = this.firestore.collection(path);
  return collection.doc(id).update(data);
}

getDoc<tipo>(path: string, id: string) {
  const collection = this.firestore.collection<tipo>(path);
  return collection.doc(id).valueChanges();
}

deleteDoc(path: string, id: string) {
  const collection = this.firestore.collection(path);
  return collection.doc(id).delete();
}

createRandomID(){
  return this.firestore.createId()
}




}