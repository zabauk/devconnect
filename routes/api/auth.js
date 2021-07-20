const express=require('express');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const config=require('config');
const {body, validationResult}=require('express-validator');
const Auth=require('../../middleware/auth');
const User=require('../../models/User');
const router=express.Router();

// @route   GET api/auth
// @des     Find user by id
// @access  Private

router.get('/', Auth, async(req, res)=>{
    try{
        const user=await User.findById(req.user.id).select("-password");
        res.json({user});

    }catch(err){
        console.log(err.message);
        res.status(500).json({msg: 'Server error'});
    }
});

//@route    POST api/auth
//@des      Login user and get token
//@access   Public
router.post(
    '/',
    body('email', 'Please fill valid email').isEmail(),
    body('password', 'Please fill empty field').exists(),

    async(req, res)=>{
        //show validation errors
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        //get request data
        const {email, password}=req.body;

        try{
            //check email exist
        let user=await User.findOne({email});
        if(!user){
            res.status(400).json({errors:[{msg:'Invalid credentials'}]});
        }

        const isMatch=await bcrypt.compare(password, user.password);

        if(!isMatch){
            res.status(400).json({errors:[{msg:'Invalid credentials'}]});
        }

        //generate token
        const payload={
            user:{
                id:user.id,
            }
        };

        jwt.sign(payload, config.get('secretToken'), {expiresIn:36000}, (err, token)=>{
            if(err) throw err;
            res.json({token});
        })

        }catch(err){
            console.log(err.message);
            res.status(500).json({'msg': 'Server bad request'});
        }
    });

module.exports=router;