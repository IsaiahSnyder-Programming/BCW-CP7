<template>
    <div class="">
        <h1>Help</h1>
        <img class="img-fluid rounded-circle" :src="accountTicket.picture" :title="accountTicket.name">
        <h1>{{accountTicket.eventId}}</h1>
    </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
import { watchEffect } from '@vue/runtime-core'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { towerEventService } from '../services/TowerEventService'
export default {
    props: {
        accountTicket: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        watchEffect(async () => {
            try {
                await towerEventService.getAll(props.accountTicket.eventId)
            } catch (error) {
                logger.error(error)
                Pop.toast(error.message, 'error')
            }
        })

        return {
            account: computed(() => AppState.account),
            tickets: computed(() => AppState.tickets),
            accountTickets: computed(() => AppState.accountTickets)
        }
    }
}
</script>

<style>

</style>