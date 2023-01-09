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
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  
      fname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      role:{
        type:DataTypes.STRING,
        allowNull: false,
      },
      tokenId:{
        type: DataTypes.STRING(8000),
        allowNull: true,
        
      }
    },
    {
      tableName: "users",
    }
  );
  
const Langar = sequelize.define(
    "Langar",
    {
      idLangar: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
  date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      eventaddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      orgname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phonenumber: {
        type: DataTypes.STRING,
        allowNull:false,
      }, 
      fullName:{
        type: DataTypes.STRING,
        allowNull: false,
      }
      
    },
    {
      tableName: "langar",
    }
    );
    const Paath = sequelize.define(
      "Paath",
      {
        idPaath:{
          type:DataTypes.INTEGER,
          unique:true,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,

        },
        startDate: {
          type: DataTypes.DATE,
          allowNull: false,

        },
        enddate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        orgname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        eventaddress: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        phonenumber: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        status:{
          type: DataTypes.STRING,
          allowNull: false,
        }
      },

      {
        tableName: "paath"
      }
    )
  const BookSlotEvent = sequelize.define(
    "BookSlotPaath",
    {
      idBookSlot: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phonenumber:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      email:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "bookedslotspaath",
    }
  )
  // console.log(getBooked)
  const PersonalEvent = sequelize.define(
    "personalevent",
    {
      personaleventid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      eventname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      eventplace: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      eventaddress: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phonenumber:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      hostname:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      eventdate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      starttime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      endtime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      eventdescription: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "personalevent",
    }
  )

  User.hasMany(BookSlotEvent,{foreignKey: {name:"idBookSlot",allowNull: false},
  as: "bookedSlot"})
  User.hasMany(Langar)
    // ,{foreignKey: {name:"idUser",allowNull: false},as : "langar"})
  // BookSlotEvent.hasOne()
  // (User,{foreignKey: {name:"idUser",allowNull: false},
  // as: "userid"})
  Langar.belongsTo(User)
  // ,{foreignKey: {name:"id",allowNull: false}})
  Paath.hasMany(BookSlotEvent,{foreignKey: {name:"idBookSlot",allowNull: false}
, as:"Paath"})
  BookSlotEvent.belongsTo(Paath,{foreignKey:{name:"idPaath",allowNull: false}})
  BookSlotEvent.belongsTo(User,{foreignKey: {name:"idUser",allowNull: false},
  })
  sequelize.sync();
  module.exports = {User,BookSlotEvent,Langar,Paath,PersonalEvent}