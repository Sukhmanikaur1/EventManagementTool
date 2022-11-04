const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = new Sequelize("userdb", "host", "Password1", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});
const Event = sequelize.define(
  "Event",
  {
    idEvent: {
      type: "integer",
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
enddate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    eventaddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    startdate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    eventtype: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    eventplace: {
      type: DataTypes.STRING,
      allowNull: true,
      
    },
    eventphone: {
      type: DataTypes.STRING,
      allowNull: true,
      
    },
    eventstatus: {
      type: DataTypes.STRING,
      allowNull: true,
      
    },
    eventname:{
      type: DataTypes.STRING,
      allowNull:false,
    }
  },
  {
    tableName: "events",
  }
  );
//   Event.hasMany(BookSlotEvent,{foreignKey: {name:"idBookSlot",allowNull: false},
// as: "bookedSlot"})
  sequelize.sync();
  const addEvent = async (event) => {
    console.log('in addevent in model');
    console.log(event)
  const newEvent = await Event.build({
    enddate: event.eventtype==="langar"?event.startdate:event.enddate,
    eventaddress: event.eventaddress,
    eventstatus: event.eventstatus,
    eventphone: event.eventphone,
    startdate: event.startdate,
    eventplace:event.eventplace,
    eventtype:event.eventtype,
    eventname:""
  });
  
  console.log('ne sswevent')
  console.log(newEvent);
  try{
    let event={}
  await newEvent.save().then((res) => {
    event= res.toJSON()
  });
  return event

  } catch (err){
    console.log(err)
  }
};
const deleteEventById = async (idEvent)=>{
    Event.destroy({where: {idEvent: idEvent}})
}
const findById = async (idEvent)=>{
    try{
  const event = await Event.findOne({where: {idEvent: idEvent}})
  console.log(event.toJSON())
  return event.toJSON();
    }
    catch (err){
        console.log(err)
    }  
}
const findAllEvents= async () =>{
    try{
        const events = await Event.findAll();
        return events;
    }
    catch(err){
        console.log(err)
    }
}

module.exports = { Event,findById, addEvent, deleteEventById, findAllEvents};
