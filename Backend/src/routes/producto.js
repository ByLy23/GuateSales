require('dotenv').config();
const {Router}= require('express');
const router=Router();
const BD=require('../config/configdb');
const multer=require('multer');
var variableN;
var cro;
const storage=multer.diskStorage({
    destination:(req,file,callBack)=>{
        callBack(null,'/home/byly23/Escritorio/Archivos/Pr2/Frontend/src/assets/Products/')},
    filename: (req,file,callBack)=>{
        variableN=`GSls_${Date.now()}_${file.originalname}`;
        callBack(null,variableN)
    }
})
const upload=multer({storage:storage})

router.post('/imgProducto',upload.single('file',async(req,res,next)=>{
    const file=req.file;
    console.log(file.filename);
    res.status(200).json("EXITO");
}))

router.post('/nuevoPrd',async(req,res)=>{
    const{idUser,nombrePr,nombreCat,palClv,precio,desc}=req.body;
    var Ruta=variableN;
    sql=`begin
        ingresarproductos(:idUser,:nombrePr,:nombreCat,:palClv,:precio,:desc,:Ruta,:variableN);
    end;`
    result= await BD.Open(sql,[idUser,nombrePr,nombreCat,palClv,precio,desc,Ruta,variableN],true);
    res.status(200).json({
        msg:true
    })
    //cId in varchar,Cnombre in varchar, Cproduct in varchar, cPalabras in varchar, cPrecio in varchar, cDescripcion in varchar,Rruta in varchar, nImagen in varchar
});

router.get('/obtenerProductos',async (req,res)=>{
    sql='select idPublicacion,idUsuario,idCategoria,nombreProducto,palabrasClave,precio,ubicacionImagen,descripcion from publicacion';
    let result=await BD.Open(sql,[],false);
    Productos=[];
    result.rows.map(cats=>{
        let prdcto={
            "idPublicacion":cats[0],
            "idUsuario":cats[1],
            "idCategoria":cats[2],
            "nombre":cats[3],
            "palaC":cats[4],
            "precio":cats[5],
            "ubicacion":cats[6],
            "desc":cats[7]
        }
        Productos.push(prdcto);
    })
    res.status(200).json(Productos);
});
router.get('/obtenerProductosASC',async (req,res)=>{
    sql='select idPublicacion,idUsuario,idCategoria,nombreProducto,palabrasClave,precio,ubicacionImagen,descripcion from publicacion order by precio asc';
    let result=await BD.Open(sql,[],false);
    Categorias=[];
    result.rows.map(cats=>{
        let prdcto={
            "idPublicacion":cats[0],
            "idUsuario":cats[1],
            "idCategoria":cats[2],
            "nombre":cats[3],
            "palaC":cats[4],
            "precio":cats[5],
            "ubicacion":cats[6],
            "desc":cats[7]
        }
        Categorias.push(prdcto);
    })
    res.status(200).json(Categorias);
});
router.get('/obtenerProductosDESC',async (req,res)=>{
    sql='select idPublicacion,idUsuario,idCategoria,nombreProducto,palabrasClave,precio,ubicacionImagen,descripcion from publicacion order by precio desc';
    let result=await BD.Open(sql,[],false);
    Categorias=[];
    result.rows.map(cats=>{
        let prdcto={
            "idPublicacion":cats[0],
            "idUsuario":cats[1],
            "idCategoria":cats[2],
            "nombre":cats[3],
            "palaC":cats[4],
            "precio":cats[5],
            "ubicacion":cats[6],
            "desc":cats[7]
        }
        Categorias.push(prdcto);
    })
    res.status(200).json(Categorias);
});

