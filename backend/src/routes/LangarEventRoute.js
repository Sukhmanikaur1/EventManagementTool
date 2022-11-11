const express = require("express");
const LangarEventRouter = express.Router();
const Sequelize = require("sequelize");

const config = require("../config/config");
const configure = require("dotenv");

require('dotenv').config()
const {userAuth} = require('./UserRoute')
const cors = require('cors')
const {addLangar,findLangarById,findAllLangar,updateLangarbyId} = require('../model/LangarEvent.model')
LangarEventRouter.post('/addLangarEvent/:tokenId', userAuth,async (req, res, next) =>{
    try{
        const user = req.body.user
        const langar = {
            date: req.body.langar.date,
            eventaddress: req.body.langar.eventaddress,
            orgname: req.body.langar.orgname,
            phonenumber: req.body.langar.phonenumber,
            idUser: user.idUser,
            fullname:user.fname+" "+ user.lname
        }
        const addedlangar = await addLangar(langar)
        return res
    }
    catch(err){
        console.log(err)
        res.status(500)
    }
})
LangarEventRouter.get('/allLangarEvents/:tokenId', userAuth,(req, res, next)=>{
    try{

    }
    catch (err){
        console.log(err)
        res.status(500)
    }
})
module.exports = LangarEventRouter