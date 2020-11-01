const {Router}= require('express');
const router=Router();
const BD=require('../config/configdb');
var ctrEmail= require('../config/correo');
router.post('/correo',ctrEmail.sendMail);
//CONSULTAS GET
//CONSULTAS POST
router.post('/crearUsuario', async(req,res)=>{
    const {username,password}= req.body;
    sql= "insert into usuario(nombre_usuario,contrasenia) values (:username,:password)";
    await BD.Open(sql,[username,password],true);
    res.status(200).json("Agregado Exitosamente")
})
//s
//CONSULTAS PATCH
//CONSULTAS POST
//CONSULTAS DELETE
//PROCEDIMIENTOS ALMACENADOS
//TRIGGERS

module.exports=router;