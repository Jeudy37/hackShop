const express = require('express');
const DB= require('./db.config')
const bodyParser = require('body-parser');
const passportSetup=require('./config_passport/passport_setup')
const session=require("express-session")
const app=express()

const passport =require('passport')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const user_router=require('./routes/user')
const auth_router=require('./routes/auth')

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret:'Personnenaledroitdenousjugeravantlafin,parcequelhommeestcapabledumeilleurcommedupirejusquaubout.Aufondcenestquaumomentdedisparaîtrequelonpeutenfinsavoirquioaété,lafindonneunsensàtoutcequiaprécédé'
}))

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/users',user_router)
app.use('/auth',auth_router)
app.get("/", (req, res) => {
    res.json({ message: "Welcome to hackaton." });
  });

const PORT=8000
DB.sequelize.authenticate()
.then( ()=>console.log('database is connected '))

.then( ()=>{
    app.listen(PORT,()=>{
        console.log(`the server is running on http://localhost:${PORT}`)
    })
})


.catch( err=>console.log('error database ',err))
