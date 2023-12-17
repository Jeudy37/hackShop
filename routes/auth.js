const express= require('express')
const passport=require('passport')
let router =express.Router()

router.get('/google',passport.authenticate('google',{
    scope:['profile']
}))


router.get('/google/redirect',passport.authenticate('google', { failureRedirect: '/' }),(req,res)=>{
    res.send(req.user)
    res.redirect('/')
    

})

module.exports=router