import axios from 'axios'

export const database = true

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