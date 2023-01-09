import axios from 'axios'
let baseUrl = 'http://localhost:4000/personalevent'


export const updateOnePersonalEvents = async (event,tokenId)=>{
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
        const patchData=  {personalEventData:event}
        const allPersonalEvents = axios.patch(baseUrl + '/updatepersonalevents/'+tokenId, patchData)
        console.log(allPersonalEvents)
        return allPersonalEvents
    }
    catch(err){
        console.error(err)
        return null
    }
}
export const deleteOnePersonalEvents = async (event,tokenId)=>{
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
        const patchData=  {personalEventData:event}
        const allPersonalEvents = axios.patch(baseUrl + '/deletepersonalevents/'+tokenId, patchData)
        console.log(allPersonalEvents)
        return allPersonalEvents
    }
    catch(err){
        console.error(err)
        return null
    }
}

export const getAllPersonalEvents= async () =>{
    
    try{
        
        const allPersonalEvents = axios.get(baseUrl + '/allpersonalevents/')
        console.log(allPersonalEvents)
        return allPersonalEvents
    }
    catch(err){
        console.log(err)
        return null
    }
}
export const addNewPersonalEventInBackend = async (tokenId, personalEvent) =>{
    
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
        const personalEventObj= {"personalEventData":personalEvent}
        console.log("displaying personalEventObj")
        console.log(personalEventObj)
        const res = await axios.post(baseUrl + '/addPersonalEvent/'+tokenId, personalEventObj)
          console.log(res)
          return res
    }
    catch (err){
        console.log(err)
        return null;
    }
}