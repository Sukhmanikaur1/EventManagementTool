// import { database } from '../services/EventService'

const slots = (type, newSlot, slotId) => {
        // if a databse exists, ignore 
        // if (database) return 
    /*
       Same type of temporary local storage used here as was used
       in the NewEvent component's handleSubmit function
   */

       let currentStorage = localStorage.getItem("slots")

       if (!currentStorage || currentStorage === 'undefined') {
           localStorage.setItem("slots", JSON.stringify([]))
           currentStorage = localStorage.getItem("slots")
       }

       let parsedCurrentSlots = JSON.parse(currentStorage)

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
                break;
       }

       let stringNewStorage = JSON.stringify(newStorage)

       localStorage.setItem("slots", stringNewStorage)

       if (type === 'set')
            return newStorage
}

const service = {
    slots
}

export default service