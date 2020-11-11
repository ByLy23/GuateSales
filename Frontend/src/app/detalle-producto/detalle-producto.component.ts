import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { CarritoService } from '../services/carrito.service';
import { AuthService } from '../services/authenticationService';
@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {

  constructor(private location: Location,
    private route: ActivatedRoute,
    private prSrv:ProductoService,
    private carSrv:CarritoService,
    private aut:AuthService) { }
    cantidad:any;
    usuario:any;
  ngOnInit(): void {
    this.obtenerPr();
    this.usuario=this.aut.getUsuario();
  }

  regresar(){
    this.location.back();
  }

  producto:any;
  obtenerPr(){
    const id=+this.route.snapshot.paramMap.get('id');
    this.prSrv.getPr(id).subscribe((res)=>{
      this.producto=res[0];
    })
  }

  comprarUno(producto){
    this.carSrv.insertCarrito(producto.idPublicacion,this.usuario.codigo,this.cantidad,producto.precio).subscribe((res)=>{
      if(res['msg']){
        alert('Producto Aniadido al carrito');
      }
    });
  }
}
