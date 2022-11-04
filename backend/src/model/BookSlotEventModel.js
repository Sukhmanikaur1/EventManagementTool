const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = new Sequelize("userdb", "host", "Password1", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});
const BookSlotEvent = sequelize.define(
  "BookSlotEvent",
  {
    idBookSlot: {
      type: "integer",
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    phonenumber:{
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    tableName: "bookedslots",
  }
)
// BookSlotEvent.belongsTo(Event,{foreignKey: {name:"idEvent",allowNull: false},
// as: "idevent"})

// BookSlotEvent.belongsTo(User,{foreignKey: {name:"idUser",allowNull: false},
// as: "userid"})
const bookSlot= async(bookedSlot) => {
  console.log(bookedSlot)
  const newBookSlot = await BookSlotEvent.build(
    {
      phonenumber:bookedSlot.phonenumber,
      userid: bookedSlot.userid,
      eventid: bookedSlot.eventid,
      fname: bookedSlot.fname,
      email: bookedSlot.email,
      eventtype: bookedSlot.eventtype,
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
sequelize.sync();
module.export= {BookSlotEvent,bookSlot}