const express=require('express');
const morgan=require('morgan');
const cors=require('cors');
const app=express();
const rutaSesion=require('./routes/sesion');
const rutaPerfil=require('./routes/perfil');
const rutaRegistro=require('./routes/registro');
const rutaAdmin=require('./routes/admin');
const rutaProducto=require('./routes/producto');
const rutaCarrito=require('./routes/carrito');
app.use(cors());
app.set('port',3000);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(rutaSesion);
app.use(rutaPerfil);
app.use(rutaAdmin);
app.use(rutaRegistro);
app.use(rutaCarrito);
app.use(rutaProducto);
app.listen(app.get('port'),()=>{
    console.log('Servidor conectado')
})
