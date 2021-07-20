const mongoose=require('mongoose');
const config=require('config');

const db=config.get('mongoURI');

const connectDB=async ()=>{
    try{
        mongoose.connect(db, {
            useNewUrlParser:true,
            useCreateIndex:true,
        }).then(()=>{
            console.log('Database connected');
        }).catch((err)=>{
            console.log(err.message);
        })

    }catch(err){
        console.log('connection error');
        console.log(err.message);
        //exit process if error occur
        process.exit(1);
    }
}

//export module
module.exports=connectDB;