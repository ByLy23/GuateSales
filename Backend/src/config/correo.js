const nodemailer= require('nodemailer');
exports.sendMail=function(req,res){
    const cuerpo=req.body;
    let transporte=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'byronacademico@gmail.com',
            pass:'Pr2Archivos'
        }
    });
    var mensaje="esto es una pruebis xD";
    
    var mailOpt={
        from:'byronacademico@gmail.com',
        to:'orellanab80@gmail.com',
        subject:'BYRYTIOAS',
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

