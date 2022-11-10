import { database } from '../services/EventService'

const parseOrStringifyStorage = (item, newStorage) => {

    if (newStorage) {
        let stringNewStorage = JSON.stringify(newStorage)
        localStorage.setItem(item, stringNewStorage)
        return
    }

    let currentStorage = localStorage.getItem(item)

    if (!currentStorage || currentStorage === 'undefined') {
        localStorage.setItem(item, JSON.stringify([]))
        currentStorage = localStorage.getItem(item)
    }

    return JSON.parse(currentStorage)
}

const slots = (type, newSlot, slotId) => {
        // if a databse exists, ignore 
        if (database) return 

       let parsedCurrentSlots = parseOrStringifyStorage("slots")
       let newStorage;

       switch(type) {
            case 'update':
                newStorage = parsedCurrentSlots.map(s => s.id === newSlot.id ? newSlot : s)
                break;
            case 'create':
                newStorage = [...parsedCurrentSlots, newSlot]
                break;
            case 'delete':
                newStorage = parsedCurrentSlots.filter(s => s.id !== slotId)
                break;
            case 'set':
                newStorage = parsedCurrentSlots
                break;
            default:
                console.log('test')
                break;
       }

       parseOrStringifyStorage("slots", newStorage)

       if (type === 'set') return newStorage
}



const events = (type, newEvent, eventId) => {
    // if a databse exists, ignore 
    if (database) return 

   let parsedCurrentEvents = parseOrStringifyStorage("events")
   let newStorage;

   switch(type) {
        case 'update':
            newStorage = parsedCurrentEvents.map(s => s.eventid === newEvent.eventid ? newEvent : s)
            break;
        case 'create':
            newStorage = [...parsedCurrentEvents, newEvent]
            break;
        case 'delete':
            newStorage = parsedCurrentEvents.filter(s => s.eventid !== eventId)
            break;
        case 'set':
            newStorage = parsedCurrentEvents
            break;
        default:
            console.log('test')
            break;
   }

   parseOrStringifyStorage("events", newStorage)

   if (type === 'set') return newStorage
}

const service = {
    slots,
    events
}

export default service