export interface users{
    uid: string;
    correo: string;
    nombre: string;
    apellido: string;
    direccion: string;
    fecha_nacimiento: string;
    sexo: 'M' | 'F';
    /* imageUrl: Storage; */
}