import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/authenticationService';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  constructor(private router:Router,
    private autSrv:AuthService,
    private carSrv:CarritoService,
    ) { }

    adt:number;
valor:number=0;
    suma(numero:number){
      this.valor+=numero;
      return this.valor;
    }
    carritos:any=[];
    usuario:any=[];
  ngOnInit(): void {
    this.usuario=this.autSrv.getUsuario();
    this.carSrv.getCarrito(this.usuario.codigo).subscribe((res)=>{
      this.carritos=res;
    });
  }
  confirmarCompra(){

    if(this.valor>this.usuario.creditos){
      alert('SUS CREDITOS NO SON SUFICIENTES');
      this.router.navigate(['/principal']);
    }else{
      console.log(this.carritos[0]);
     this.carSrv.insertaCompra(this.usuario.codigo,this.valor);
      for(var i=0;i<this.carritos.length;i++){
        this.carSrv.insertaVenta(this.carritos[i].idpub,this.carritos[i].cantidad,this.carritos[i].precio).subscribe((res)=>{
          console.log("insertado");
        })
      }
      //procedimiento almacenado de comprar
    }
    this.valor=0;
    alert('Su compra ha sido Realizada');
    this.limpiarCarrito(1);
  }
  limpiarCarrito(num){
    if(num==0){
      this.valor=0;
      this.carSrv.limpiarCarrito(this.usuario.codigo).subscribe((res)=>{
        console.log(res);
        window.location.reload();
      })
      //Proceso de limpiarCarrito
      alert('Carrito Limpiado');
    }else{
      this.valor=0;
      this.carSrv.limpiarCarrito(this.usuario.codigo).subscribe((res)=>{
        console.log(res);
        window.location.reload();
      })
      //proceso de solo limpiar Carrito
    }
  }
}
