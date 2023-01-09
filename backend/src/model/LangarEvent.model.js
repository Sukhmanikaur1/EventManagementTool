const { Sequelize, DataTypes, Model } = require("sequelize");
const {User,BookSlotEvent,Langar,Paath} = require("./DataTypes")

const addLangar = async (langar) =>{
  
  const newLangar = await Langar.create({
    date: langar.date,
    eventaddress: langar.eventaddress,
    orgname: langar.orgname,
    phonenumber: langar.phonenumber,
    fullName: langar.fullname,
    UserIdUser: langar.UserIdUser
  })  
  
  try {
    let langar ={}
    await newLangar.save().then((res)=>{
      langar = res.toJSON();
    })
    return await findAllLangar()
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
    const Op = Sequelize.Op;
    let todayDate = new Date();
    const allLangar = await Langar.findAll({date:{[Op.gt]:todayDate},include:["User"],raw: true,
    nest: true,})
    console.log("allLangar")
    console.log(allLangar)
    return allLangar
  }
  catch (err){
    console.log(err)
  }
}
const updateLangarbyId= async (langar)=>{
  try {
    console.log("updateLangar")
    console.log(langar)
    const newLangar = {
      date: langar.date,
      eventaddress: langar.eventaddress,
      orgname: langar.orgname,
      phonenumber: langar.eventphone,
      fullName: langar.fullName,
      UserIdUser: langar.UserIdUser
    }
    console.log("newLangar")
    console.log(newLangar)
    let updatedLangar = {}
    await Langar.update(newLangar  ,{where: {idLangar:langar.idLangar}}).then((res)=>{
      updatedLangar = res;
    })
    updatedLangar =await findAllLangar()
    console.log("updatedLangar")
    console.log(updatedLangar)
    return updatedLangar  
  }
  catch (err){
    console.log(err)
  }
}
const deleteLangarEventbyId= async (langarEvent)=>{
  try {
    let deletedLangarEvent = {}
    console.log(langarEvent)
    
    await PersonalEvent.destroy({where: {idLangar:langarEvent.idLangar}}).then((res)=>{
        deletedLangarEvent = JSON.parse(res);
    })
    deletedLangarEvent= await findAllLangar()
    console.log(deletedLangarEvent)
    return deletedLangarEvent  
  }
  catch (err){
    console.log(err)
  }
}
module.exports = {addLangar,findLangarById,findAllLangar,updateLangarbyId}