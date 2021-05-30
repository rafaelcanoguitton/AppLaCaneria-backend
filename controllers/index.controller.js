const {Pool}=require('pg');
const bcrypt = require("bcrypt");
const { getMaxListeners } = require('node:process');
const mailer =require('nodemailer');
const saltRounds=10;
//URI cause I literally can't connect to the cloud db otherwise
const connectionString=process.env.DATABASE_URL;
// const pool =new Pool({
//     host:'localhost',
//     user:'postgres',
//     passwprd:'',
//     database:'firstapi',
//     port:'5432'
// })
const pool= new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
})
var sess;
const easter=async(req,res)=>{
    res.status(200).send(';)');
}
const getUsers=async (req,res)=>{
    const response = await pool.query('SELECT * FROM usuario');
    //console.log(response.rows);
    res.status(200).json(response.rows);
}
const getUser=async(req,res)=>{
    const response=await pool.query('SELECT * FROM usuario WHERE id_usuario=$1',[req.params.id]);
    res.json(response.rows);
}
const createUser = async(req,res)=>{
    const {password,email,num,user_name,credit}=req.body;
    const HashedPassword=await bcrypt.hash(password,saltRounds);
    const cryptoRandomString = require('crypto-random-string');
    const token=cryptoRandomString(20);
    const response=await pool.query('INSERT INTO usuario(password,Email,phone_number,user_name,credit_card,token)VALUES($1,$2,$3,$4,$5,$6) RETURNING id_usuario',[HashedPassword,email,num,user_name,credit,token]);
    sess=req.session;
    sess.id_usuario=response.rows[0].id_usuario;
    var transporter=mailer.createTransport({
        host:"smtp.gmail.com",
        port:465,
        secure:true,
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASSWORD,
        },
    });
    var fullUrl = req.protocol + '://' + req.get('host') + '/verEmail/';
    await transporter.sendMail({
        from:'"App La Cañeria" <lacaneriaapp@gmail.com>',
        to: email,
        subject:"¡Complete su registro!",
        html: `
        <b> Por favor haga click en el siguiente enlace para confirmar su email<b>
        <a href=${fullUrl}${token}>${fullUrl}${token}</a>
        `
    });
    res.status(200).send('Por favor verifique su email e inicie sesión');
}

const login=async(req,res)=>{
    const{email,password}=req.body;
    const response= await pool.query('SELECT * FROM usuario WHERE email=$1',[email]);
    console.log(response);
    if(response.rowCount!=0){
        const validPassword=await bcrypt.compare(password,response.rows[0].password);
    if(validPassword){
        if(response.rows[0].activo){
            sess=req.session;
        sess.id_usuario=response.rows[0].id_usuario;
        res.status(200).send('Inicio correcto');
        }
        else{
            res.status(401).send('Por favor valide su correo antes de iniciar sesion');
        }
    }
    else{
        res.status(401).send('Password incorrecto');
    }
    }
    else{
        res.status(401).send('Usuario no encontrado');
    }
}
const admin=(req,res)=>{
    sess = req.session;
    if(sess.id_usuario) {
        res.write(`<h1>Hello ${sess.id_usuario} </h1><br>`);
        res.end('<a href='+'/logout'+'>Logout</a>');
    }
    else {
        res.write('<h1>Please login first.</h1>');
        res.end('<a href='+'/'+'>Login</a>');
    }
}
const logout=(req,res)=>{
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.send('Desloggeado');
    });
}
const hacer_pedido=async(req,res)=>{
    sess=req.session;
    if(sess.id_usuario){
        const{medio_de_pago,ubicacion,comentario,items}=req.body;
        const response=await pool.query('INSERT INTO pedido(estado,medio_de_pago,ubicación,comentario,id_usuario)VALUES($1,$2,$3,$4,$5) RETURNING id_pedido',["activo",medio_de_pago,ubicacion,comentario,sess.id_usuario]);
        var i;
        for (i = 0; i < items.length; i++) {
            var consulta="INSERT INTO items(";
            var consulta2="VALUES(";
            var valores=[];
            const entries = Object.entries(items[i]);
            var j;
            var jota;
            for(j=0;j<entries.length;j++){
                consulta=consulta+entries[j][0]+',';
                jota=j+1;
                consulta2=consulta2+'$'+jota.toString()+',';
                valores.push(entries[j][1]);
                //console.log("Para propiedad: ",entries[j][0]," valor: ",entries[j][1])
            }
            jota+=1;
            consulta += 'id_pedido)';
            consulta2 =consulta2+'$'+jota.toString()+ ')';
            consulta+=consulta2;
            valores.push(response.rows[0].id_pedido);
            console.log(consulta);
            console.log(valores)
            const response1=await pool.query(consulta,valores);
            console.log(response1);
        } 
        res.send("Orden hecha correctamente")

    }
    else{
        res.status(401).send('Su sesión ha expirado');
    }

}
const verEmail=async(req,res)=>{
    const response=await pool.query("UPDATE usuario SET ACTIVO=TRUE , token=NULL WHERE token=$1;",[req.params.hashedId.toString()]);
    res.send("¡Email verificado! Por favor inicie sesión.");
}

module.exports={
    getUsers,
    createUser,
    getUser,
    login,
    admin,
    logout,
    hacer_pedido,
    verEmail,
    easter
}