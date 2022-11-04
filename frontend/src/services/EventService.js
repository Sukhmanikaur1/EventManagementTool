import axios from 'axios'
const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
  };
export const database = true

let api = 'http://localhost:4000/'

class EventService {
    getEvents() {
        return axios.get(api + 'event/allevents')
    }
    createEvent(eventObj) {
        console.log(eventObj)
        const res =axios.post(api + 'event/addevent',{
            event:eventObj})
        return res}
}

export default EventService