const { Sequelize, DataTypes, Model } = require("sequelize");
const {User,BookSlotEvent,Langar,Paath} = require("./DataTypes")

const addPaath = async (paath) =>{
    const newPaath = Paath.build({
    startdate: paath.date,
    eventaddress: paath.eventaddress,
    orgname: paath.orgname,
    phonenumber: paath.phonenumber
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
    const allPaath = await Paath.findAll()
    return allPaath.toJSON()
  }
  catch (err){
    console.log(err)
  }
}
const updatePaathbyId= async (paath)=>{
  try {
    const updatedPaath = await Paath.update(paath  ,{where: {idPaath:paath.idPaath}})
    return updatedPaath.toJSON()  
  }
  catch (err){
    console.log(err)
  }
}
module.exports = {addPaath,findPaathById,findAllPaath,updatePaathbyId}