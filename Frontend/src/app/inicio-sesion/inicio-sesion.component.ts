import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { AuthService } from '../services/authenticationService';
import {SesionInterface} from '../models/sesion-interface';
@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {

  sesionForm:FormGroup;
  hash:string;
  nombre:string="";
  pass:string="";
  Usuario: SesionInterface;

  constructor(
    private router: Router,
    private forum: FormBuilder,
    private authSrvr: AuthService
  ) { 
    this.sesionForm=this.forum.group({
      nombre: ['',Validators.required],
      contra:['',Validators.required]
    });
  }

   verUser(datosUsuarios){
     this.authSrvr.sesion(datosUsuarios.nombre,datosUsuarios.contra).subscribe((res)=>{
       if(res['msg']){
         let datosUsuario:SesionInterface=res['datosUsuario'];
         alert("Bienvenido "+datosUsuarios.nombre);
         this.authSrvr.setUsuario(datosUsuarios)
         this.router.navigate(['/principal']);
       }else{
         alert("CREDENCIALES INCORRECTAS");
       }
     })


   //nuevaPass=shajs('sha256').update('asd').digest('hex');
    //alert(datosUsuario.nombre);
    //alert(nuevaPass);
  }
  
}
