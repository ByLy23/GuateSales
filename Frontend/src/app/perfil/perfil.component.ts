import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../services/authenticationService';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  perfilGroup=FormGroup;
  constructor(
    private authSrvr: AuthService
  ) { }

  ngOnInit(): void {
  }

  cerrarSesion(){
    this.authSrvr.logout();
  }
}
