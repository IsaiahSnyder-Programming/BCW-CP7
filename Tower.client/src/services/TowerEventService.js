import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TowerEventService {

    async getAll(query = {}) {
        const res = await api.get('api/events', {params: query})
        logger.log(res.data)
        AppState.towerEvents = res.data
    }

    async getById(id) {
        const res = await api.get('api/events/' + id.id)
        logger.log(res.data)
        AppState.activeTowerEvent = res.data
    }

    async create(eventData) {
        const res = await api.post('api/events', eventData)
        logger.log(res.data)
        // AppState.projects.unshift(res.data)
        AppState.towerEvents.push(res.data)
        return res.data
    }

    async update(updateBody) {
        logger.log('TOwerEventsService UpdateBody',updateBody)
        const res = await api.put('api/events/' + updateBody.id, updateBody)
        logger.log('[update TowerEvent]', res.data)
        AppState.activeTowerEvent = res.data
      }

    async cancel(id){
        const res = await api.delete('api/events/'+ id)
        logger.log('[delete event]', res.data)
        AppState.towerEvents.isCanceled = !AppState.towerEvents.isCanceled
        // AppState.towerEvents = AppState.towerEvents.filter(p => p.id != id)

        // let index = AppState.towerEvents.findIndex(e => p.id === id) 
        // AppState.towerEvents.splice(index, 1, )?
    }

    async getTicketsByEvent(eventId){
        const res = await api.get('api/events/' + eventId + '/tickets')
        logger.log('get tickets res', res.data)
        AppState.tickets = res.data
    }
}

export const towerEventService = new TowerEventService()