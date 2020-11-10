import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  encabezado: HttpHeaders= new HttpHeaders({
    "Content-Type":"application/json"
  })
  Api_Uri='http://localhost:3000';
  constructor(private http:HttpClient) { }


  insertarProducto(usr,nombPr,nomCat,palClv,precio,desc){
    return this.http.post(`${this.Api_Uri}/nuevoPrd`,{
      "idUser":usr,
      "nombrePr":nombPr,
      "nombreCat":nomCat,
      "palClv":palClv,
      "precio":precio,
      "desc":desc
    })
  }
  guardarImagen(formData){
    return this.http.post(`${this.Api_Uri}/imgProducto`,formData);
  }


  getPr(id){
    return this.http.get(`${this.Api_Uri}/obtenerProducto/`+id);
  }

  buscarProducto(texto){
    return this.http.get(`${this.Api_Uri}/buscador/`+texto);
  }
  
  obtenerProductos(estado,categoria){
    switch (estado){
      case 0://todos
        return this.http.get(`${this.Api_Uri}/obtenerProductos`);
        case 1://todos asc
          return this.http.get(`${this.Api_Uri}/obtenerProductosASC`);
          case 2://todos desc
            return this.http.get(`${this.Api_Uri}/obtenerProductosDESC`);
            case 4://categoria
            return this.http.get(`${this.Api_Uri}/obtenerProductos/`+categoria);
              case 5://categoria asc
              return this.http.get(`${this.Api_Uri}/obtenerProductosASC/`+categoria);
                case 6://categoria desc
                return this.http.get(`${this.Api_Uri}/obtenerProductosDESC/`+categoria);
    }
  }
}
