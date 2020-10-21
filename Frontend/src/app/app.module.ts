import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { RecuperarContrasenaComponent } from './recuperar-contrasena/recuperar-contrasena.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PrincipalComponent } from './principal/principal.component';
import { AdminComponent } from './admin/admin.component';
import { ProductoComponent } from './producto/producto.component';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ChatComponent } from './chat/chat.component';
import { PublicarComponent } from './publicar/publicar.component';
import { AdminContainerComponent } from './admin-container/admin-container.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioSesionComponent,
    RegistroUsuarioComponent,
    RecuperarContrasenaComponent,
    PerfilComponent,
    PrincipalComponent,
    AdminComponent,
    ProductoComponent,
    DetalleProductoComponent,
    CarritoComponent,
    ChatComponent,
    PublicarComponent,
    AdminContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
