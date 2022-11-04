import axios from 'axios'

export const database = true

let baseUrl = 'http://localhost:4000/user'
export const registerUser= async (user)=>{
    try{
        const userdata = JSON.stringify(user)
        console.log(userdata)
        const res = await axios.post(baseUrl+`/register`,user )
        console.log(res)
        return res
    }
    catch(err){
        console.log(err)
    }
}
export const login = async ( email, password)=>{
    try{
        if(!password.current.value||!email.current.value)return null
        console.log(password.current.value)
        const res = await axios.post(baseUrl+`/login`,{email:email.current.value,password:password.current.value})
        console.log(res)
        return res
    }catch (err){
        console.log(err)
        return null
    }
}