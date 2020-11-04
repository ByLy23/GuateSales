import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SesionInterface } from '../models/sesion-interface';
import { AuthService } from '../services/authenticationService';
import { PerfilService } from '../services/perfil.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  perfilGroup:FormGroup;
  user: SesionInterface;
  ngOnInit(): void {
    this.user=this.authSrvr.getUsuario();
  }
  constructor(
    private authSrvr: AuthService,
    private form:FormBuilder,
    private perfilSrv: PerfilService,
    private router:Router
  ) { 
    let usr=this.authSrvr.getUsuario();
    this.perfilGroup=this.form.group({
      nombre:[usr.nombre,Validators.required],
      apellido:[usr.apellido,Validators.required],
      pais:[usr.pais,Validators.required],
      pass:['',Validators.required],
      Cpass:['',Validators.required],
      fechaNac:[usr.fecha,Validators.required]
    });
  }


  actualizaUser(datosUser){
    console.log(datosUser);
    let usr:SesionInterface=this.authSrvr.getUsuario();
    console.log(usr);
    this.perfilSrv.actualizar(datosUser.nombre,datosUser.apellido,datosUser.fechaNac,datosUser.pais,datosUser.pass,datosUser.Cpass,usr.codigo,usr.correo,usr.creditos).subscribe((res)=>{
      if(res['msg']){
        usr=res['User'];
        alert("Cambio realizado");
        this.authSrvr.setUsuario(usr);
        this.router.navigate(['/principal']);
      }
    });

  }
  cerrarSesion(){
    this.authSrvr.logout();
  }
}
