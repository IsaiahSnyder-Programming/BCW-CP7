<template>
    <form class="row bg-grey darken-20 justify-content-center elevation-3 p-2 m-5" @submit.prevent="createTowerEvent">

        <div class="col-md-4 mb-2">
            <label class="form-label"><b>Event Body</b></label>
            <input
                v-model="state.editable.name"
                required 
                type="text"
                class="form-control"
                aria-describedby="helpId">
        </div>

        <div class="col-md-8 mb-2">
            <label for="" class="form-label"><b>Description</b> (optional)</label>
            <input
                v-model="state.editable.description"
                type="text"
                class="form-control"
                aria-describedby="helpId"
            />
        </div>

        <div class="col-md-8 mb-2">
            <label for="" class="form-label"><b>Image</b></label>
            <input
                v-model="state.editable.coverImg"
                type="img"
                class="form-control"
                aria-describedby="helpId"
            />
        </div>

        <div class="col-md-8 mb-2">
            <label for="" class="form-label"><b>location</b></label>
            <input
                v-model="state.editable.location"
                type="text"
                class="form-control"
                aria-describedby="helpId"
            />
        </div>

        <div class="col-md-8 mb-2">
            <label for="" class="form-label"><b>capacity</b></label>
            <input
                v-model="state.editable.capacity"
                type="number"
                class="form-control"
                aria-describedby="helpId"
            />
        </div>

        <div class="col-md-8 mb-2">
            <label for="" class="form-label"><b>startDate</b></label>
            <input
                v-model="state.editable.startDate"
                type="date"
                class="form-control"
                aria-describedby="helpId"
            />
        </div>

        <div class="col-md-8 mb-2">
            <label for="" class="form-label"><b>type</b></label>
            <input
                v-model="state.editable.type"
                type="string"
                class="form-control"
                aria-describedby="helpId"
            />
        </div>

        <div class="col-md-8 mb-2">
            <label for="" class="form-label"><b>isCanceled</b></label>
            <input
                v-model="state.editable.isCanceled"
                type="checkbox"
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
import { reactive } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { towerEventService } from '../services/TowerEventService'
export default {
    props: {
        towerEvent: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const router = useRouter()
        const state = reactive({
            editable: {}
        })
        return {
            state,
            async createTowerEvent() {
                try {
                    logger.log('editable before service', state.editable)
                    let newTowerEvent = await towerEventService.create(state.editable)
                    state.editable = {}
                    Modal.getOrCreateInstance(document.getElementById('create-tower-event')).hide()
                    router.push(
                        {
                            name: 'TowerEvents',
                            params: { id: newTowerEvent.id }
                        }
                    )
                } catch (error) {
                    logger.error(error)
                    Pop.toast(error.message, 'error')
                }
            }
        }
    }
}
</script>

<style>

</style>