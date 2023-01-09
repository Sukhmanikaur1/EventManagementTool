import axios from 'axios'

export const database = false
const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
  };

let api = 'http://localhost:4000/'

class EventService {
    getEvents(tokenId) {
        return axios.get(api + 'event/allevents/:tokenId')
    }
    createEvent(eventObj) {
        console.log(eventObj)
        const res =axios.post(api + 'event/addevent',{
            event:eventObj})
        return res}
}

export default EventService