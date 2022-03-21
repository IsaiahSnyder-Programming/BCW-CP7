import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class CommentsService {
    async create(newComment) {
        const comment = await dbContext.Comments.create(newComment)
        return comment
    }

    async getAll(query = {}) {
        const comment = await dbContext.Comments.findById(query).populate('creator', 'name picture')
        return comment
    }

    async getById(id) {
        const comment = await dbContext.Comments.findById(id).populate('creator', 'name picture')
        if (!comment) {
            throw new BadRequest('Invalid Comment Id')
        }
        return comment
    }

    async getEventComments(id) {
        const sprints = await dbContext.Comments.find({ eventId: id }).populate('creator', 'name picture')
        return sprints
    }

    async remove(id, userId) {
        const original = await this.getById(id)
        if(original.creatorId.toString() !== userId) {
            throw new BadRequest('You cannot remove this project')
        }
        await dbContext.Comments.findOneAndDelete({ _id: id})
    }
}

export const commentsService = new CommentsService() 