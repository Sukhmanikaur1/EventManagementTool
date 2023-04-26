const express = require("express");
const BookedSlotRouter = express.Router();
const Sequelize = require("sequelize");
const {BookSlotPaath,bookSlot,findAllBookedSlot,findBookedSlotById,updatedBookedSlotbyId,deleteBookedSlotById} = require("../model/BookPaathEventSlot.model.js")
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
    //  console.log("req.body.bookedslot",req.body.bookslotpaath)
     const user = await findByEmail(req.body.bookslotpaath.user)
     const userFromEmail = await findByEmail(req.body.bookslotpaath.email);
    console.log("userFromEmail",userFromEmail)
    
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
          UserIdUser:user?.role === "admin"?userFromEmail?userFromEmail.idUser:user.idUser:user.idUser,
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
BookedSlotRouter.patch('/updateonepaathslotevent/',userAuth, async(req, res, next)=>{
  try{
    console.log("req.body.bookslotpaath",req.body.bookedslot)
    const user = await findByEmail(req.user)
    
     const paath = await findPaathById(req.body.bookedslot.paath)
     console.log(paath)
     let bookedSlots =[]

     await updatedBookedSlotbyId({
      idbookSlot:req.body.bookedslot.idbookSlot,
       fullName: req.body.bookedslot.fullName,
         phonenumber:req.body.bookedslot.phonenumber,
         email:req.body.bookedslot.email,
         time:req.body.bookedslot.time, 
         date:req.body.bookedslot.date,
         col:req.body.bookedslot.col, 
         row:req.body.bookedslot.row,
         UserIdUser:user.idUser,
         PaathIdPaath:req.body.bookedslot.paath,

     }).then(async (response)=>{
       await findAllBookedSlot(req.body.bookedslot.paath).then(res=>bookedSlots= res)
     })
     return res.status(200).json({code:"SUCCESS",data:bookedSlots.length>0?bookedSlots:[]})
 }
 catch (err){
     console.log(err)
     res.status(500)
 }
})
BookedSlotRouter.patch('/deletebookedslot/:id',userAuth, async(req, res, next)=>{
  try{
    const user = await findByEmail(req.user)
    // console.log("req.params.id",req.params.id)
    let bookedSlot = await findBookedSlotById(req.params.id)
    // console.log("bookedSlot",bookedSlot)
    let bookedSlots =[]
    await BookSlotPaath.destroy({
      where: {
        idBookSlot: req.params.id
      }

    })
    return res.status(200).json({code:"SUCCESS",})
 }
 catch (err){
     console.log(err)
     res.status(500)
 }
}
)


module.exports = BookedSlotRouter
