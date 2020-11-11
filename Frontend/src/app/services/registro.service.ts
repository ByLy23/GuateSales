import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(private https: HttpClient,
    private router:Router) { }

  encabezado: HttpHeaders= new HttpHeaders({
    "Content-Type":"application/json"
  })
  Api_Uri='http://localhost:3000';
  /*
  sesion(usr,pass){
    return this.http.post(`${this.Api_Uri}/verificaUser`,
    {
      "nombre":usr,
      "contra":pass
    },
    {headers: this.encabezado}
    ).pipe(map(data=>data));
  }
  */
 registro(nombre_,apellido_,fecha_,pais_,password_,confirmP_,correo_){
   return this.https.post(`${this.Api_Uri}/nuevoUsuario`,{
    "nombre":nombre_,
    "apellido":apellido_,
    "fecha":fecha_,
    "pais":pais_,
    "password":password_,
    "confirmP":confirmP_,
    "correo":correo_
   },{headers: this.encabezado}).pipe(map(data=>data));
 }
 enviarCorreo(correo_){
   return this.https.post(`${this.Api_Uri}/enviarCorreo`,{
     "correo":correo_
   },
   {headers: this.encabezado}).pipe(map(data=>data));
 }
}
