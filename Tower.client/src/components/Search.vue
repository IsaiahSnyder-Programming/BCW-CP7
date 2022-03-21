<template>
  <form class="row form-group justify-content-between p-3" @submit.prevent="search">
      <input type="text" v-model="searchTerm" class="col-9 rounded-2" placeholder="Search...">
      <button class="btn btn-outline-primary col-3 rounded-2">Search</button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import { towerEventService } from '../services/TowerEventService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
export default {
    setup() {
        const searchTerm = ref('')
        return {
            searchTerm,
            async search() {
                try {
                    await towerEventService.getAll({ query: searchTerm.value })
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