const express=require('express');
const {body, validationResult}=require('express-validator');
const User=require('../../models/User');
const gravitar=require('gravatar');
const bcrypt=require('bcryptjs');
const router=express.Router();

//get method

router.post(
    '/',
    body('name', 'Name is not empty').not().isEmpty(),
    body('email', 'Please fill valid email').isEmail(),
    body('password', 'Please fill password min 6').isLength(6),

    async(req, res)=>{
        //show validation errors
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        //get request data
        const {name, email, password, avatar}=req.body;

        try{
            //check email exist
        let user=await User.findOne({email});
        if(user){
            res.status(400).json({errors:[{msg:'Email already exist'}]})
        }
        //get gravitar
        const avatar=gravitar.url(email, {s:'200', r:'pg', d:'mm'});

        //user obj to save
        user=new User({
            name,
            email,
            avatar,
            password,
        })

        //hash password
        const salt=await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(password, salt);

        //save user
        await user.save();

        //generate token
        res.send('Registered user successfully');

        }catch(err){
            console.log(err.message);
            res.status(500).json({'msg': 'Server bad request'});
        }
    });

module.exports=router;