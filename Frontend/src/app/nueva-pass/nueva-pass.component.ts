import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-nueva-pass',
  templateUrl: './nueva-pass.component.html',
  styleUrls: ['./nueva-pass.component.css']
})
export class NuevaPassComponent implements OnInit {


  recuperaForm:FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
