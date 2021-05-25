const { Router }= require('express');
const router = Router();
const {getUsers,createUser,getUser,login,admin,logout,hacer_pedido,verEmail}=require('../controllers/index.controller')
router.post('/login',login);
router.get('/users',getUsers);
router.get('/user/:id',getUser);
router.post('/registrar',createUser);
router.get('/admin',admin);
router.get('/logout',logout);
router.post('/hacer_pedido',hacer_pedido);
router.get('/verEmail/:hashedId',verEmail);
module.exports=router;