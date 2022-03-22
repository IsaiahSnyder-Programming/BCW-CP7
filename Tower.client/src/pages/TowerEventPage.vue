<template>
    <div class="row m-3 shadow">
        <div class="col-6">
            <img class="img-fluid" :src="activeTowerEvent.coverImg" alt="">
        </div>
        <div class="col-6">
            <h1>{{ activeTowerEvent.name }}</h1>
            <h6>{{ activeTowerEvent.description }}</h6>



            <div class="d-flex justify-content-end">
                <div v-if="account.id == activeTowerEvent.creatorId" class="btn btn-outline-danger" @click="cancel">
                <i>Cancel Event</i>
                </div>
            </div>

            <div class="col-6">
                <div v-if="activeTowerEvent.isCanceled == false">
                    <div v-if="account.id == activeTowerEvent.creatorId">
                        <i
                            v-if="account.id == activeTowerEvent.creatorId"
                            data-bs-toggle="modal"
                            data-bs-target="#edit-event"
                            class="mdi mdi-pencil selectable"
                        >Edit Event</i>
                    </div>
                </div>
                <div v-else>
                    <h1 class="text-danger">Event Canceled</h1>
                </div>

                <div v-if="activeTowerEvent.isCanceled == false">
                    <div v-if="eventTickets">
                        <h1 class="text-danger">You have a ticket already</h1>
                    </div>
                    <div v-else>
                        <button class="btn btn-outline-primary" @click="getTicket">Get Tickets</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-12 shadow">
        <div class="row px-5 mb-5 d-flex">
            <div v-for="t in tickets" :key="t.id" class="mx-5">
                <Ticket :ticket="t" />
            </div>
        </div>
    </div>

    <div class="col-12">
      <i
        data-bs-toggle="modal"
        :data-bs-target="'#create-comment' + activeTowerEvent.id"
        class="mdi mdi-pencil selectable"
        >Create New Comment</i
      >
    </div>

    <div class="row px-5 mb-5 justify-content-center">
        <div v-for="c in comments" :key="c.id" class="col-md-8 mx-5">
            <Comments :comment="c" />
        </div>
    </div>

    <Modal :id="'create-comment' + activeTowerEvent.id">
        <template #title> Create New Comment {{ activeTowerEvent.name }} </template>
        <template #body> <CreateComment :eventId="activeTowerEvent.id" /> </template>
        <template #footer> Footer </template>
    </Modal>

    <Modal id="create-tower-event" >
      <template #title> New Event </template>
      <template #body> <CreateTowerEvent /> </template>
      <template #footer> Footer </template>
    </Modal>

    <Modal id="edit-event" >
      <template #title> Edit Event </template>
      <template #body> <EditTowerEvent /> </template>
      <template #footer> Footer </template>
    </Modal>
</template>

<script>
import { computed, watchEffect } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { towerEventService } from '../services/TowerEventService'
import { commentsService } from '../services/CommentsService'
import { ticketsService } from '../services/TicketsService'
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
                    await commentsService.getAll({ id: route.params.id })
                    await towerEventService.getTicketsByEvent(route.params.id)
                } catch (error) {
                    logger.error(error)
                    Pop.toast(error.message, "error")
                }
            }
        })
        return {
            async getTicket() {
                try {
                    await ticketsService.create({eventId: route.params.id})
                } catch (error) {
                    logger.log(error)
                    Pop.toast(error.message, 'error')
                }
            },
            async cancel() {
                try {
                    if(await Pop.confirm()) {
                        await towerEventService.cancel(this.activeTowerEvent.id)
                        Pop.toast("Deleted Tower Event")
                    }
                } catch (error) {
                    logger.log(error)
                    Pop.toast(error.message, "error")
                }
            },
            account: computed(() => AppState.account),
            profile: computed(() => AppState.profile),
            comments: computed(() => AppState.comments),
            activeTowerEvent: computed(() => AppState.activeTowerEvent),
            tickets: computed(() => AppState.tickets),
            eventTickets: computed(() => AppState.tickets.find(t => t.eventId == route.params.id))
        }
    }
}
</script>

<style>

</style>