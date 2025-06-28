import {Sequelize} from "sequelize-typescript"
import { config } from "dotenv"
config()

const sequelize=new Sequelize({
    database:process.env.DB_NAME,
    username:process.env.DB_USERNAME,
    password:process.env.PASSWORD,
    dialect:"mysql",
    host:process.env.DB_HOST,
    port:Number(process.env.DB_PORT),
    models:[__dirname + "/models"]
})

sequelize.authenticate()
.then(()=>{
    console.log("Authtentication Successful!")
})
.catch((err)=>{
    console.log("Something went wrong:",err)
})

sequelize.sync({alter:false}).then(()=>{
    console.log("Migration Successful!")
})

export default sequelize