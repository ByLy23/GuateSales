require('dotenv').config();
const {Router}= require('express');
const router=Router();
const BD=require('../config/configdb');

router.get('/obtenerCategorias',async (req,res)=>{
    sql= 'select idCategoria,nombreCategoria from categoria';
    let result= await BD.Open(sql,[],false);
    Categorias=[];
    result.rows.map(cats=>{
        let cat={
            "id":cats[0],
            "nombre":cats[1]
        }
        Categorias.push(cat);
    });
    res.status(200).json(Categorias);
});

router.post('/ingresaCategorias',async (req,res)=>{
    const {nombre}=req.body;
    sql='insert into categoria(nombreCategoria) values(:nombre)';
    let result=await BD.Open(sql,[nombre],true);
    res.status(200).json({msg:true});
});

module.exports=router;