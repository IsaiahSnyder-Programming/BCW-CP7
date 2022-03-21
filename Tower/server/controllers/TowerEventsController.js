import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService";
import { ticketsService } from "../services/TicketsService";
import { towerEventsService } from "../services/TowerEventService";
import BaseController from "../utils/BaseController";
import { logger } from "../utils/Logger";


export class TowerEventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getAll)
            .get('/:id', this.getById)
            .get('/:id/comments', this.getEventComments)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .get('/:id/tickets', this.getTickets)
            .post('', this.create)
            .put('/:id', this.edit)
            .delete('/:id', this.cancel)
    }

    async getAll(req, res, next) {
        try {
            const towerEvents = await towerEventsService.getAll(req.query)
            res.send(towerEvents)
        } catch (error) {
            next(error)
        }
    }

    async getById(req, res, next) {
        try {
            const towerEvent = await towerEventsService.getById(req.params.id)
            return res.send(towerEvent)
        } catch (error) {
            next(error)
        }
    }

    async getTickets(req, res, next) {
        try {
          const tickets = await ticketsService.getEventTickets({ eventId: req.params.id })
          return res.send(tickets)
        } catch (error) {
          next(error)
        }
      }    

    async create(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const towerEvent = await towerEventsService.create(req.body)
            await towerEvent.populate('creator', 'name picture')
            return res.send(towerEvent)
        } catch (error) {
            next(error)
        }
    }

    async edit(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const updated = await towerEventsService.edit(req.params.id, req.body)
            return res.send(updated)
        } catch (error) {
            next(error)
        }
    }

    async cancel(req, res, next) {
        try {
            const towerEvent = await towerEventsService.cancel(req.params.id)
            return res.send(towerEvent)
        } catch (error) {
            next(error)
        }
    }

    async getEventComments(req, res, next) {
        try {
            // const sprints = sprintsService.getAll({ projectId: req.params.id })
            const comments = await commentsService.getEventComments(req.params.id)
            return res.send(comments)
        } catch (error) {
            next(error)
        }
    }
}