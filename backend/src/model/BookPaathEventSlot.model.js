const { Sequelize, DataTypes, Model } = require("sequelize");
const {User,BookSlotEvent,Langar,Paath} = require("./DataTypes")

const bookSlot= async(bookedSlot) => {
  
  const newBookSlot = await BookSlotEvent.build(
    {
      phonenumber:bookedSlot.phonenumber,
      idUser: bookedSlot.idUser,
      idEvent: bookedSlot.idEvent,
      fname: bookedSlot.fname,
      email: bookedSlot.email,
      eventtype: bookedSlot.eventtype,
      eventaddress: bookedSlot.eventaddress,
    })
    try{
      let bookedEvent={}
    await newBookSlot.save().then((res) => {
      bookedEvent= res.toJSON()
    });
    return bookedEvent
    }catch(err){
      console.log(err)
    }
}
const findBookedSlotById=async (idBookSlot)=>{
  try{
    const bookedSlot = await BookSlotEvent.findOne({where: {idBookSlot: idBookSlot }})
    return bookedSlot.toJSON()
  }
  catch (err){
    console.log(err)
  }
}
const findAllBookedSlot = async () =>{
  try{
    const allbookedSlot = await BookSlotEvent.findAll()
    return allbookedSlot.toJSON()
  }
  catch (err){
    console.log(err)
  }
}
const updatedBookedSlotbyId= async (bookedSlot)=>{
  try {
    const updatedbookedSlot = {}
    await BookSlotEvent.update(bookedSlot  ,{where: {idbookedSlot:bookedSlot.idbookedSlot}}).then((res)=>{
      updatedbookedSlot = res.toJSON();
    })
    return updatedbookedSlot  
  }
  catch (err){
    console.log(err)
  }
}
module.export= {BookSlotEvent,bookSlot,updatedBookedSlotbyId,findBookedSlotById,updatedBookedSlotbyId}