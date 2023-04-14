const { Sequelize, DataTypes, Model } = require("sequelize");
const {User,BookSlotEvent,Langar,Paath} = require("./DataTypes")

const addPaath = async (paath) =>{
    const newPaath = Paath.build({
      eventname:paath.eventname,
    startDate: paath.startDate,
    enddate: paath.enddate,
    eventaddress: paath.eventaddress,
    orgname: paath.orgname,
    phonenumber: paath.phonenumber,
    status: paath.status
  })  
  try {
    let paath ={}
    await newPaath.save().then((res)=>{
      paath = res.toJSON();
    })
    return paath
    }
    catch(err){
     console.log(err); 
    }
}
const findPaathById = async (idPaath)=>{
  try{
    const paath = await Paath.findOne({where: {idPaath: idPaath }})
    return paath.toJSON()
  }
  catch (err){
    console.log(err)
  }
}
const findAllPaath = async () =>{
  try{
    const Op = Sequelize.Op;
    let todayDate = new Date();
    const allPaath = await Paath.findAll({where:{enddate: {[Op.gte]:todayDate}}})
    
    console.log(JSON.parse(JSON.stringify(allPaath)))
    return allPaath
  }
  catch (err){
    console.log(err)
  }
}
const updatePaathbyId= async (paath)=>{
  try {
    const updatedPaath = await Paath.update(paath  ,{where: {idPaath:paath.idPaath}})
    return JSON.parse(updatedPaath)
  }
  catch (err){
    console.log(err)
  }
}
const deletePaathbyId= async (paath)=>{
  console.log(paath)
  const deletedPaath = await Paath.destroy({where: {idPaath:paath.idPaath}})
  return JSON.parse(deletedPaath)
}
module.exports = {addPaath,findPaathById,findAllPaath,updatePaathbyId,deletePaathbyId}