const express = require("express");
const UserRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const config = require("../config/config");
const configure = require("dotenv");
const {User,updateUser, findByEmail, addUser, deletebyUsername} = require("../model/UserModel.model")
require('dotenv').config()
const host = process.env.DB_HOST;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const port = process.env.DB_PORT;
const userdb = process.env.DB_DATABASE;
const sequelize = new Sequelize(userdb, username, password, {
  host: host,
  port: port,
  dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
});
UserRouter.use(express.json());
UserRouter.post("/register", async (req, res) => {
  console.log(req.body)
  try {
    console.log(req.body)
    const salt = await bcrypt.genSalt();
    console.log(salt)
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log(hashedPassword)
    const user = {
      username: req.body.username.toLowerCase(),
      password: hashedPassword,
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
    };
    const result = await addUser(user);
    res.status(201).send({data:{code: 'success'}});
  } catch (err){
    console.log(err)
    res.status(500).send({message:"server Error", err});
  }
});
UserRouter.delete("/delete", async (req, res) => {
  let username = req.body.username;
  await deletebyUsername(username);
  return res.status(200).send(username+" deleted successfully deleted")
})
UserRouter.post("/login", async (req, res) => {
  try {
    const user = await findByEmail(req.body.email.toLowerCase()); //uers.find(user => user.username == req.body.username);
    console.log(user)
    if(user == null){
      return res.status(400).send('user does not exist')
    }
      if(await bcrypt.compare(req.body.password,user.password)){
        const tokenId=jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)  
        // console.log(process.aenv.ACCESS_TOKEN_SECRET)
        user.tokenId=tokenId;
        updateUser(user)
        res.status(200).json({
              success: true, 
              user,
              tokenId
          }) 

      }else {
          res.status(200).json({
              success:false,
              user:null,
           })
      }
  }
  catch(err){
      console.log(err);
      res.status(500).json({
          message:"error has occured",
          
      })
  }
})
function userAuth(req, res, next){
    const authHeader = req.headers.get('Authorization')
    const token= authHeader && authHeader.split(' ')[1]
    if(token == null ){
      return res.sendStatus(401)
    }
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
      if (err ){
        res.sendStatus(403)
      }
      req.user = user;
      next()
    })
  }
UserRouter.put("/", userAuth, async (req, res) => {});
module.exports = {UserRouter, userAuth};
