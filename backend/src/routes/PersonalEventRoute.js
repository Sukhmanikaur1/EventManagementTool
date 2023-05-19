const express = require("express");

const PersonalEventRouter = express.Router();
const Sequelize = require("sequelize");

const config = require("../config/config");
const configure = require("dotenv");
PersonalEventRouter.use(express.json());

require('dotenv').config()
const {userAuth} = require('./UserRoute')
const cors = require('cors')
const {findByEmail} =require('../model/UserModel.model')
const {PersonalEvent,deletePersonalEventbyId,findAllPersonalEvent,addpersonalEvent,findPersonalEventById,updatedPersonalEventbyId}= require('../model/PersonalEvent.model.js')
PersonalEventRouter.post('/addpersonalevent/:tokenId', userAuth,async (req, res) =>{
    try{
        console.log(req.body.personalEventData)
        const user = await findByEmail(req.user)
        // console.log(user)
        // console.log(addpersonalEvent)
        const personalEvent = {
        eventphonenumber:req.body.personalEventData.eventphonenumber,
      hostname: req.body.personalEventData.hostname,
      eventdate: req.body.personalEventData.eventdate,
      eventdescription: req.body.personalEventData.eventdescription,
      eventaddress: req.body.personalEventData.eventaddress,
      eventplace: req.body.personalEventData.eventplace,
      eventname: req.body.personalEventData.eventname,
      eventtimestart: req.body.personalEventData.eventtimestart,
      eventtimeend: req.body.personalEventData.eventtimeend,
      hostphonenumber: req.body.personalEventData.hostphonenumber
}
        // console.log(personalEvent)
        let allPersonalEvents=[]
        await addpersonalEvent(personalEvent).then(async (res) => {await findAllPersonalEvent().then((res)=>{allPersonalEvents=JSON.parse(res)})})
        // console.log(allPersonalEvents)
        return res.status(200).json({
            code:"SUCCESS",
            data: allPersonalEvents,
            lastIndex: allPersonalEvents.length-1
        }
        )
    }
    catch(err){
        console.log(err)
        res.status(500)
    }
})
PersonalEventRouter.get('/allPersonalEvents/',async (req, res)=>{
    try{
       const personalEvents = await findAllPersonalEvent()
    //    console.log(JSON.parse(personalEvents))
       appendDatePersonalEvents=[]
       JSON.parse(personalEvents).forEach(event=>{
        let date = new Date(event.eventdate)
        let date2 = event.eventdate+" "+event.starttime+'-'+event.endtime
        appendDatePersonalEvents.push({...event,eventdatetime:date2})})
      return res.status(200).json({
        code:"SUCCESS",
        data:appendDatePersonalEvents})
    }
    catch (err){
        console.log(err)
        res.status(500)
    }
})
PersonalEventRouter.patch('/updatepersonalevents/:tokenId', userAuth,async (req, res) =>{
    try{
        // console.log(req.body.personalEventData)
        const user = await findByEmail(req.user)
        // console.log(user)
        // console.log(updatedPersonalEventbyId)
        let starttime = req.body.personalEventData.starttime.split(":")
        let starttime2= starttime[2]?.includes("PM")?(Number(starttime[0])+12):starttime[0]+":"+starttime[1]
        let endtime = req.body.personalEventData.endtime.split(":")
        let endtime2= endtime[2]?.includes("PM")?(Number(endtime[0])+12):endtime[0]+":"+endtime[1]
        
        const personalEvent = {
            personaleventid:req.body.personalEventData.personaleventid,
        eventphonenumber:req.body.personalEventData.eventphonenumber,
        
        hostphonenumber:req.body.personalEventData.hostphonenumber,
      hostname: req.body.personalEventData.hostname,
      eventdate: req.body.personalEventData.eventdate,
      eventdescription: req.body.personalEventData.eventdescription,
      eventaddress: req.body.personalEventData.eventaddress,
      eventplace: req.body.personalEventData.eventplace,
      eventname: req.body.personalEventData.eventname,
      starttime: starttime2,
      endtime: endtime2
}
        let allPersonalEvents=[]
        await updatedPersonalEventbyId(personalEvent).then(async (res) => {await findAllPersonalEvent().then((res)=>{allPersonalEvents=JSON.parse(res)})})
        
        return res.status(200).json({
            code:"SUCCESS",
            data: allPersonalEvents,
            lastIndex: allPersonalEvents.length-1
        }
        )
    }
    catch(err){
        console.log(err)
        res.status(500)
    }
})
PersonalEventRouter.patch('/deletepersonalevents/:tokenId', userAuth,async (req, res) =>{
    try{
        // console.log(req.body.personalEventData)
        const user = await findByEmail(req.user)
        // console.log(user)
        // console.log(deletePersonalEventbyId)
        const personalEvent = {
            personaleventid:req.body.personalEventData.personaleventid,
        phonenumber:req.body.personalEventData.phonenumber,
      hostname: req.body.personalEventData.hostname,
      eventdate: req.body.personalEventData.eventdate,
      eventdescription: req.body.personalEventData.eventdescription,
      eventaddress: req.body.personalEventData.eventaddress,
      eventplace: req.body.personalEventData.eventplace,
      eventname: req.body.personalEventData.eventname,
      starttime: req.body.personalEventData.starttime,
      endtime: req.body.personalEventData.endtime
}
        let allPersonalEvents=[]
        await deletePersonalEventbyId(personalEvent).then(async (res) => {await findAllPersonalEvent().then((res)=>{allPersonalEvents=JSON.parse(res)})})
        
        return res.status(200).json({
            code:"SUCCESS",
            data: allPersonalEvents,
            lastIndex: allPersonalEvents.length-1
        }
        )
    }
    catch(err){
        console.log(err)
        res.status(500)
    }
})
module.exports = PersonalEventRouter