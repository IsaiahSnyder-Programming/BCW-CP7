import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"
import { towerEventsService } from "./TowerEventService"


class TicketsService {
    async getAccountTickets(query) {
        const eventTickets = await dbContext.Tickets.find(query).populate('TowerEvent')
        return eventTickets.map(mongooseDocument => {
          const eventTicket = mongooseDocument.toJSON()
          return {
            ticketId: eventTicket.id,
            accountId: query.accountId,
            ...eventTicket.TowerEvent
          }
        })
      }
    
      async getEventTickets(query) {
        const goerTickets = await dbContext.Tickets.find(query).populate('EventGoer', 'name picture')
        return goerTickets.map(mongooseDocument => {
          const goerTicket = mongooseDocument.toJSON()
          return {
            ticketId: goerTicket.id,
            eventId: query.eventId,
            ...goerTicket.EventGoer
          }
        })
      }

      async getById(id) {
        const ticket = await dbContext.Tickets.findById(id).populate('EventGoer', 'name picture')
        if (!ticket) {
            throw new BadRequest('Invalid Ticket Id')
        }
        return ticket
    }
    
    async create(body) {
        const event = await towerEventsService.getById(body.eventId)
        if(event.capacity <= 0) {
          throw new BadRequest('No more tickets')
        }

        const ticketEvent = await dbContext.Tickets.create(body)

        event.capacity = event.capacity - 1
        await event.save()
        return ticketEvent
    }

    async remove(id, userId) {
      const original = await this.getById(id)
      const event = await towerEventsService.getById(original.eventId)
        if(original.accountId.toString() !== userId) {
            throw new BadRequest('You cannot remove this ticket')
        }
        event.capacity = event.capacity + 1
        await event.save()
        await dbContext.Tickets.findOneAndDelete({ _id: id})
    }
}

export const ticketsService = new TicketsService()