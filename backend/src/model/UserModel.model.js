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
// BookSlotEvent.belongsTo(User)
sequelize.sync();

const addUser = async (user) => {
  const newUser = await User.build({
    username: user.username,
    password: user.password,
    fname: user.fname,
    lname: user.lname,
    email: user.email,
    role:"guest",
    tokenId:null
  });
  console.log(newUser);
  try{
    let user={}
  await newUser.save().then((res) => {
    user= res.toJSON()
  });
  return user
  }catch(err){
    console.log(err)
  }
};
const deletebyUsername = async (email)=>{
    User.destroy({where: {email: email}})
}
const findByEmail = async (email)=>{
    try{
  const user = await User.findOne({where: {email: email}})
  console.log(user.toJSON())
  return user.toJSON();
    }
    catch (err){
        console.log(err)
    }  
}
const updateUser = async (user)=>{
  try{
    const updateUser= await User.update(user,{where: {email:user.email}})
    updateUser.dataValues=user
    console.log(updateUser)
    
  }catch(err){
    console.log(err)
  }
}
module.exports = { User,findByEmail,updateUser, addUser, deletebyUsername};
