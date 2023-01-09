import axios from 'axios'

export const database = true

let baseUrl = 'http://localhost:4000/user'
export const registerUser= async (user)=>{
    try{
        const res = await axios.post(baseUrl+`/register`,user )
        return res
    }
    catch(err){
        console.log(err)
        return null
    }
}
export const login = async ( email, password)=>{
    try{
        if(!password.current.value||!email.current.value)return null
        
        const res = await axios.post(baseUrl+`/login`,{email:email.current.value,password:password.current.value})
        return res
    }catch (err){
        console.log(err)
        return null
    }
}