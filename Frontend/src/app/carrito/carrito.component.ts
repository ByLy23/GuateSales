import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  confirmarCompra(){
    //hacer metodos de compra
    alert('Su compra ha sido Realizada');
    this.limpiarCarrito(1);
  }
  limpiarCarrito(num){
    if(num==0){
      //Proceso de limpiarCarrito
      alert('Carrito Limpiado');
    }else{
      //proceso de solo limpiar Carrito
    }
  }
}
