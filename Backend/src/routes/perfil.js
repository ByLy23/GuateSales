require('dotenv').config();
const {Router}= require('express');
const router=Router();
const BD=require('../config/configdb');
const multer=require('multer');
var variableN;
var cro;
const storage=multer.diskStorage({
    destination:(req,file,callBack)=>{
        callBack(null,'../../../Frontend/src/assets/Usrs')},
    filename: (req,file,callBack)=>{
        variableN=`GSls_${file.originalname}_${Date.now()}`;
        callBack(null,variableN)
    }
})
const upload=multer({storage:storage})

router.post('/subir',upload.single('file'),async (req,res,next)=>{
    const file=req.file;
    console.log(file.filename);

    res.status(200).json({"nImage":variableN});
})
router.patch('/actualizaF',async(req,res)=>{
    const {eml}=req.body;
    cro=eml;
        sql=`begin 
        actualizarImagen(:eml,:variableN);
        end;`;
        result=await BD.Open(sql,[eml,variableN],true);
        res.status(200).json({
            msg:true
        });
});

router.get('/gtimg',async(res)=>{
    const da=cro;
    console.log(da+'AJIKHFKIHFQWIUHFIUQHIWEU');
    sql='select imagen from usuario where correo= :da';
    result=await BD.Open(sql,[da],false);
    result.rows.map(img=>{
       let sr={
        "codigo":img[0]
       } 
    console.log(sr);
    })
})
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