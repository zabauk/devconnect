const mongoose=require('mongoose');
const config=require('config');

const db=config.get('mongoURI');

const connectDB=async ()=>{
    try{
        mongoose.connect(db, {
            useNewUrlParser:true,
        })
        console.log('Mongose database connected ...');

    }catch(err){
        console.log(err.message);
        //exit process if error occur
        process.exit(1);
    }
}

//export module
module.exports=connectDB;