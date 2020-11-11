import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { AuthService } from '../services/authenticationService';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-publicar',
  templateUrl: './publicar.component.html',
  styleUrls: ['./publicar.component.css']
})
export class PublicarComponent implements OnInit {

  prdForm:FormGroup;
  constructor(private admSrv:AdminService,
    private prdSrv:ProductoService,
    private form:FormBuilder,
    private authSrv:AuthService) { 
      this.prdForm=this.form.group({
        nombre:['',Validators.required],
        categoria:['',Validators.required],
        pclave:['',Validators.required],
        precio:['',Validators.required],
        descripcion:['',Validators.required]
      })
    }

  imagenes;
  catse1:any=[];
  usr:any;
  ngOnInit(): void {
    this.usr=this.authSrv.getUsuario();
    this.admSrv.obtenerCategoria().subscribe((res)=>{
      this.catse1=res;
   });
  }
  selectImage(event){
    if(event.target.files.length>0){
      const file=event.target.files[0];
      this.imagenes=file;
    }
  }

  insertarPrd(dataForm){
    const formData=new FormData();
    formData.append('file',this.imagenes);
    this.prdSrv.guardarImagen(formData).subscribe((res)=>{
      console.log("exito");
    });
    this.prdSrv.insertarProducto(this.usr.codigo,dataForm.nombre,dataForm.categoria,dataForm.pclave,dataForm.precio,dataForm.descripcion).subscribe((res)=>{
      if(res['msg']){
        alert("Producto Agregado con Exito");
      }
    })
  }
}
