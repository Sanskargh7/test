const express=require('express')
const userController=require('../controller/user')
const router=express.Router();
router.post('/signup',userController.signin);
router.post('/signin',userController.signin)
module.exports=router;