<template>

  <div class="row">

  </div>

  <div class="row shadow">
    <div class="d-flex align-items-center">
      <div class="col-1">
        <img class="img-fluid rounded-circle" :src="comment.creator.picture" alt="">
      </div>
      <div class="col-11">
        <h5>{{ comment.creator.name }}</h5>
      </div>
    </div>
    <div class="col-12">
      <h6>{{ comment.body }}</h6>
    </div>

    <div v-if="account.id == comment.creatorId" class="btn btn-outline-danger" @click="remove">
      <i class="mdi mdi-delete"></i>
    </div>
  </div>

</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { watchEffect } from '@vue/runtime-core'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { commentsService } from '../services/CommentsService'
import { AppState } from '../AppState'
export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    const editable = ref({})
    watchEffect(async () => {
      try {
        // await commentsService.getAll(route.params.id)
      } catch (error) {
        logger.log(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      account: computed(() => AppState.account),
      profile: computed(() => AppState.profile),
      comments: computed(() => AppState.comments),

      async remove() {
          try {
              if(await Pop.confirm()) {
                  await commentsService.remove(props.comment.id)
                  Pop.toast("Deleted Project")
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