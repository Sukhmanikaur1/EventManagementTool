const { Sequelize, DataTypes, Model } = require("sequelize");
const {User,BookSlotEvent,Langar,Paath} = require("./DataTypes")

const addLangar = async (langar) =>{
  const newLangar = Langar.build({
    date: langar.date,
    eventaddress: langar.eventaddress,
    orgname: langar.orgname,
    phonenumber: langar.phonenumber,
    fullName: langar.fullname,
    idUser: langar.idUser
  })  
  try {
    let langar ={}
    await newLangar.save().then((res)=>{
      langar = res.toJSON();
    })
    return langar
    }
    catch(err){
     console.log(err); 
    }
}
const findLangarById=async (idLangar)=>{
  try{
    const langar = await Langar.findOne({where: {idLangar: idLangar }})
    return langar.toJSON()
  }
  catch (err){
    console.log(err)
  }
}
const findAllLangar = async () =>{
  try{
    const allLangar = await Langar.findAll()
    return allLangar.toJSON()
  }
  catch (err){
    console.log(err)
  }
}
const updateLangarbyId= async (langar)=>{
  try {
    const updatedLangar = {}
    await Langar.update(langar  ,{where: {idLangar:langar.idLangar}}).then((res)=>{
      updatedLangar = res.toJSON();
    })
    return updatedLangar  
  }
  catch (err){
    console.log(err)
  }
}
module.exports = {addLangar,findLangarById,findAllLangar,updateLangarbyId}