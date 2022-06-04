import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { observable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }


createDoc(){
  this.firestore.collection('users');
}

readCollection(){
  console.log("HOGAR-TEMPORAL: Reading collection.")
  this.firestore.collection('users').get().subscribe( (res) => {
    console.log("HOGAR-TEMPORAL: ", res);
  });
}



}