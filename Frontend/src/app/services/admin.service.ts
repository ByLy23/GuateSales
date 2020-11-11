import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  encabezado: HttpHeaders= new HttpHeaders({
    "Content-Type":"application/json"
  })
  Api_Uri='http://localhost:3000';
  constructor(private http:HttpClient) { }
  
  mandarCategoria(nombre){
    return this.http.post(`${this.Api_Uri}/ingresaCategorias`,{
      "nombre":nombre
    },
    {
      headers:this.encabezado
    })
  }

  obtenerCategoria(){
    return this.http.get(`${this.Api_Uri}/obtenerCategorias`);
  }

}
