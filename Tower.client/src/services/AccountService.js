import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async getAccountTickets() {
    const res = await api.get('/account/tickets')
    logger.log('getAccountTickets res.data',res.data)
    AppState.accountTickets = res.data
  }

  async remove(id) {
    logger.log('accountService id', id)
    const res = await api.delete('api/tickets/' + id)
    logger.log('accountService removeTicket', res.data)
    AppState.tickets = AppState.tickets.filter(t => t.id != id)
  }
}

export const accountService = new AccountService()
