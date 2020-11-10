require('dotenv').config();
const {Router}= require('express');
const router=Router();
const BD=require('../config/configdb');
const ctrEmail= require('../config/correo');
//router.post('/facturaCliente/',ctrEmail.recuperaMail);


//comprar productos
//limpiarCarrito
//obtenerCarrito


module.exports=router;