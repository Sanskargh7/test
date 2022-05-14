const User=require('../models/user');
const jwt=require('jsonwebtoken');
const generateJwtToken=(_id,role)=>{
    return jwt.sign({_id,role},'rollingsing',{
        expiresIn:"24h"
    })
}
exports.singup=(req,res)=>{
    User.findOne({email:req.body.email}).exec(async (error,user)=>{
        if(user)
        return res.status(400).json({
            error:"user already exits"
        })
        const {name,email,password}=req.body;
        const hash_password=await bcrypt.hash(password,10);
        const _user=new User({
            name,
            email,
            hash_password
        });
        _user.save((error,user)=>{
            if(error){
                return res.status(400).json({
                    message:"something went wrong"
                })
            }
            if(user){
                const token=generateJwtToken(user._id,user.role);
                const {_id,name,email,role}=user;
                return res.status(201).json({
                    token,
                    user:{_id,name,email,role}
                })
            }
        })
    })
}
exports.signin=(req,res)=>{
    User.findOne({email:req.body.email}).exec(async (error,user)=>{
        if(error)
        return res.status(400).json({error})
        const isPassword=await user.authenticate(req.body.password);
        if(isPassword && user.role=="user"){
            const token=generateJwtToken(user._id,user.role)
            const {_id,name,email,role}=user;
            res.status(200).json({
                token,
                user:{_id,name,email,role},
            })
        }else{
            return res.status(400).json({
                message:"something went wrong"
            })
        
        }
    })
}