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

  buscarProducto(texto,id){
    return this.http.get(`${this.Api_Uri}/buscador/`+texto);
  }
  
  obtenerProductos(estado,categoria,id){
    switch (estado){
      case 0://todos
        return this.http.get(`${this.Api_Uri}/obtenerProductos/`+id);
        case 1://todos asc
          return this.http.get(`${this.Api_Uri}/obtenerProductosASC/`+id);
          case 2://todos desc
            return this.http.get(`${this.Api_Uri}/obtenerProductosDESC/`+id);
            case 4://categoria
            return this.http.get(`${this.Api_Uri}/obtenerProductos/`+categoria+`/`+id);
              case 5://categoria asc
              return this.http.get(`${this.Api_Uri}/obtenerProductosASC/`+categoria+`/`+id);
                case 6://categoria desc
                return this.http.get(`${this.Api_Uri}/obtenerProductosDESC/`+categoria+`/`+id);
    }
  }
}
