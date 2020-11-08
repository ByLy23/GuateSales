import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {map} from "rxjs/operators";
import { isNullOrUndefined } from 'util';
import { SesionInterface } from '../models/sesion-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
    private router:Router) { }

  Api_Uri='http://localhost:3000';
  


  encabezado: HttpHeaders= new HttpHeaders({
    "Content-Type":"application/json"
  })
  getDato(){
    return this.http.get(`${this.Api_Uri}/obtener`);
  }


  sesion(usr,pass){
    return this.http.post(`${this.Api_Uri}/verificaUser`,
    {
      "nombres":usr,
      "contra":pass
    },
    {headers: this.encabezado}
    ).pipe(map(data=>data));
  }

  setUsuario(usr:SesionInterface){
    let usrString=JSON.stringify(usr);
    localStorage.setItem('Usuario',usrString);
  }

  getUsuario(){
    let actual=localStorage.getItem('Usuario');
    return JSON.parse(actual);
  }
  logout(){
    localStorage.removeItem('Usuario');
    this.router.navigate(['/']);
  }

  enviarRecuperacion(correo){
    return this.http.post(`${this.Api_Uri}/correoConfirmacion`,
    {
      "correo":correo,
    },
    {headers: this.encabezado}
    ).pipe(map(data=>data));
  }
  setCorreo(email:string){
    let emlstr=JSON.stringify(email);
    localStorage.setItem('Correo',email);
  }
  rmvCorreo(){
    localStorage.removeItem('Correo');
    this.router.navigate(['/']);
  }
/*
  public setUsuario(usuario:any){
    let usr=JSON.stringify(usuario);
    localStorage.setItem('usuarioActual',usr);
  }
  public obtenerUsuario(use:string, pass:string){
    let usr=localStorage.getItem('usuarioActual');
    if(!isNullOrUndefined(usr)){
      let user=JSON.parse(usr);
      return user;
    }
    return false;
  }

  public quitarUsuario():void{
    localStorage.removeItem('usuarioActual');
  }*/
}
