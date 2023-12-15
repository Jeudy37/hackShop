const express= require('express')

const DB= require('../db.config')
let User= require('../models/user')
User =DB.User

let router =express.Router()

router.use( (req,res,next)=>{
    const event = new Date()
    console.log('user time',event.toString())
    next()
})


router.get('',async(req,res)=>{
    try{
        
        let users= await User.findAll()
       return res.json({message:"sa se tout users yo ",data:users})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:'error database'})
    }

})

router.post('',async(req,res)=>{
    const {
            
            email,
            password } = req.body
    
    try{
        if(!email || !password){
            return res.status(400).json({message:'there are some parameter who missing'})
        }
        // check the password
        let verif=schema.validate(password,{details:true})
        if(!validator.isEmail(email)){
            console.log('email sa pa bon')
            res.status(400).json({message:"please enter a valide email"})
        }else if(verif.length !=0){
            res.status(400).json({message:"your password need to be strong "})
        }else{
            let user = await User.findOne({where:{email:email},row:true})
        
        if(user !=null){
            console.log(user)
            return res.status(409).json({message:`this user with email ${email} is alreadyy exist `})
        }
        const new_user = {
            email:email,
            password:password,
        }
        const createdUser = await User.create(new_user);

        // Send verification email
        try {
             sendVerificationEmail(createdUser, res);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to send verification email', error: err });
        }
        }

    }
    
    catch(err){
        console.log(err)
        return res.status(500).json({message:'error database',err:err})
    }
})


module.exports=router