import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminContainerComponent } from './admin-container/admin-container.component';
import { AdminComponent } from './admin/admin.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ChatComponent } from './chat/chat.component';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { NuevaPassComponent } from './nueva-pass/nueva-pass.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PrincipalComponent } from './principal/principal.component';
import { ProductoComponent } from './producto/producto.component';
import { PublicarComponent } from './publicar/publicar.component';
import { RecuperarContrasenaComponent } from './recuperar-contrasena/recuperar-contrasena.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';

const routes: Routes = [
  {path: 'inicio-sesion',component: InicioSesionComponent},
  {path: 'registro-usuario',component: RegistroUsuarioComponent},
  {path: 'recuperar-contrasena',component: RecuperarContrasenaComponent},
  {path: 'principal',component: PrincipalComponent},
  {path: 'perfil',component: PerfilComponent},
  {path: 'admin',component:AdminComponent},
  {path: 'producto',component: ProductoComponent},
  {path: 'detalleP',component:DetalleProductoComponent},
  {path:'carrito',component:CarritoComponent},
  {path:'chat',component:ChatComponent},
  {path: '',component:InicioSesionComponent},
  {path: 'nueva-pass',component:NuevaPassComponent},
  {path:'publicar',component: PublicarComponent},
  {path: 'admon',component: AdminContainerComponent},
  {path: '**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{

}
