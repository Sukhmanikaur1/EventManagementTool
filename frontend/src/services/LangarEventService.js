import axios from 'axios'
let baseUrl = 'http://localhost:4000/Langar'

export const getAllEvents= async () =>{
    
    try{
        
        const allLangar = axios.get(baseUrl + '/allLangarEvents/')
        
        return allLangar
    }
    catch(err){
        console.log(err)
        return null
    }
}
export const addNewLangarEventInBackend = async (tokenId, langar) =>{
    
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
        const langarObj= {langar:langar}
        console.log(langarObj)
        const allLangar = await axios.post(baseUrl + '/addLangarEvent/'+tokenId, {langar:langar})
          console.log(allLangar)
        return allLangar
    }
    catch (err){
        console.log(err)
        return null;
    }
}
export const updateOneLangarEvent = async (tokenId,  langar) =>{
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
        const langarObj= {langar:langar}
        console.log(langarObj)
        const allLangar = await axios.patch(baseUrl + '/updateLangarEvent/'+tokenId, {langar:langar})
          console.log(allLangar)
        return allLangar
    }
    catch (err){
        console.log(err)
        return null;
    }
}
export const deleteOneLangarEvent = async (tokenId,  langar) =>{
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
        const langarObj= {langar:langar}
        console.log(langarObj)
        const allLangar = await axios.patch(baseUrl + '/deletelangarevent/'+tokenId, {langar:langar})
          console.log(allLangar)
        return allLangar
    }
    catch (err){
        console.log(err)
        return null;
    }
}