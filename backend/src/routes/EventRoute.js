const express = require("express");
const EventRouter = express.Router();
const Sequelize = require("sequelize");
const config = require("../config/config");
const configure = require("dotenv");
const {Event,findAllEvents, findById, addEvent, deleteEventById} = require("../model/EventModel")
require('dotenv').config()
const cors = require('cors')
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
EventRouter.use(express.json());
EventRouter.post("/addevent", cors(),async (req, res) => {
  try {
    console.log(req.body)
    const event = {
        enddate: req.body.event.enddate,
        eventaddress: req.body.event.eventaddress,
        eventstatus: req.body.event.eventstatus,
        eventphone: req.body.event.eventphone,
        startdate: req.body.event.startdate,
        eventplace:req.body.event.eventplace,
        eventtype:req.body.event.eventtype,
    };
     const events = await addEvent(event);
     console.log(events)
    res.status(201).send({data:{code: 'success',events}});
  } catch (err){
    console.log(err)
    res.status(500).send({message:"server Error", err});
  }
});
EventRouter.delete("/delete", async (req, res) => {
  let idEvent = req.body.idEvent;
  await deleteEventById(idEvent);
  return res.status(200).send(idEvent+" deleted successfully deleted")
})
EventRouter.get("/allevents", async (req, res) => {
    try {
        const events = await findAllEvents(); //uers.find(user => user.username == req.body.username);
        // console.log(events)
        if(events == null){
            return res.status(400).send('events do not exist')
        }
        // console.log(process.env.ACCESS_TOKEN_SECRET)
        res.status(200).json({
              success: true, 
              events
          }) 
      
      
  }
  catch(err){
      console.log(err);
      res.status(500).json({
          message:"error has occured",
          
      })
  }
})
module.exports = EventRouter;
