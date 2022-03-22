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
        logger.log(id.id, 'id test')
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

    async remove(id){
        const res = await api.delete('api/events/'+ id)
        logger.log('[delete event]', res.data)
        // AppState.activeProject = {}
        AppState.towerEvents = AppState.towerEvents.filter(p => p.id != id)
    }
}

export const towerEventService = new TowerEventService()