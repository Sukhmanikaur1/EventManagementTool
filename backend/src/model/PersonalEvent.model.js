const { Sequelize, DataTypes, Model } = require("sequelize");
const {PersonalEvent} = require("./DataTypes");
const e = require("express");

const addpersonalEvent= async(personalEventData) => {
  
  const newPersonalEvent = await PersonalEvent.build(
    {
      phonenumber:personalEventData.phonenumber,
      hostname: personalEventData.hostname,
      eventdate: personalEventData.eventdate,
      eventdescription: personalEventData.eventdescription,
      eventaddress: personalEventData.eventaddress,
      eventplace: personalEventData.eventplace,
      eventname: personalEventData.eventname,
      starttime: personalEventData.eventtimestart,
      endtime: personalEventData.eventtimeend
    })
    try{
      let personalEvent={}
      await newPersonalEvent.save().then((res) => {
      personalEvent= res.toJSON()
    });
    return personalEvent
    }catch(err){
      console.log(err)
    }
}
const findPersonalEventById=async (personaleventid)=>{
  try{
    const personalEvent = await PersonalEvent.findOne({where: {personaleventid: personaleventid }})
    return personalEvent.toJSON()
  }
  catch (err){
    console.log(err)
  }
}
const changetimefrom24hto12h=(time)=>{
  let str = time 
  let AMorPM="AM"
  let reduceTimeby12h=false
  let returnstring= ''
  if(str.substr(0,2)>"12"){
    AMorPM="PM"
    reduceTimeby12h=true
    let temphours= Number.parseInt(str.substr(0,2))
    console.log(temphours-12)
    if(temphours>10)
    returnstring+='0'+(temphours-12)+time.substr(2)+AMorPM
    else
    {
      returnstring+=(temphours-12)+time.substr(2)+AMorPM
    }

  }
  else{ 
    returnstring=time+AMorPM
  }
  
  console.log(str.substr(0,2)>"12")
  return returnstring
}
const findAllPersonalEvent = async () =>{
  const Op = Sequelize.Op;
  try{
    let allpersonalEvent = [{}]
    let todayDate= new Date()
     await PersonalEvent.findAll({where: {eventdate:{[Op.gt]:todayDate}}}).then((res) => {allpersonalEvent=JSON.stringify(res)});
    // console.log(JSON.parse(allpersonalEvent))
    let temp= []
    temp=JSON.parse(allpersonalEvent)
    temp=temp.map((data)=>{return{...data, starttime:changetimefrom24hto12h(data.starttime),endtime:changetimefrom24hto12h(data.endtime)}})
    console.log(temp)
    allpersonalEvent = JSON.stringify(temp)
    return allpersonalEvent
  }
  catch (err){
    console.log(err)
  }
}
const updatedPersonalEventbyId= async (personalEvent)=>{
  try {
    let updatedPersonalEvent = {}
    console.log(personalEvent)
    await PersonalEvent.update(personalEvent  ,{where: {personaleventid:personalEvent.personaleventid}}).then((res)=>{
        updatedPersonalEvent = JSON.parse(res);
    })
    console.log(updatedPersonalEvent)
    return updatedPersonalEvent  
  }
  catch (err){
    console.log(err)
  }
}
const deletePersonalEventbyId= async (personalEvent)=>{
  try {
    let deletedPersonalEvent = {}
    console.log(personalEvent)
    
    await PersonalEvent.destroy({where: {personaleventid:personalEvent.personaleventid}}).then((res)=>{
        deletedersonalEvent = JSON.parse(res);
    })
    console.log(deletedPersonalEvent)
    return deletedPersonalEvent  
  }
  catch (err){
    console.log(err)
  }
}
module.exports= {PersonalEvent,deletePersonalEventbyId,findAllPersonalEvent,addpersonalEvent,updatedPersonalEventbyId,findPersonalEventById}