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

  obtenerProductos(estado){
    switch (estado){
      case 0:
        break;
        case 1:
          break;
          case 2:
            break;
            case 4:
              break;
              case 5:
                break;
    }
  }
}
