const express = require("express");
const BookedEventRouter = express.Router();
const Sequelize = require("sequelize");
const {BookSlotEvent,bookSlot} = require("../model/BookSlotEventModel")
require('dotenv').config()
const cors = require('cors')
const host = process.env.DB_HOST;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const port = process.env.DB_PORT;
const userdb = process.env.DB_DATABASE;
const {userAuth} = require('./UserRoute')
const sequelize = new Sequelize(userdb, username, password, {
  host: host,
  port: port,
  dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
});
BookedEventRouter.use(express.json());
BookedEventRouter.post("/addevent/:tokenId", userAuth,cors(),async (req, res) => {
  try{
    console.log(req.body)
    console.log(req.user)
  }
  catch (err){
    console.log(err);
  }

})

module.exports = BookedEventRouter
