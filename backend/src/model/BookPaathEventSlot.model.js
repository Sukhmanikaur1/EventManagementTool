const { Sequelize, DataTypes, Model } = require("sequelize");
const {User,BookSlotPaath,Langar,Paath} = require("./DataTypes")

const bookSlot= async(bookedSlot) => {
  
  const newBookSlot = await BookSlotPaath.build(
    {
          fullName: bookedSlot.fullName,
          phonenumber:bookedSlot.phonenumber,
          email:bookedSlot.email,
          time:bookedSlot.time, 
          date:bookedSlot.date,
          col:bookedSlot.col, 
          row:bookedSlot.row,
          PaathIdPaath:bookedSlot.PaathIdPaath,
          UserIdUser:bookedSlot.UserIdUser,
    })
    try{
      console.log("newbookslot",newBookSlot,"   bookedSlot", bookedSlot)
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
    const bookedSlot = await BookSlotPaath.findOne({where: {idBookSlot: idBookSlot }})
    return bookedSlot.toJSON()
  }
  catch (err){
    console.log(err)
  }
}
const findAllBookedSlot = async (paath) =>{
  try{
    const allbookedSlot = await BookSlotPaath.findAll({where:{PaathIdPaath:paath},include:["User","Paath"],raw: true,
    nest: true,})
    return JSON.parse(JSON.stringify(allbookedSlot))
  }
  catch (err){
    console.log(err)
  }
}
const updatedBookedSlotbyId= async (bookedSlot)=>{
  try {
    const updatedbookedSlot = {}
    await BookSlotPaath.update(bookedSlot  ,{where: {idbookedSlot:bookedSlot.idbookedSlot}}).then((res)=>{
      updatedbookedSlot = res.toJSON();
    })
    return updatedbookedSlot  
  }
  catch (err){
    console.log(err)
  }
}
module.exports= {BookSlotPaath,bookSlot,findAllBookedSlot}