import { Sequelize } from "sequelize";
import dotenv from 'dotenv'
dotenv.config();

const db = new Sequelize({
    host: process.env.BD_HOSTNAME,
    database: process.env.BD_NAME,
    username: process.env.BD_USERNAME,
    password: process.env.BD_PASSWORD,
    dialect: process.env.BD_DIALECT,
})

export default db
