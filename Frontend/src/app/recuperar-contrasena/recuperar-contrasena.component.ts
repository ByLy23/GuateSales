import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/authenticationService';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.css']
})
export class RecuperarContrasenaComponent implements OnInit {

  correoForm:FormGroup;
  constructor(private authSrv:AuthService,
    private router:Router,
    private formB: FormBuilder) {
      this.correoForm=this.formB.group({
        email:['',Validators.required]
      });
     }

  enviarRecuperacion(emal){
    this.authSrv.enviarRecuperacion(emal.email).subscribe((res)=>{
      console.log(res);
      alert("Verficacion enviada a su correo por favor seguir instrucciones :v");
      this.router.navigate(['/']);
      this.authSrv.setCorreo(emal.email);
    })
  }
  ejemplo(emal){
    alert (emal.email);
  }
  ngOnInit(): void {
  }

}
