import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  constructor(private admSrv:AdminService) { }

  catse:any=[];
  productos:any=[];
  ngOnInit(): void {
    this.admSrv.obtenerCategoria().subscribe((res)=>{
      this.catse=res;
   });
  }
//tres consultas
//precio, categoria, y precio y categoria
/**

  if(categoria=='' && precio==''){
    buscar tdos los productos sin importar nada
  }else if(categoria=='' && precio!=''){
    seleccionar todos los productos dependiendo de el precio
  }else if (categoria!='' && precio==''){
    selecciona todos los prodctos dependiendo de la categoria
  }else{
    selecciona todos los productos dependiendo del precio y la categoria
  }

 */
}
