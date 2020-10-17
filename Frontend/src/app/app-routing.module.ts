import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';

const routes: Routes = [
  {path: 'inicio-sesion',component: InicioSesionComponent},
  {path: 'cabecera', component: CabeceraComponent},
  {path: '',component:InicioSesionComponent},
  {path: '**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{

}
