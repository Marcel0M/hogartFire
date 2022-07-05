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

getCollectionQuery<tipo>(path: string, parametro: string, condicion: any, busqueda: string) {
  const collection = this.firestore.collection<tipo>(path, 
    ref => ref.where( parametro, condicion, busqueda));
  return collection.valueChanges();
}

getCollectionAll<tipo>(path, parametro: string, condicion: any, busqueda: string, startAt: any) {
  if (startAt == null) {
    startAt = new Date();
  }
  const collection = this.firestore.collectionGroup<tipo>(path, 
    ref => ref.where( parametro, condicion, busqueda).orderBy('fecha', 'desc').limit(1).startAfter(startAt)
    );
  return collection.valueChanges();
}

getCollectionPaginada<tipo>(path: string, limit: number, startAt: any) {
  if (startAt == null) {
    startAt = new Date();
  }
  const collection = this.firestore.collection<tipo>(path, 
    ref => ref.orderBy('fecha', 'desc')
              .limit(limit)
              .startAfter(startAt)
    );
  return collection.valueChanges();
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