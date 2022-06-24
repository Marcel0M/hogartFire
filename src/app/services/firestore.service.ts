import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { reporte } from '../models/models';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  usuario: AngularFirestoreDocument;

  editPet: reporte;
  

  constructor(private firestore: AngularFirestore) {
   }

//FUNCION QUE CREA MASCOTA Y USUARIO
createDocument(data: any, path: string, id: string){
  const collection = this.firestore.collection(path);
  console.log("HOGAR-TEMPORAL: ", data);
  return collection.doc(id).set(data);
}
//FUNCION QUE MUESTRA DATOS DEL USUARIO
readCollection(){
  console.log("HOGAR-TEMPORAL: Reading collection.")
  this.firestore.collection('users').valueChanges().subscribe( (res) => {
    console.log("HOGAR-TEMPORAL: ", res);
  });
}
//FUNCION QUE TRAE COLECCION DE REPORTES
getCollection<tipo>(path: string) {
  console.log("HOGAR-TEMPORAL: Reading collection.")
  const collection = this.firestore.collection<tipo>(path);
  console.log("HOGAR-TEMPORAL: ", collection);
  return collection.valueChanges();
}

//FUNCION QUE EDITA DATOS DE USUARIO
updateDoc(data: any, path: string, id: string) {
  const collection = this.firestore.collection(path);
  return collection.doc(id).update(data);
}
//FUNCION QUE TRAE DATOS DEL USUARIO
getDoc<tipo>(path: string, id: string) {
  const collection = this.firestore.collection<tipo>(path);
  return collection.doc(id).valueChanges();
}

deleteDoc(path: string, id: string) {
  const collection = this.firestore.collection(path);
  return collection.doc(id).delete();
}
//FUNCION QUE CREA UN ID PARA MASCOTA REGISTRADA
createRandomID(){
  return this.firestore.createId()
}

readPet (pet: reporte){
  this.editPet = pet;
}

getPet (){
  return this.editPet;
}




}