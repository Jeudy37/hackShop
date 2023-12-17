const { Sequelize }= require("sequelize")

const password = process.env.DB_PASSWORD ? process.env.DB_PASSWORD.toString() : undefined;

let sequelize =new Sequelize(
    "hackaton","postgres","",{
        host:process.env.DB_HOST,
        port:process.env.DB_PORT,
        dialect:'postgres',
        logging:false
    })

const db={}
db.sequelize=sequelize
db.User=require('./models/user')(sequelize)
db.Cart=require('./models/cart')(sequelize)


db.sequelize.sync({alter:true})
module.exports=db