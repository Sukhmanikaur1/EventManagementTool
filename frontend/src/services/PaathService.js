import axios from 'axios'
let baseUrl = 'http://localhost:4000/paath'

export const getAllPaathEvents= async () =>{
    
    try{
        
        const allPaath = axios.get(baseUrl + '/allpaathevents/')
        
        return allPaath
    }
    catch(err){
        console.log(err)
        return null
    }
}
export const addNewpaatheventInBackend = async (tokenId, paath) =>{
    console.log(tokenId)
    axios.interceptors.request.use(
        config => {
          config.headers['Authorization'] = `Bearer ${tokenId}`;
              return config;
          },
          error => {
              return Promise.reject(error);
          }
      );
      
    try{
        console.log(axios.config)
        console.log(tokenId)
        const paathObj= {paath:paath}
        console.log(paathObj)
        const allpaath = await axios.post(baseUrl + '/addpaathevent/'+tokenId, {paath:paath})
          console.log(allpaath)
        return allpaath
    }
    catch (err){
        console.log(err)
        return null;
    }
}
export const updateOnePaathEvent = async (tokenId,  paath) =>{
    axios.interceptors.request.use(
        config => {
          config.headers['Authorization'] = `Bearer ${tokenId}`;
              return config;
          },
          error => {
              return Promise.reject(error);
          }
      );
      try{
        console.log(tokenId)
        const paathObj= {paath:paath}
        console.log(paathObj)
        const allpaath = await axios.patch(baseUrl + '/updatepaathEvent/'+tokenId, {paath:paath})
          console.log(allpaath)
        return allpaath
    }
    catch (err){
        console.log(err)
        return null;
    }
}
export const deleteOnePaathEvent = async (tokenId,  paath) =>{
    axios.interceptors.request.use(
        config => {
          config.headers['Authorization'] = `Bearer ${tokenId}`;
              return config;
          },
          error => {
              return Promise.reject(error);
          }
      );
      try{
        console.log(tokenId)
        const paathObj= {paath:paath}
        console.log(paathObj)
        const allPaath = await axios.patch(baseUrl + '/deletepaathevent/'+tokenId, {paath:paath})
          console.log(allPaath)
        return allPaath
    }
    catch (err){
        console.log(err)
        return null;
    }
}