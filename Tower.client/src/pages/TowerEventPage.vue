<template>
    <div class="col-6">
        <h1>{{ activeTowerEvent.name }}</h1>
        <h1>{{ activeTowerEvent.description }}</h1>
    </div>
    <div class="col-6 d-flex justify-content-end">
        <div v-if="account.id == activeTowerEvent.creatorId" class="btn btn-outline-danger" @click="remove">
          <i class="mdi mdi-delete"></i>
        </div>
    </div>
</template>

<script>
import { computed, watchEffect } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { towerEventService } from '../services/TowerEventService'
import { AppState } from '../AppState'
export default {
    // props: {
    //     towerEvent: {
    //         type: Object,
    //         required: true
    //     }
    // },
    setup(props) {
        const router = useRouter()
        const route = useRoute()
        watchEffect(async () => {
            if(route.params.id) {
                try {
                    await towerEventService.getById({ id: route.params.id })
                } catch (error) {
                    logger.error(error)
                    Pop.toast(error.message, "error")
                }
            }
        })
        return {
            async remove() {
                try {
                    if(await Pop.confirm()) {
                        router.push(
                            {
                                name: 'Home'
                            })
                        await towerEventService.remove(this.activeTowerEvent.id)
                        Pop.toast("Deleted Tower Event")
                    }
                } catch (error) {
                    logger.log(error)
                    Pop.toast(error.message, "error")
                }
            },
            account: computed(() => AppState.account),
            profile: computed(() => AppState.profile),
            activeTowerEvent: computed(() => AppState.activeTowerEvent)
        }
    }
}
</script>

<style>

</style>