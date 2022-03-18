import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class TowerEventsService {

    async getAll(query = {}) {
        const towerEvents = await dbContext.TowerEvents.find(query).populate('creator', 'name picture')
        return towerEvents
    }

    async getById(id) {
        const towerEvent = dbContext.TowerEvents.findById(id).populate('creator', 'name picture')
        if (!towerEvent) {
            throw new BadRequest('Invalid towerEvent Id')
        }
        return towerEvent
    }

    async create(newTowerEvent) {
        const towerEvent = await dbContext.TowerEvents.create(newTowerEvent)
        return towerEvent
    }

    async edit(id, update) {
        const original = await this.getById(id)
        if (original.creatorId.toString() !== update.creatorId) {
            throw new BadRequest('You cannot edit this data')
        }
        if(original.isCanceled == true) {
            throw new BadRequest('You cannot do the thing')
        }
        original.name = update.name
        original.description = update.description
        // original.isCanceled = update.isCanceled || false
        original.save()
        return original
    }

    async cancel(id) {
        const original = await dbContext.TowerEvents.findById(id)    
        original.isCanceled = !original.isCanceled
        await original.save()
        return original.isCanceled ? 'Is Canceled' : 'Is Not Canceled'
        
    }
}

export const towerEventsService = new TowerEventsService()