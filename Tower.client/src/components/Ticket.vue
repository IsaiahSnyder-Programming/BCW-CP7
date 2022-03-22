<template>
    <div class="">
        <img class="img-fluid rounded-circle" :src="ticket.picture" :title="ticket.name">
    </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
export default {
    props: {
        ticket: {
            type: Object,
            required: true
        }
    },
    setup() {
        return {
            account: computed(() => AppState.account),
            tickets: computed(() => AppState.tickets)
        }
    }
}
</script>

<style>

</style>