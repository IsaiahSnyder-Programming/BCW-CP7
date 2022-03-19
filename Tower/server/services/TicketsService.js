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
            ...eventTicket.towerEvent
          }
        })
      }
    
      async getEventTickets(query) {
        const goerTickets = await dbContext.Tickets.find(query).populate('EventGoer', 'name picture')
        return goerTickets.map(mongooseDocument => {
          const goerTicket = mongooseDocument.toJSON()
          return {
            ticketId: goerTicket.id,
            ...goerTicket.EventGoer
          }
        })
      }

      async getById(id) {
        const ticket = await dbContext.Tickets.findById(id).populate('creator', 'name picture')
        if (!ticket) {
            throw new BadRequest('Invalid Ticket Id')
        }
        return ticket
    }
    
    async create(body) {
        const ticket = await towerEventsService.getById(body.eventId)
        const ticketEvent = await dbContext.Tickets.create(body)
        await ticket.save()
        return ticketEvent
    }

    async remove(id, userId) {
        const original = await this.getById(id)
        if(original.creatorId.toString() !== userId) {
            throw new BadRequest('You cannot remove this project')
        }
        await dbContext.Tickets.findOneAndDelete({ _id: id})
    }
}

export const ticketsService = new TicketsService()