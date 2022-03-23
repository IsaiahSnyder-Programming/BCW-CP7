<template>
  <div class=" container-fluid flex-grow-1 d-flex flex-column text-light justify-content-start">

    <!-- STUB Search Bar -->
    <div class="row d-flex justify-content-between">
      <div class="col-4 bg-dark">
        <Search />
      </div>
      
      <button class="btn btn-outline-primary col-2" @click="filterEvents('Sport')">
        <h3>Sport</h3>
      </button>
      <button class="btn btn-outline-primary col-2" @click="filterEvents('Digital')">
        <h3>Digital</h3>
      </button>
      <button class="btn btn-outline-primary col-2" @click="filterEvents('Banger')">
        <h3>Banger</h3>
      </button>
      <button class="btn btn-outline-primary col-2" @click="filterEvents()">
        <h3>All</h3>
      </button>
    </div>


    <div class="row px-5 mb-5 justify-content-center">
      <div v-for="e in towerEvents" :key="e.id" class="col-md-8 mx-5">
        <TowerEventButton :towerEvent="e" />
      </div>
    </div>

  </div>

    <Modal id="create-tower-event" >
      <template #title> New Event </template>
      <template #body> <CreateTowerEvent /> </template>
      <template #footer> Footer </template>
    </Modal>

</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
import { towerEventService } from '../services/TowerEventService'
export default {
  name: 'Home',
  setup() {
    onMounted(async () => {
      try {
        await towerEventService.getAll()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      async filterEvents(string) {
        await towerEventService.getAll({ type: string })
      },
      towerEvents: computed(() => AppState.towerEvents),
      account: computed(() => AppState.account),
      profile: computed(() => AppState.profile),
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card{
    width: 50vw;
    > img{
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
