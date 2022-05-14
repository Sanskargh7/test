const express=require('express')
const mongoose=require('mongoose')
const app=express();
const userRoutes=require('./routes/user');
const adminRoutes=require('./controller/admin/user')
const cors=require('cors')

mongoose.connect('mongodb+srv://root:unit01@cluster0.cen4m.mongodb.net/testing?authSource=admin&replicaSet=atlas-w1xtn3-shard-0&w=majority&readPreference=primary&retryWrites=true&ssl=true').then(()=>{
    console.log('database is connected successfully')
})

app.use('/api',userRoutes);
app.use('/api',adminRoutes)
app.listen(8000,()=>{
    console.log('server is running on port number 8000')
})