require('dotenv').config();
const {Router}= require('express');
const router=Router();
const BD=require('../config/configdb');
const ctrEmail= require('../config/correo');
//router.post('/facturaCliente/',ctrEmail.recuperaMail);

//guardarProducto (PROCEDIMIENTO)
router.post('/insertaCarrito',async (req,res)=>{
    const {idPub,idC,cantidad,precio,fecha}=req.body;
    sql=`begin
    agregarCarrito(:idPub,:idC,:cantidad,:precio,:fecha);
    end;`
    result= await BD.Open(sql,[idPub,idC,cantidad,precio,fecha],true);
    res.status(200).json({msg:true});
});
/**/
//comprar productos (TRIGGER)
//insertar en detalleCompra
router.post('/insertarCompra',async (req,res)=>{
    const {idC,tot}=req.body;
    sql=`begin
    compra(:idC,:tot);
    end;`;
    result= await BD.Open(sql,[idC,tot],true);
    res.status(200).json({msg:true});
});
router.post('/insertarVenta',async (req,res)=>{
    const {idP,cantidad,precio}=req.body;
    sql=`begin
    venta(:idP,:cantidad,:precio);
    end;`;
    result= await BD.Open(sql,[idP,cantidad,precio],true);
    res.status(200).json({msg:true});
});
//insertar en detalleFactura

//limpiarCarrito (PROCEDIMIENTO)
router.patch('/limpiaCarrito',async (req,res)=>{
    const {ide}=req.body;
    sql=`update carrito
    set estado='d'
    where estado='e' and idClienteCompra=:ide`;
    result= await BD.Open(sql,[ide],true);
    res.status(200).json({msg:true});
});
//obtenerCarrito SELECT
//datos a obtener, idProducto,nombreProducto,cantidad,precio where estado='e'
router.get('/obtenerCarrito/:id',async (req,res)=>{
    const ide=req.params.id;
    sql=`select c.idPublicacion,p.nombreProducto, c.idClienteCompra,c.cantidad,c.precio
    from carrito c inner join publicacion p
    on p.idPublicacion=c.idPublicacion 
    where c.estado='e' and c.idClienteCompra=:ide`;
    let result= await BD.Open(sql,[ide],false);
    prds=[];
    result.rows.map(cars=>{
        let cart={
            "idpub":cars[0],
            "nombre":cars[1],
            "idC":cars[2],
            "cantidad":cars[3],
            "precio":cars[4]
        }
        prds.push(cart);
    })
    res.status(200).json(prds);
})
module.exports=router;