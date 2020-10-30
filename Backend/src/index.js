const express=require('express');
const morgan=require('morgan');
const cors=require('cors');
const app=express();

const rutaSesion=require('./routes/sesion');

app.set('port',3000);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(rutaSesion);


app.listen(app.get('port'),()=>{
    console.log('Servidor conectado')
})