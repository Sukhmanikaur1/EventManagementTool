import axios from 'axios'

export const database = false

let api = 'http://localhost:8081/api'

class EventService {
    getEvents() {
        return axios.get(api + '/allevents')
    }
    createEvent(event) {
        return axios.post(api + '/addevent', event)
    }
}

export default EventService