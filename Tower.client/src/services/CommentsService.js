import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class CommentsService {
    async getAll(eventId) {
        logger.log("eventId",eventId)
        const res = await api.get('api/events/' + eventId.id + '/comments')
        logger.log('GetAll Comments', res.data)
        AppState.comments = res.data
    }
}

export const commentsService = new CommentsService()