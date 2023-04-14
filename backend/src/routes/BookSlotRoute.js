const express = require("express");
const BookedSlotRouter = express.Router();
const Sequelize = require("sequelize");
const {BookSlotPaath,bookSlot,findAllBookedSlot} = require("../model/BookPaathEventSlot.model.js")
const {findByEmail} =require("../model/UserModel.model")
const {findPaathById} = require("../model/Paath.model")
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


// axios.patch(baseUrl + '/deletebookedslot/'+tokenId, {bookedslot:bookedslot})
// axios.patch(baseUrl + '/updateonepaathslotevent/', {bookedslot:bookedslot})
// axios.post(baseUrl + '/addbookpaathslot/', {paath:paath})
// axios.get(baseUrl + '/allbookslotsevents/'+paath)           
BookedSlotRouter.use(express.json());
BookedSlotRouter.get('/allbookslotsevents/:paathid', async(req, res, next)=>{
  try{
     console.log(req.params.paathid)
      let allBookedSlots=[]
      await findAllBookedSlot(req.params.paathid).then((response)=>{
        allBookedSlots= response
      })
      return res.status(200).json({code:"SUCCESS",data:allBookedSlots.length>0?allBookedSlots:[]})
  }
  catch (err){
      console.log(err)
      res.status(500)
  }
})
BookedSlotRouter.post('/addbookpaathslot/', async(req, res, next)=>{
  try{
     console.log("req.body.bookslotpaath",req.body.bookslotpaath)
     const user = await findByEmail(req.body.bookslotpaath.user)
      const paath = await findPaathById(req.body.bookslotpaath.paath)
      let bookedSlots =[]

      await bookSlot({
        fullName: req.body.bookslotpaath.fullName,
          phonenumber:req.body.bookslotpaath.phonenumber,
          email:req.body.bookslotpaath.email,
          time:req.body.bookslotpaath.time, 
          date:req.body.bookslotpaath.date,
          col:req.body.bookslotpaath.col, 
          row:req.body.bookslotpaath.row,
          UserIdUser:user.idUser,
          PaathIdPaath:paath.idPaath,

      }).then(async (response)=>{
        await findAllBookedSlot(req.body.bookslotpaath.paath).then(res=>bookedSlots= res)
      })
      return res.status(200).json({code:"SUCCESS",data:bookedSlots.length>0?bookedSlots:[]})
  }
  catch (err){
      console.log(err)
      res.status(500)
  }
})


module.exports = BookedSlotRouter
