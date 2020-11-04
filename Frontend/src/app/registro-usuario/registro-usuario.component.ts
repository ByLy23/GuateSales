import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroService } from '../services/registro.service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {


  registroForm:FormGroup;
  constructor(
    private router:Router,
    private formulario:FormBuilder,
    private RegisService:RegistroService
  ) { 
    this.registroForm=this.formulario.group({
      nombre:['',Validators.required],
      apellido:['',Validators.required],
      pais:['',Validators.required],
      correo:['',Validators.required],
      password:['',Validators.required],
      passC:['',Validators.required],
      fecha:['',Validators.required]
    })
    /*this.sesionForm=this.forum.group({
      nombre: ['',Validators.required],
      contra:['',Validators.required]
    });
    */
  }
  /**
   *    verUser(datosUsuarios){
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

   */

  registrar(datosRegistro){
    this.RegisService.registro(datosRegistro.nombre,datosRegistro.apellido,datosRegistro.fecha,datosRegistro.pais,datosRegistro.password,datosRegistro.passC,datosRegistro.correo).subscribe((res)=>{
      if(res['msg']){
        alert("Registro Satisfactorio");
        this.RegisService.enviarCorreo(datosRegistro.correo).subscribe((res)=>{
          if(res['msg']){
            alert("SE LE HA ENVIADO UN CORREO DE CONFIRMACION, PORFAVOR VER SU BANDEJA DE ENTRADA O SPAM");
          }else{
            alert("Algo ha fallado con el correo :'v");
          }
        });
      }else{
        alert("UPSIIII OCURRIO UN ERROR");
      }
    });
    
  }
  ngOnInit(): void {
  }



}
