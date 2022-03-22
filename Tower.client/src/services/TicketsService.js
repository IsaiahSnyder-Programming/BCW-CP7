import { logger } from "../utils/Logger"
import { AppState } from '../AppState'
import { api } from "./AxiosService"

class TicketsService {
    async create(ticketData) {
        logger.log('ticketData', ticketData)
        const res = await api.post('api/tickets', ticketData)
        logger.log(res.data)
        AppState.tickets.push(res.data)
        return res.data
    }
}

export const ticketsService = new TicketsService()