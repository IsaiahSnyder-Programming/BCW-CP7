import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class CommentsService {

    async create(commentData, eventId) {
        const res = await api.post('api/comments', commentData)
        logger.log(res.data)
        AppState.comments = [...AppState.comments, res.data]
    }

    async getAll(eventId) {
        const res = await api.get('api/events/' + eventId.id + '/comments')
        logger.log('GetAll Comments', res.data)
        AppState.comments = res.data
    }
}

export const commentsService = new CommentsService()