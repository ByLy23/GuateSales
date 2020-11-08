const {Router}= require('express');
const router=Router();
const BD=require('../config/configdb');
const multer=require('multer');




//const app=express();

//app.use(multer({}));
//CONSULTAS GET
//CONSULTAS POST

router.post('/subir',(requ,res)=>{
    res.send('Subida');
})
//CONSULTAS PATCH
//CONSULTAS POST
//CONSULTAS DELETE
//PROCEDIMIENTOS ALMACENADOS
//TRIGGERS
/*
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

*/

module.exports=router;