const express = require("express");

const LangarEventRouter = express.Router();
const Sequelize = require("sequelize");

const config = require("../config/config");
const configure = require("dotenv");
LangarEventRouter.use(express.json());

require('dotenv').config()
const {userAuth} = require('./UserRoute')
const cors = require('cors')
const {findByEmail} =require('../model/UserModel.model')
const {addLangar,findLangarById,findAllLangar,updateLangarbyId,deleteLangarEventbyId} = require('../model/LangarEvent.model');
LangarEventRouter.post('/addLangarEvent/:tokenId', userAuth,async (req, res) =>{
    try{
        console.log(req.body)
        const user = await findByEmail(req.user)
        if(!user) return res.status(200).json({code:"error",msg:"User not found"})
        let userId = user.idUser
        let userName = user.fname+" "+user.lname
        if (user.role === 'admin'){
            if(user.email!==req.body.langar.email){
                const userFromEmail = await findByEmail(req.body.langar.email)
                if(userFromEmail) 
                {
                    userId = userFromEmail.idUser
                    userName = userFromEmail.fname+" "+userFromEmail.lname
                }
            }
        }
        let allLangar=[]
        await findAllLangar().then((res)=>allLangar=res)
    
        allLangar.forEach(langar=>{if(langar.date===req.body.langar.date) return res.status(200).json({code:"error",msg:"Langar at the date already exists"})})
        const langar = {
            date: req.body.langar.date,
            eventaddress: req.body.langar.eventaddress,
            orgname: req.body.langar.orgname,
            phonenumber: req.body.langar.phonenumber,
            UserIdUser: userId,
            fullname: userName
        }
        
        let allAndAddedlangar = []
        await addLangar(langar).then((res) => {
            console.log(res)
            allAndAddedlangar=res})
        
       
        return res.status(201).json({code:"SUCCESS",data:allAndAddedlangar})
    }
    catch(err){
        console.log(err)
        res.status(500)
    }
})
LangarEventRouter.get('/allLangarEvents/', async(req, res, next)=>{
    try{
        let allLangarEvents=[]
        await findAllLangar().then((response)=>{
            allLangarEvents= response
        })
        return res.status(200).json({code:"SUCCESS",data:allLangarEvents.length>0?allLangarEvents:[]})
    }
    catch (err){
        console.log(err)
        res.status(500)
    }
})
LangarEventRouter.patch('/updateLangarEvent/:tokenId', userAuth,async (req, res) =>{
    try{
        console.log("langar update body")
        console.log(req.body.langar)
        if (req.user !== req.body.langar.User.email){
            res.status(200).json({code:"FAIL", msg:"unauthorized user"})
        }
        await updateLangarbyId(req.body.langar)
        console.log(req.user)
        res.status(200)
    }
    catch(err){
        console.log(err)
        res.status(500).json({msg:err})
    }
})
LangarEventRouter.patch('/deletelangarevent/:tokenId', userAuth,async (req, res) =>{
    try{
        console.log(req.body)

        ///email check for admin
        const user = await findByEmail(req.user)
        
        console.log(user)
        const langarEvent = {
            idLangar:req.body.langar.idLangar,
            date: req.body.langar.date,
            eventaddress: req.body.langar.eventaddress,
            orgname: req.body.langar.orgname,
            phonenumber: req.body.langar.eventphone,
            fullName: req.body.langar.fullName,
            UserIdUser: req.body.langar.UserIdUser
          }
        let allLangarEvents=[]
        await deleteLangarEventbyId(langarEvent).then(async (res) => {allLangarEvents= res})
        
        return res.status(200).json({
            code:"SUCCESS",
            data: allLangarEvents,
            lastIndex: allLangarEvents.length-1
        }
        )
    }
    catch(err){
        console.log(err)
        res.status(500)
    }
})
module.exports = LangarEventRouter