const express =require('express')

const DB= require('../db.config')

let Cart= require('../models/cart')

const { v4:uuidv4 } =require('uuid')


const checkTokenMiddleware= require('../jsonwebToken/checking') //import de check token pou plan


Cart =DB.Cart

let router =express.Router()

router.use( (req,res,next)=>{
    const event = new Date()
    console.log('cart time',event.toString())
    next()
})


router.get('',async(req,res)=>{
   
    try{
      

        let cart= await Cart.findAll()
        return res.status(200).json({message:"carts",data:cart})
    }catch(err){
        console.log(err)
        return res.status(500).json({message:'error database'})
    }

})


router.get('/:cartId',async(req,res)=>{
    const cartId =parseInt(req.params.id)
    try{
        if(!cartId){
            return res.status(400).json({message:'missing parameter '})
        }

        let cart= await Cart.findOne({where: {cart_id:cartId},row:true})
        if(!cart){
            return res.status(400).json({message:'this cart doesnt excist '})
        }

       
        
        return res.status(200).json({ cart })
    }catch(err){
        console.log(err)
        return res.status(500).json({message:'error database'})
    }

})

router.post('',async(req,res)=>{
    const {  
        products,
        totalAmount,
        quantity
        }=req.body
    const user_id= req.user_id

    try{
        let cart= await Cart.findOne({where: {cart_id:user_id}})
        if(cart !==null){
            return res.status(409).json({message:`this user with ID ${user_id} already have an cart`})
        }

        const newCart={
            userId:user_id,
            balance:balance,
            ref_code:uuidv4(),
            totalAmount:totalAmount,
            quantity:quantity
        }
        let createCart=await Cart.create(newCart)

        return res.status(200).json({data:createCart})
    }catch(error){
        console.log(error)
        return res.status(500).json({message:"error during creation/error database "})
    }
})


router.delete('/:id',async(req,res)=>{
    const id =parseInt(req.params.id)
    try{
        if(!id){
            return res.status(400).json({message:'missing parameter'})
        }

        await Cart.destroy({where:{accountId:id},force:true})
        return res.status(200).json({message:'cart delete with succes'})
    }catch(err){
        console.log(err)
        return res.status(500).json({message:'error database'})
    }
})

module.exports=router