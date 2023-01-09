const { Sequelize, DataTypes, Model } = require("sequelize");
const {User,BookSlotEvent,Langar,Paath} = require("./DataTypes")


const addUser = async (user) => {
  const newUser = await User.build({
    username: user.username,
    password: user.password,
    fname: user.fname,
    lname:user.lname,
    email: user.email,
    role:"member",
    tokenId:null
  });
  try{
    let user={}
  await newUser.save().then((res) => {
    user= res.toJSON()
    const result = {user:user , code:"success"}
    return result
  });
  return user
  }catch(err){
    console.log(err)
  }
};
const deletebyUsername = async (email)=>{
    User.destroy({where: {email: email}})
}
const findUserByUserId = async (id)=>{
  
}
const findByEmail = async (email)=>{
    try{
  const user = await User.findOne({where: {email: email}})
  
  return user;
    }
    catch (err){
        console.log(err)
    }  
}
const updateUser = async (user)=>{
  try{
    await User.update(user,{where: {email:user.email}}).then((res)=>{console.log(res)})
    return user
  }catch(err){
    console.log(err)
    return err
  }
}
module.exports = { User,findByEmail,updateUser, addUser, deletebyUsername};
