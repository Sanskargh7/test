const User=require('../../models/user')
const jwt =require('jsonwebtoken')
const bcrypt=require('bcrypt')
exports.signup=(req,res)=>{
    User.findOne({email:req.body.email}).exec((err,user)=>{
        if(user)
        return res.status(400).json({message:"admin already registerd"})
    })
    const {name,email,password}=req.body;
    const hash_password=await bcrypt.hash(password,10);
    const _user=new User({
        name,
        email,
        hash_password
    })
    _user.save((error,data)=>{
        if(error){
            return res.status(400).json({
                message:"something went wrong"
            })
        }
        if(data){
            return res.status(201).json({
                message:'admin created succesfully'
            })
        }
    })
}
exports.signin=(req,res)=>{
    User.findOne({email:req.body.email}).exec(async(error,user)=>{
        if(error) return res.status(400).json({error})
        if(user){
            const isPassword=await user.authenticate(req.body.password);
            if(
                isPassword &&(user.role==='admin')
                
                
            ){
                const token=jwt.sign({_id:user._id,role:role},'secret',{expiresIn:'20m'});
                const {_id,name,email,role}=user;
                res.cookie('token',token,{expiresIn:'20m'})
                res.status(200).json({
                    token,
                    user:{_id,name,email,role},
                })
            }else{
                return res.status(400).json({message:'something went wrong'})
            }
        }
    })
}
exports.signout=(req,res)=>{
    res.clearCookie('token');
    res.status(200).json({
        message:'Signout successfully'
    })
}