import { TestBed } from "@angular/core/testing";

export interface users{
    uid: string;
    correo: string;
    nombre: string;
    apellido: string;
    direccion: string;
    fecha_nacimiento: string;
    sexo: string;
    reportes: number;
    premios: number;
    ciudad: string;
    region: string;
    /* imageUrl: Storage; */
}



export interface reporte{
    id: string;
    uid: string;
    url: string;
    tipo: string;
    sexo: string;//Macho-Hembra
    raza: string;
    color: string;
    temperamento: string;
    tamano: string; 
    lat: number;
    lon: number;
    situacion: string;
    /* imageUrl: Storage; */
}



export interface hogar{
    id: string;
    uid: string;
    url: string;
    tipoh: string;//Casa-Depto
    tipom: string;//Perro-Gato-Ambos
    metraje: string;
    patio: string;//Si-No
    seguridad: string;//Si-No
    direccion: string;
    cantidad: string;//cantidad mascotas-crear contador quizas
    disponibilidad: string; //Si-No 
    lat: number;
    lon: number;
}
