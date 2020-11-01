import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  Api_uri='http://localhost/3000/'

  getUsuarios(){
    return this.http.get(`${this.Api_uri}/obtener`);
  }
}
