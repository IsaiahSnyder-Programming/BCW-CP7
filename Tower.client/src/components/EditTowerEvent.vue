<template>
    <form class="row bg-grey darken-20 justify-content-center elevation-3 p-2 m-5" @submit.prevent="update">

        <div class="col-md-4 mb-2">
            <label class="form-label"><b>Event Body</b></label>
            <input
                v-model="editable.name"
                required 
                type="text"
                class="form-control"
                aria-describedby="helpId">
        </div>

        <div class="col-md-8 mb-2">
            <label for="" class="form-label"><b>Description</b> (optional)</label>
            <input
                v-model="editable.description"
                type="text"
                class="form-control"
                aria-describedby="helpId"
            />
        </div>

        <div class="col-md-8 mb-2">
            <label for="" class="form-label"><b>Image</b></label>
            <input
                v-model="editable.coverImg"
                type="img"
                class="form-control"
                aria-describedby="helpId"
            />
        </div>

        <div class="col-md-8 mb-2">
            <label for="" class="form-label"><b>location</b></label>
            <input
                v-model="editable.location"
                type="text"
                class="form-control"
                aria-describedby="helpId"
            />
        </div>

        <div class="col-md-8 mb-2">
            <label for="" class="form-label"><b>capacity</b></label>
            <input
                v-model="editable.capacity"
                type="number"
                class="form-control"
                aria-describedby="helpId"
            />
        </div>

        <div class="col-md-8 mb-2">
            <label for="" class="form-label"><b>startDate</b></label>
            <input
                v-model="editable.startDate"
                type="date"
                class="form-control"
                aria-describedby="helpId"
            />
        </div>

        <div class="col-md-8 mb-2">
            <label for="" class="form-label"><b>type</b></label>
            <input
                v-model="editable.type"
                type="string"
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
import { reactive, ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { towerEventService } from '../services/TowerEventService'
import { Modal } from 'bootstrap'
import { watchEffect } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
    setup() {
        const editable = ref({})
        watchEffect(() => {
            editable.value = AppState.activeTowerEvent
        })
        return {
            editable,
            async update() {
                try {
                    await towerEventService.update(editable.value)
                } catch (error) {
                    logger.error(error);
                    Pop.toast(error.message, "error");
                }
            }
        }
    }
}
</script>

<style>

</style>