const { Router }= require('express');
const router = Router();
const {getUsers,createUser,getUser,login,admin,logout,hacer_pedido,verEmail,easter,recCon,recCon2}=require('../controllers/index.controller');
router.get('/',easter);
router.post('/login',login);
router.post('/registrar',createUser);
router.get('/logout',logout);
router.post('/hacer_pedido',hacer_pedido);
router.get('/verEmail/:hashedId',verEmail);
router.post('/fgpassword',recCon);
router.post('/newpasswd/:token',recCon2);
router.get('/user_getter');
module.exports=router;