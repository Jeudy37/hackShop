const { DataTypes } =require('sequelize') //import only datatypes poum ka jere type donne
const bcrypt=require('bcrypt') //import pou ka krypte  password 
module.exports=(sequelize)=>{
    const Cart=sequelize.define('Cart',{
        cart_id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        ref_code:{
            type:DataTypes.STRING
        },
        products: {
            type: DataTypes.JSONB, 
            defaultValue: [], 
          },
          totalAmount: {
            type: DataTypes.FLOAT,
            defaultValue: 0.0,
          },
          quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
          },
          userId:{
            type:DataTypes.INTEGER,
            allowNul:false
        },
          createdAt: {
                type:DataTypes.DATE,
                allowNull:true
          
          },
          
        });
        
}