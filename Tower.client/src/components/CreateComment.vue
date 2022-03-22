<template>
  <form
    class="row bg-grey darken-20 justify-content-center elevation-3 p-2 m-5"
    @submit.prevent="createComment"
  >
    <div class="col-md-4 mb-2">
      <label class="form-label"><b>Note Body</b></label>
      <input
        v-model="state.editable.body"
        required
        type="text"
        class="form-control"
        aria-describedby="helpId"
      />
    </div>

    <div class="col-12 d-flex justify-content-end">
      <button class="btn btn-primary">Create</button>
    </div>
  </form>
</template>

<script>
import { computed, reactive } from '@vue/reactivity'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { Modal } from 'bootstrap'
import { commentsService } from '../services/CommentsService'
import { AppState } from '../AppState'
export default {
    props: {
        eventId: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const state = reactive({
            editable: {},
        })
        return {
            state,
            async createComment() {
                try {
                    state.editable.eventId = props.eventId
                    await commentsService.create(state.editable, this.activeTowerEvent)
                    state.editable = {}
                    Modal.getOrCreateInstance(document.getElementById('create-note')).hide()
                } catch (error) {
                    logger.log(error)
                    Pop.toast(error.message, 'error')
                }
            },
            activeTowerEvent: computed(() => AppState.activeTowerEvent)
        }
    },
}
</script>