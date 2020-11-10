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

router.get('/obtenerProductos/:id',async (req,res)=>{
    let ide=req.params.id;
    sql='select idPublicacion,idUsuario,idCategoria,nombreProducto,palabrasClave,precio,ubicacionImagen,descripcion from publicacion where not idUsuario=:ide';
    let result=await BD.Open(sql,[ide],false);
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
router.get('/obtenerProductosASC/:id',async (req,res)=>{
    let ide=req.params.id;
    sql='select idPublicacion,idUsuario,idCategoria,nombreProducto,palabrasClave,precio,ubicacionImagen,descripcion from publicacion where not idUsuario=:ide order by precio asc';
    let result=await BD.Open(sql,[ide],false);
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
router.get('/obtenerProductosDESC/:id',async (req,res)=>{
    let ide=req.params.id;
    sql='select idPublicacion,idUsuario,idCategoria,nombreProducto,palabrasClave,precio,ubicacionImagen,descripcion from publicacion where not idUsuario=:ide order by precio desc';
    let result=await BD.Open(sql,[ide],false);
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

router.get('/buscador/:categoria/:id',async (req,res)=>{
     let dato=req.params.categoria;
     let ide=req.params.id;
    sql="select idPublicacion,idUsuario,idCategoria,nombreProducto,palabrasClave,precio,ubicacionImagen,descripcion from publicacion where palabrasClave like :dato or nombreProducto like :dato and not idUsuario=:ide";
    let result=await BD.Open(sql,['%'+dato+'%',ide],false);
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

router.get('/obtenerProducto/:pr/:id',async (req,res)=>{
    const dato=req.params.pr;
    let ide=req.params.id;
    sql='select idPublicacion,idUsuario,idCategoria,nombreProducto,palabrasClave,precio,ubicacionImagen,descripcion from publicacion where idPublicacion=:dato and not idUsuario=:ide';
    let result=await BD.Open(sql,[dato,ide],false);
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
router.get('/obtenerProductos/:categoria/:id',async (req,res)=>{
    const dato=req.params.categoria;
    let ide=req.params.id;
    sql='select idPublicacion,idUsuario,idCategoria,nombreProducto,palabrasClave,precio,ubicacionImagen,descripcion from publicacion where idCategoria=(select idCategoria from categoria where nombreCategoria=:dato) and not idUsuario=:ide';
    let result=await BD.Open(sql,[dato,ide],false);
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
router.get('/obtenerProductosASC/:categoria/:id',async (req,res)=>{
    const dato=req.params.categoria;
    let ide=req.params.id;
    sql='select idPublicacion,idUsuario,idCategoria,nombreProducto,palabrasClave,precio,ubicacionImagen,descripcion from publicacion where idCategoria=(select idCategoria from categoria where nombreCategoria=:dato) and not idUsuario=:ide order by precio asc';
    let result=await BD.Open(sql,[dato,ide],false);
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
router.get('/obtenerProductosDESC/:categoria/:id',async (req,res)=>{
    const dato=req.params.categoria;
    let ide=req.params.id;
    sql='select idPublicacion,idUsuario,idCategoria,nombreProducto,palabrasClave,precio,ubicacionImagen,descripcion from publicacion where idCategoria=(select idCategoria from categoria where nombreCategoria=:dato) and not idUsuario=:ide order by precio desc';
    let result=await BD.Open(sql,[dato,ide],false);
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