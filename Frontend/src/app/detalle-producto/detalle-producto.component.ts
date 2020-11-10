import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../services/producto.service';
@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {

  constructor(private location: Location,
    private route: ActivatedRoute,
    private prSrv:ProductoService) { }

  ngOnInit(): void {
    this.obtenerPr();
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
}
