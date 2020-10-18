import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { RecuperarContrasenaComponent } from './recuperar-contrasena/recuperar-contrasena.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';

const routes: Routes = [
  {path: 'inicio-sesion',component: InicioSesionComponent},
  {path: 'registro-usuario',component: RegistroUsuarioComponent},
  {path: 'recuperar-contrasena',component: RecuperarContrasenaComponent},
  {path: '',component:InicioSesionComponent},
  {path: '**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{

}
