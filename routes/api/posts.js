const express=require('express');
const router=express.Router();

//get method

router.get('/', (req, res)=>{
    res.send('Post route is running');
});

module.exports=router;