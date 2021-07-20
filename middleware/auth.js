const jwt=require('jsonwebtoken');
const config=require('config');

module.exports=function(req, res, next){
    const token=req.header('x-auth-token');
    //check token exist
    if(!token){
        res.status(401).json({msg: 'Not token, auth fail'})
    }
    try{
        jwt.verify(token, config.get('secretToken'), (err, decoded)=>{
            if(err) throw err;
            req.user=decoded.user;
            next();
        })
    }catch(err){
        console.log(err.message);
        res.status(401).json({msg: 'Token authorization fail'});
    }
}