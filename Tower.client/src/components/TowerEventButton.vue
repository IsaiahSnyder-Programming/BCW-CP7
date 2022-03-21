<template>
    <div class="row d-flex justify-content-center bg-light rounded-2">
        <div class="selectable d-flex align-items-center m-2" @click="goTo('Project')">
            <div class="col-12 d-flex flex-column justify-content-center align-items-middle">
                <div class="bg-light rounded text-start text-dark p-3">
                    <h1>Hello</h1>
                </div>
            </div>
        </div>
        <!-- <div v-if="account.id == project.creatorId" class="btn btn-outline-danger" @click="remove">
            <i class="mdi mdi-delete"></i>
        </div> -->
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
    props: {
        towerEvent: {
            typer: Object,
            required: true
        }
    },
    setup(props) {
        const router = useRouter()
        return {
            
        }
    }
}
</script>

<style>

</style>