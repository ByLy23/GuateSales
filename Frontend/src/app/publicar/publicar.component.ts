import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-publicar',
  templateUrl: './publicar.component.html',
  styleUrls: ['./publicar.component.css']
})
export class PublicarComponent implements OnInit {

  constructor(private admSrv:AdminService) { }

  catse:any=[];
  ngOnInit(): void {
    this.admSrv.obtenerCategoria().subscribe((res)=>{
      this.catse=res;
   });
  }

}
