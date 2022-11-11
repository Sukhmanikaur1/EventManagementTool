const { Sequelize, DataTypes, Model } = require("sequelize");
const {User,BookSlotEvent,Langar,Paath} = require("./DataTypes")


const addUser = async (user) => {
  const newUser = await User.build({
    username: user.username,
    password: user.password,
    fname: user.fname,
    email: user.email,
    role:"guest",
    tokenId:null
  });
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
    return updateUser.toJSON()
  }catch(err){
    console.log(err)
  }
}
module.exports = { User,findByEmail,updateUser, addUser, deletebyUsername};
