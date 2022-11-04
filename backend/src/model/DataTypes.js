const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = new Sequelize("userdb", "host", "Password1", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});
const User = sequelize.define(
    "User",
    {
      idUser: {
        type: "integer",
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  
      fname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      role:{
        type:DataTypes.STRING,
        allowNull: false,
      },
      tokenId:{
        type: DataTypes.STRING(1000),
        allowNull: true,
        
      }
    },
    {
      tableName: "users",
    }
  );
  
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
  // console.log(getBooked)
  
  User.hasMany(BookSlotEvent,{foreignKey: {name:"idBookSlot",allowNull: false},
  as: "bookedSlot"})
  // BookSlotEvent.hasOne()
  // (User,{foreignKey: {name:"idUser",allowNull: false},
  // as: "userid"})
  BookSlotEvent.belongsTo(User,{foreignKey: {name:"idUser",allowNull: false},
  })
  BookSlotEvent.belongsTo(User,{foreignKey: {name:"email",allowNull: false},
  })
  BookSlotEvent.belongsTo(User,{foreignKey: {name:"fname",allowNull: false},
  })
  Event.hasMany(BookSlotEvent,{foreignKey: {name:"idBookSlot",allowNull: false},
as: "bookedSlot"})
BookSlotEvent.belongsTo(Event,{foreignKey: {name:"idEvent",allowNull: false}})
  sequelize.sync();
  BookSlotEvent.belongsTo(Event,{foreignKey: {name:"eventtype",allowNull: false}})
    BookSlotEvent.belongsTo(Event,{foreignKey: {name:"eventaddresss",allowNull: false}})
  
  module.exports = {User,Event,BookSlotEvent}