import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  encabezado: HttpHeaders= new HttpHeaders({
    "Content-Type":"application/json"
  })
  Api_Uri='http://localhost:3000';
  constructor(private http:HttpClient) { }

  getCarrito(id){
    return this.http.get(`${this.Api_Uri}/obtenerCarrito/`+id);
  }

  limpiarCarrito(id){
    return this.http.patch(`${this.Api_Uri}/limpiaCarrito`,{"ide":id});
  }

  insertCarrito(idP,idC,cant,prec){
    let fecha= new Date().getDate();
    return this.http.post(`${this.Api_Uri}/insertaCarrito`,
    {
      "idPub":idP,
      "idC":idC,
      "cantidad":cant,
      "precio":prec,
      "fecha":fecha
    },{
      headers: this.encabezado
    })
  }
}
