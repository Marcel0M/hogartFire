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
    /* imageUrl: Storage; */
}
