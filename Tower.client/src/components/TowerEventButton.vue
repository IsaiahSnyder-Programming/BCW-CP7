<template>
    <div class="row d-flex justify-content-center bg-light rounded-2">
        <div class="selectable d-flex align-items-center m-2" @click="goTo('TowerEvents')">
            <div class="col-12 d-flex flex-column justify-content-center align-items-middle">
                <div class="row bg-light rounded text-start text-dark p-3">
                    <div class="col-6">
                        <img class="img-fluid" :src="towerEvent.coverImg" alt="">
                    </div>

                    <div class="col-6">
                        <h4>{{ towerEvent.name }}</h4>
                        <h5>{{ towerEvent.description }}</h5>
                        <h5>{{ towerEvent.location }}</h5>
                        <h6>{{ towerEvent.startDate }}</h6>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-6">
            <div v-if="towerEvent.capacity > 0">
                <h1 class="text-dark">{{ towerEvent.capacity }}</h1>
            </div>
            <div v-else>
                <h1 class="text-danger">Sold Out</h1>
            </div>
        </div>

        <div v-if="account.id == towerEvent.creatorId" class="btn btn-outline-danger" @click="remove">
            <i class="mdi mdi-delete"></i>
        </div>
    </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { AppState } from '../AppState'
import { towerEventService } from '../services/TowerEventService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
export default {
    props: {
        towerEvent: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const router = useRouter()
        return {
            goTo(page) {
                router.push({
                    name: page,
                    params: {id: props.towerEvent.id}
                })
            },
            account: computed(() => AppState.account),

            async remove() {
                try {
                    if(await Pop.confirm()) {
                        await towerEventService.remove(props.towerEvent.id)
                        Pop.toast("Deleted towerEvent")
                    }
                } catch (error) {
                    logger.log(error)
                    Pop.toast(error.message, "error")
                }
            }
        }
    }
}
</script>

<style>

</style>