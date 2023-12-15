const { DataTypes } =require('sequelize') //import only datatypes poum ka jere type donne
const bcrypt=require('bcrypt') //import pou ka krypte  password 
module.exports=(sequelize)=>{
    const User=sequelize.define('User',{
        user_id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        googleId:{
            type:DataTypes.STRING
        },
        prenom:{
            type:DataTypes.STRING(150),
            allowNull:false,
            defaultValue:''
        },
       
        email:{
            type:DataTypes.STRING(150),
            allowNull:false,
            defaultValue:''
        },
       
        password:{
            type:DataTypes.STRING(64),
            is:/^[0-9a-f]{64}$/i  //contrainte
        },

        cart_id:{
            type:DataTypes.INTEGER,
            allowNull:true,
        },

        verified:{
            type:DataTypes.BOOLEAN,
            defaultValue:false,
        }
    },{paranoid:true},)

    // hasher password user lan avan li save nan database lan 
    User.beforeCreate( ( async( user,options)=>{
        console.log(user)
        if(user.password){
            let hash = await bcrypt.hash(user.password,parseInt(process.env.BCRYPT_SALT_ROUND))
            user.password=hash
        }
      
    })
    )

    return User
}