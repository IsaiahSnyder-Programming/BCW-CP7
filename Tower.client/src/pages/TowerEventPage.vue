<template>
    <div class="col-6">
        <img class="img-fluid" :src="activeTowerEvent.coverImg" alt="">
        <h1>{{ activeTowerEvent.name }}</h1>
        <h6>{{ activeTowerEvent.description }}</h6>
    </div>
    <div class="col-6 d-flex justify-content-end">
        <div v-if="account.id == activeTowerEvent.creatorId" class="btn btn-outline-danger" @click="remove">
          <i class="mdi mdi-delete"></i>
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
</template>

<script>
import { computed, watchEffect } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { towerEventService } from '../services/TowerEventService'
import { commentsService } from '../services/CommentsService'
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
            comments: computed(() => AppState.comments),
            activeTowerEvent: computed(() => AppState.activeTowerEvent)
        }
    }
}
</script>

<style>

</style>