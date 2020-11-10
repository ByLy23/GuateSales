import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  constructor(private admSrv:AdminService,
    private form:FormBuilder,
    private prdSrv:ProductoService) {
      this.algoForm=this.form.group({
        categor:[''],
        prec:['']
      });
      this.busForm=this.form.group({
        busqueda:['']
      })
   }
   busForm:FormGroup;
   algoForm:FormGroup;
  catse:any=[];
  productos:any=[];
  ngOnInit(): void {
    this.admSrv.obtenerCategoria().subscribe((res)=>{
      this.catse=res;
   });
  }

  buscar(dato){
    this.prdSrv.buscarProducto(dato.busqueda).subscribe((res)=>{
      this.productos=res;
    })
  }
  obtenerProductos(dataForm){
    if(dataForm.categor=="" && dataForm.prec==""){
      this.prdSrv.obtenerProductos(0,'').subscribe((res)=>{
        this.productos=res;
        console.log(res);
      })
    }else if(dataForm.categor!="" && dataForm.prec==""){
      this.prdSrv.obtenerProductos(4,dataForm.categor).subscribe((res)=>{
        this.productos=res;
        console.log(res);
      })
    }else if(dataForm.categor=="" && dataForm.prec!=""){
      if(dataForm.prec=="Mayor"){
      this.prdSrv.obtenerProductos(2,'').subscribe((res)=>{
        this.productos=res;
        console.log(res);
      })
      }else if(dataForm.prec=="Menor"){
        this.prdSrv.obtenerProductos(1,'').subscribe((res)=>{
          this.productos=res;
          console.log(res);
        })
      }else{

      }
    }else if(dataForm.categor!="" && dataForm.prec!=""){
      if(dataForm.prec=="Mayor"){
        this.prdSrv.obtenerProductos(6,dataForm.categor).subscribe((res)=>{
          this.productos=res;
          console.log(res);
        })
        }else if(dataForm.prec=="Menor"){
          this.prdSrv.obtenerProductos(5,dataForm.categor).subscribe((res)=>{
            this.productos=res;
            console.log(res);
          })
        }else{
          
        }
    }
  }

  verDetalle(producto){
    alert(producto.idPublicacion);
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
