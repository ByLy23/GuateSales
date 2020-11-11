import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private formC:FormBuilder,
    private router:Router,
    private admSrv:AdminService) {
    this.catG=this.formC.group({
      categoria:['',Validators.required]
    })
   }
   catse:any=[];
  ngOnInit(): void {
    this.admSrv.obtenerCategoria().subscribe((res)=>{
       this.catse=res;
    });
  }
  catG:FormGroup;
  enviarCat(cat){
    this.admSrv.mandarCategoria(cat.categoria).subscribe((res)=>{
      alert("Se ha agregado la categoria con exito");
      window.location.reload();
    })
  }
}
