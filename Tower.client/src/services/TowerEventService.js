import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class TowerEventService {
    async create(eventData) {
        const res = await api.post('api/events', eventData)
        logger.log(res.data)
        // AppState.projects.unshift(res.data)
        AppState.towerEvents.push(res.data)
        return res.data
    }
}

export const towerEventService = new TowerEventService()