router.get('/buscador/:categoria',async (req,res)=>{
     let dato=req.params.categoria;
    sql="select idPublicacion,idUsuario,idCategoria,nombreProducto,palabrasClave,precio,ubicacionImagen,descripcion from publicacion where palabrasClave like :dato or nombreProducto like :dato";
    let result=await BD.Open(sql,['%'+dato+'%'],false);
    Categorias=[];
    result.rows.map(cats=>{
        let prdcto={
            "idPublicacion":cats[0],//LEAGUE SPARTAN
            "idUsuario":cats[1],
            "idCategoria":cats[2],
            "nombre":cats[3],
            "palaC":cats[4],
            "precio":cats[5],
            "ubicacion":cats[6],
            "desc":cats[7]
        }
        Categorias.push(prdcto);
    })
    res.status(200).json(Categorias);
});

router.get('/obtenerProducto/:pr',async (req,res)=>{
    const dato=req.params.pr;
    sql='select idPublicacion,idUsuario,idCategoria,nombreProducto,palabrasClave,precio,ubicacionImagen,descripcion from publicacion where idCategoria=(select idCategoria from categoria where idPublicacion=:dato)';
    let result=await BD.Open(sql,[dato],false);
    Categorias=[];
    result.rows.map(cats=>{
        let prdcto={
            "idPublicacion":cats[0],
            "idUsuario":cats[1],
            "idCategoria":cats[2],
            "nombre":cats[3],
            "palaC":cats[4],
            "precio":cats[5],
            "ubicacion":cats[6],
            "desc":cats[7]
        }
        Categorias.push(prdcto);
    })
    res.status(200).json(Categorias);
});
router.get('/obtenerProductos/:categoria',async (req,res)=>{
    const dato=req.params.categoria;
    sql='select idPublicacion,idUsuario,idCategoria,nombreProducto,palabrasClave,precio,ubicacionImagen,descripcion from publicacion where idCategoria=(select idCategoria from categoria where nombreCategoria=:dato)';
    let result=await BD.Open(sql,[dato],false);
    Categorias=[];
    result.rows.map(cats=>{
        let prdcto={
            "idPublicacion":cats[0],
            "idUsuario":cats[1],
            "idCategoria":cats[2],
            "nombre":cats[3],
            "palaC":cats[4],
            "precio":cats[5],
            "ubicacion":cats[6],
            "desc":cats[7]
        }
        Categorias.push(prdcto);
    })
    res.status(200).json(Categorias);
});
router.get('/obtenerProductosASC/:categoria',async (req,res)=>{
    const dato=req.params.categoria;
    sql='select idPublicacion,idUsuario,idCategoria,nombreProducto,palabrasClave,precio,ubicacionImagen,descripcion from publicacion where idCategoria=(select idCategoria from categoria where nombreCategoria=:dato) order by precio asc';
    let result=await BD.Open(sql,[dato],false);
    Categorias=[];
    result.rows.map(cats=>{
        let prdcto={
            "idPublicacion":cats[0],
            "idUsuario":cats[1],
            "idCategoria":cats[2],
            "nombre":cats[3],
            "palaC":cats[4],
            "precio":cats[5],
            "ubicacion":cats[6],
            "desc":cats[7]
        }
        Categorias.push(prdcto);
    })
    res.status(200).json(Categorias);
});
router.get('/obtenerProductosDESC/:categoria',async (req,res)=>{
    const dato=req.params.categoria;
    sql='select idPublicacion,idUsuario,idCategoria,nombreProducto,palabrasClave,precio,ubicacionImagen,descripcion from publicacion where idCategoria=(select idCategoria from categoria where nombreCategoria=:dato) order by precio desc';
    let result=await BD.Open(sql,[dato],false);
    Categorias=[];
    result.rows.map(cats=>{
        let prdcto={
            "idPublicacion":cats[0],
            "idUsuario":cats[1],
            "idCategoria":cats[2],
            "nombre":cats[3],
            "palaC":cats[4],
            "precio":cats[5],
            "ubicacion":cats[6],
            "desc":cats[7]
        }
        Categorias.push(prdcto);
    })
    res.status(200).json(Categorias);
});
module.exports=router;