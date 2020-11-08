require('dotenv').config();
const nodemailer= require('nodemailer');
exports.sendMail=function(req,res){
    const {correo}=req.body;
    let transporte=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user: process.env.USUARIO,
            pass: process.env.PASSWORD
        }
    });
    var mensaje=`Gracias por subscribirte a GuateSales en el siguiente enlace puedes confirmar tu correo para ingresar:
    http://localhost:3000/confirmaCorreo/`+correo+`
    
    Gracias por ingresar a la mejor pagina de compra y venta de articulos usados y nuevos.`;
    
    var mailOpt={
        from:process.env.USUARIO,
        to:correo,   
        subject:'CONFIRMACION CORREO GUATESALES',
        text:mensaje
    }
    transporte.sendMail(mailOpt,function(error,info){
        if(error){
            console.log(error);
            res.send(500,error.message);
        }else{
            console.log('email Enviado'+info.response);
            res.status(200).json("Excelente");
        }
    });
};

exports.recuperaMail=function(req,res){
    const {correo}=req.body;
    let transporte=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user: process.env.USUARIO,
            pass: process.env.PASSWORD
        }
    });
    var mensaje=`Tenemos buenas noticias. Estás a un paso de recuperar el acceso a tu cuenta de GuateSales `+correo+`. Tan solo debes hacer clic en el enlace siguiente para cambiar tu contraseña.
    enlace, con link 4200`+correo+`
    
    Gracias por permanecer en la mejor pagina de compra y venta de articulos usados y nuevos.`;
    
    var mailOpt={
        from:process.env.USUARIO,
        to:correo,   
        subject:'REESTABLECER CONTRASENIA',
        text:mensaje
    }
    transporte.sendMail(mailOpt,function(error,info){
        if(error){
            console.log(error);
            res.send(500,error.message);
        }else{
            console.log('email Enviado'+info.response);
            res.status(200).json("Excelente");
        }
    });
};