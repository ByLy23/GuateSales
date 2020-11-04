const {Router}= require('express');
const router=Router();
var crypto=require('crypto');
const BD=require('../config/configdb');


//CONSULTA GENERAL
router.get('/',async(req,res)=>{
    Prin=[];
    let dat={
        "Todo esta bien":"OK"
    }
    Prin.push(dat);
    res.json(Prin);
})

//CONSULTAS GET

router.post('/verificaUser',async(req,res)=>{
    const {nombres,contra}=req.body;
    var sha256=crypto.createHash('sha256').update(contra).digest('hex');
    console.log(sha256);
    sql="select idUsuario,nombre,apellido,pais,correo,fechaNac,creditos from usuario where correo= :nombres and contrasenia=:sha256 and estado='e' and idTipo=(select idTipo from tipo_usuario where nombreTipo='cliente')";
    let result=await BD.Open(sql,[nombres,sha256],false);
    if(result.rows.length>0){
        res.status(200).json({
            msg:true,
            User:{
             "codigo":result.rows[0][0],
            "nombre":result.rows[0][1],
            "apellido":result.rows[0][2],
            "pais":result.rows[0][3],
            "correo":result.rows[0][4],
            "fecha":result.rows[0][5],
            "creditos":result.rows[0][6]
            }
        });
    }else{
    sql1=`select idUsuario,nombre,apellido,pais,correo,fechaNac,creditos 
    from usuario 
        where correo=:nombres
        and contrasenia= :contra
        and idTipo=(select idTipo from tipo_usuario where nombreTipo='admin')`;
    let resutl1=await BD.Open(sql1,[nombres,contra],false);
    if(resutl1.rows.length>0){
        res.status(200).json({msg:false,msgA:true});
    }else{
        res.status(200).json({msgA:false,msg:false});
    }
    }
})
//CONSULTAS POST
//CONSULTAS PATCH
router.patch('/actualizaUsuario',async(req,res)=>{
    const {codigo,nombre,apellido,pais,contra,confirmaC,fecha,correo,creditos}=req.body;
    var sha256=crypto.createHash('sha256').update(contra).digest('hex');
    if(contra==confirmaC){
        sql=`begin
        actualizaUsuarios(:codigo,:nombre,:apellido,:fecha,:pais,:sha256);
        end;`;
        result=await BD.Open(sql,[codigo,nombre,apellido,fecha,pais,sha256],true);
        res.status(200).json({
            msg:true,
            User:{
                "codigo":codigo,
                "nombre":nombre,
                "apellido":apellido,
                "pais":pais,
                "correo":correo,
                "fecha":fecha,
                "creditos":creditos
            }
        });
    }
})
//CONSULTAS PUT
//CONSULTAS DELETE
//PROCEDIMIENTOS ALMACENADOS
//TRIGGERS

router.get('/obtener',async(req,res)=>{
    const {nombre,contra}= req.body;
    sql="select * from usuario";
    let result=await BD.Open(sql,[],false);
    Users=[];

    result.rows.map(user=>{
        let usr={
            "id":user[0],
            "nombre":user[1],
            "contra":user[2]
        }
        Users.push(usr);
    })
    res.status(200).json(Users);
})



module.exports=router;