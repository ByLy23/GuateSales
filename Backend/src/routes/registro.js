const {Router}= require('express');
const router=Router();
const BD=require('../config/configdb');
var crypto=require('crypto');
var ctrEmail= require('../config/correo');
//CORREOS
router.post('/enviarCorreo',ctrEmail.sendMail);
router.post('/correoConfirmacion',ctrEmail.recuperaMail);
//CONSULTAS GET
//CONSULTAS POST
router.post('/nuevoUsuario', async(req,res)=>{
    const {nombre,apellido,fecha,pais,password,confirmP,correo}= req.body;
    if(password==confirmP){
    var sha256=crypto.createHash('sha256').update(password).digest('hex');
   console.log(sha256);
    sql= `begin
    registrarUsuarios(:nombre,:apellido,:fecha,:pais,:sha256,:correo);
    end;`;
    await BD.Open(sql,[nombre,apellido,fecha,pais,sha256,correo],true);
    res.status(200).json({
        msg:true
    })
    }else{
        res.status(200).json({msg:false});
    }
})

router.get('/confirmaCorreo/:correo',async(req,res)=>{
    const dato=req.params.correo;
    sql= `
    begin
    confirmaCorreo(:dato);
    end;`;
    await BD.Open(sql,[dato],true);
    res.status(200).json(`Confirmado Regresar a la pagina principal:
    http://localhost/4200/`);
})
//s
//CONSULTAS PATCH
router.patch('/recuperaPassword',async(req,res)=>{
    const {correo,contra,confirmaC}=req.body;
    var sha256=crypto.createHash('sha256').update(contra).digest('hex');
    if(contra==confirmaC){
        sql=`begin
        recuperaP(:correo,:sha256);
        end;`;
        result=await BD.Open(sql,[correo,sha256],true);
        res.status(200).json({
            msg:true
        });
    }
});
//CONSULTAS POST
//CONSULTAS DELETE
//PROCEDIMIENTOS ALMACENADOS
//TRIGGERS

module.exports=router;