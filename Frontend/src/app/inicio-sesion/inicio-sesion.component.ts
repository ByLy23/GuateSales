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
         let User:SesionInterface=res['User'];
         alert("Bienvenido "+datosUsuarios.nombre);
         this.authSrvr.setUsuario(User);
         this.router.navigate(['/principal']);
       }else{
         if(res['msgA']){
          // let datoAdmin:SesionInterface=res['datoAdmin'];
           alert("Bienvenido myLord "+datosUsuarios.nombre+" TODOS ALABEN AL ADMIN");
           let User:SesionInterface=res['User'];
           this.authSrvr.setUsuario(User);
           this.router.navigate(['/admin']);
         }else{
          alert("CREDENCIALES INCORRECTAS");
         }
       }
     })


   //nuevaPass=shajs('sha256').update('asd').digest('hex');
    //alert(datosUsuario.nombre);
    //alert(nuevaPass);
  }
  
}
