import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { AuthService } from '../services/authenticationService';
import { CarritoService } from '../services/carrito.service';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  constructor(private admSrv:AdminService,
    private form:FormBuilder,
    private prdSrv:ProductoService,
    private carSrv:CarritoService,
    private autSrv:AuthService) {
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
  usuario:any;
  productos:any=[];
  ngOnInit(): void {
  this.usuario=this.autSrv.getUsuario();
    this.admSrv.obtenerCategoria().subscribe((res)=>{
      this.catse=res;
   });
   this.prdSrv.obtenerProductos(0,'',this.usuario.codigo).subscribe((res)=>{
    this.productos=res;
    console.log(res);
  });
  }

  buscar(dato){
    this.prdSrv.buscarProducto(dato.busqueda,this.usuario.codigo).subscribe((res)=>{
      this.productos=res;
    })
  }
  obtenerProductos(dataForm){
    if(dataForm.categor=="" && dataForm.prec==""){
      this.prdSrv.obtenerProductos(0,'',this.usuario.codigo).subscribe((res)=>{
        this.productos=res;
        console.log(res);
      })
    }else if(dataForm.categor!="" && dataForm.prec==""){
      this.prdSrv.obtenerProductos(4,dataForm.categor,this.usuario.codigo).subscribe((res)=>{
        this.productos=res;
        console.log(res);
      })
    }else if(dataForm.categor=="" && dataForm.prec!=""){
      if(dataForm.prec=="Mayor"){
      this.prdSrv.obtenerProductos(2,'',this.usuario.codigo).subscribe((res)=>{
        this.productos=res;
        console.log(res);
      })
      }else if(dataForm.prec=="Menor"){
        this.prdSrv.obtenerProductos(1,'',this.usuario.codigo).subscribe((res)=>{
          this.productos=res;
          console.log(res);
        })
      }else{

      }
    }else if(dataForm.categor!="" && dataForm.prec!=""){
      if(dataForm.prec=="Mayor"){
        this.prdSrv.obtenerProductos(6,dataForm.categor,this.usuario.codigo).subscribe((res)=>{
          this.productos=res;
          console.log(res);
        })
        }else if(dataForm.prec=="Menor"){
          this.prdSrv.obtenerProductos(5,dataForm.categor,this.usuario.codigo).subscribe((res)=>{
            this.productos=res;
            console.log(res);
          })
        }else{
          
        }
    }
  }

  comprarUno(producto){
    this.carSrv.insertCarrito(producto.idPublicacion,this.usuario.codigo,1,producto.precio).subscribe((res)=>{
      if(res['msg']){
        alert('Producto Aniadido al carrito');
      }
    })
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
