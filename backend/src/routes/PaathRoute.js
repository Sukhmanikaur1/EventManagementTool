const express = require("express");
const PaathRouter = express.Router();
PaathRouter.use(express.json());
require('dotenv').config()
const {userAuth} = require('./UserRoute')
const {findByEmail} =require('../model/UserModel.model')
const {addPaath,findPaathById,findAllPaath,updatePaathbyId,deletePaathbyId} = require('../model/Paath.model');
PaathRouter.post('/addpaathevent/:tokenId', userAuth,async (req, res) =>{
    try{
        console.log(req.body)
        const user = await findByEmail(req.user)
        let allpaath=[]
        await findAllPaath().then((res)=>res?allpaath=res:allpaath=[])
    console.log(allpaath)
        allpaath.forEach(paath=>{if(paath.enddate===req.body.paath.enddate) return res.status(200).json({code:"error",msg:"paath at the date already exists"})})
        const paath = {
            eventname:req.body.paath.eventname,
            startDate: req.body.paath.startdate,
            enddate:req.body.paath.enddate,
            eventaddress: req.body.paath.eventaddress,
            orgname: req.body.paath.orgname,
            phonenumber: req.body.paath.phonenumber,
            status:req.body.paath.status,
        }
        
        let allAndAddedPaath = []
        await addPaath(paath).then((res) => {
            console.log(res)
            allAndAddedPaath=res})
        
       
        return res.status(201).json({code:"SUCCESS",data:allAndAddedPaath})
    }
    catch(err){
        console.log(err)
        res.status(500)
    }
})
PaathRouter.get('/allpaathevents/', async(req, res, next)=>{
    try{
        let allPaathEvents=[]
        await findAllPaath().then((response)=>{
            allPaathEvents= response
        })
        return res.status(200).json({code:"SUCCESS",data:allPaathEvents.length>0?allPaathEvents:[]})
    }
    catch (err){
        console.log(err)
        res.status(500)
    }
})
PaathRouter.patch('/updatepaathevent/:tokenId', userAuth,async (req, res) =>{
    try{
        console.log("paath update body")
        console.log(req.body.paath)
        let user=JSON.parse(JSON.stringify(await findByEmail(req.user))) 
        console.log(user)
        if ( user.role !=="admin"){
            res.status(200).json({code:"FAIL", msg:"unauthorized user"})
        }
        await updatePaathbyId(req.body.paath)
        let updatedList =[]
        await findAllPaath().then((response)=> updatedList=response)
        res.status(200).send({
            data:updatedList,
            code:"SUCCESS"
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({msg:err})
    }
})
PaathRouter.patch('/deletepaathevent/:tokenId', userAuth,async (req, res) =>{
    try{
        const user = await findByEmail(req.user)
        
        const paathEvent = {
            idPaath:req.body.paath.idPaath,
            startdate: req.body.paath.startdate,
            enddate:req.body.paath.enddate,
            eventaddress: req.body.paath.eventaddress,
            orgname: req.body.paath.orgname,
            phonenumber: req.body.paath.eventphone,

          }
        let allPaathEvents=[]
        await deletePaathbyId(paathEvent).then(async (res) => {

            await findAllPaath().then((response)=> {
                console.log(response)
                allPaathEvents=response
            })
        })
        console.log(allPaathEvents)
        return res.status(200).send({
            code:"SUCCESS",
            data: allPaathEvents,
            lastIndex: allPaathEvents.length-1
        }
        )
    }
    catch(err){
        res.status(500)
    }
})
module.exports = PaathRouter