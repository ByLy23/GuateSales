import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  encabezado: HttpHeaders= new HttpHeaders({
    "Content-Type":"application/json"
  })
  Api_Uri='http://localhost:3000';
  constructor(private https: HttpClient) { }

  actualizar(nombre_,apellido_,fecha_,pais_,password_,confirmP_,id_,correo_,creditos_){
    return this.https.patch(`${this.Api_Uri}/actualizaUsuario`,{
      "codigo":id_,
      "nombre":nombre_,
      "apellido":apellido_,
      "pais":pais_,
      "contra":password_,
      "confirmaC":confirmP_,
      "fecha":fecha_,
      "correo":correo_,
      "creditos":creditos_
    });
  }

  subirImg(formData){
    return this.https.post(`${this.Api_Uri}/subir`,formData);
  }
  actualizaImagen(eml){
    return this.https.patch(`${this.Api_Uri}/actualizaF`,{"eml":eml});
  }

}
