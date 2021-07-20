const express=require('express');
const Auth=require('../../middleware/auth');
const User=require('../../models/User');
const router=express.Router();

// @route api/auth
// @des     check user auth
// @privacy     auth

router.get('/', Auth, async(req, res)=>{
    try{
        const user=await User.findById(req.user.id).select("-password");
        res.json({user});

    }catch(err){
        console.log(err.message);
        res.status(500).json({msg: 'Server error'});
    }
});

module.exports=router;