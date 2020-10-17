import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import {Router} from '@angular/router';
@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  sesionForm=FormGroup;
  loading=false;
  submitted=false;
  constructor(
    private router: Router,
    private forum: FormBuilder
  ) { }

  ngOnInit(): void {
  }
  onSubmit(){
    this.loading=true;
    this.submitted=true;
    //this.router.navigate(['/cabecera']);
  }
}
