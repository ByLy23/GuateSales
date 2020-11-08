import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/authenticationService';

@Component({
  selector: 'app-nueva-pass',
  templateUrl: './nueva-pass.component.html',
  styleUrls: ['./nueva-pass.component.css']
})
export class NuevaPassComponent implements OnInit {


  recuperaForm:FormGroup;

  constructor(private form:FormBuilder,
    private router:Router,
    private authSrv:AuthService) { 
      this.recuperaForm=this.form.group({
        contra:['',Validators.required],
        confirmaC:['',Validators.required]
      })
    }

    verificarAutenticacion(datoCon){
      let corr=this.authSrv.getCorreo();
      this.authSrv.enviarPass(corr,datoCon.contra,datoCon.confirmaC).subscribe((res)=>{
        alert ("Contrasenia modificada");
        this.authSrv.rmvCorreo();
        this.router.navigate(['/']);
      })
    }
  ngOnInit(): void {
  }

}
