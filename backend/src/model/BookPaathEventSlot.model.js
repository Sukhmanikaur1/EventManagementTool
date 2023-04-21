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
    let bookedSlot = await BookSlotPaath.findOne({where: {idBookSlot: idBookSlot }})
    return bookedSlot
  }
  catch (err){
    console.log(err)
  }
}
const findAllBookedSlot = async (paath) =>{
  try{
    let allbookedSlot = await BookSlotPaath.findAll({where:{PaathIdPaath:paath},include:["User","Paath"],raw: true,
    nest: true,})
    return JSON.parse(JSON.stringify(allbookedSlot))
  }
  catch (err){
    console.log(err)
  }
}
const updatedBookedSlotbyId= async (bookedSlot)=>{
  try {
    let updatedbookedSlot = {}
    await BookSlotPaath.update(bookedSlot  ,{where: {idbookSlot:bookedSlot.idbookSlot}}).then((res)=>{
      updatedbookedSlot = res
    })
    return updatedbookedSlot  
  }
  catch (err){
    console.log(err)
  }
}
const deleteBookedSlotById= async (idBookSlot)=>{
  try{
    let deletedBookedSlot = {}
    await BookSlotPaath.destroy({where: {idBookSlot: idBookSlot}}).then((res)=>{
      deletedBookedSlot = res.toJSON()
    })
    return deletedBookedSlot
  }
  catch (err){
    console.log(err)
  }
}


module.exports= {BookSlotPaath,bookSlot,findAllBookedSlot,findBookedSlotById,updatedBookedSlotbyId,deleteBookedSlotById}