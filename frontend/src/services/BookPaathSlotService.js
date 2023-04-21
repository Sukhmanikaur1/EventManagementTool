import axios from 'axios'
let baseUrl = 'http://localhost:4000/bookpaathslot'

export const getAllPaathEvents= async (paath,tokenId) =>{
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
        const allbookslotsforPaath =await axios.get(baseUrl + '/allbookslotsevents/'+paath)
        return allbookslotsforPaath
    }
    catch(err){
        console.log(err)
        return null
    }
}

export const addNewBookPaathSlot = async (tokenId, bookslotpaath) =>{
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
        const bookslotpaathObj= {bookslotpaath:bookslotpaath}
        console.log(bookslotpaathObj)
        const allpaath = await axios.post(baseUrl + '/addbookpaathslot/', {bookslotpaath:bookslotpaath})
          console.log(allpaath)
        return allpaath
    }
    catch (err){
        console.log(err)
        return null;
    }
}
export const updateOneBookedPaathSlot = async (tokenId,  bookedslot) =>{
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
        const allbookedslot = await axios.patch(baseUrl + '/updateonepaathslotevent/', {bookedslot:bookedslot})
          console.log(allbookedslot)
        return allbookedslot
    }
    catch (err){
        console.log(err)
        return null;
    }
}
export const deleteOneBookedSlot = async (tokenId,  bookedslot) =>{
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
        console.log(bookedslot)
        const allbookedslot = await axios.patch(baseUrl + '/deletebookedslot/'+bookedslot,{})
          console.log(allbookedslot)
        return allbookedslot
    }
    catch (err){
        console.log(err)
        return null;
    }
}