<template>
    <div class="row">
        <img class="img-fluid rounded-circle" :src="ticket.creator.picture" :title="ticket.creator.picture">
    </div>
</template>

<script>
export default {
    props: {
        ticket: {
            type: Object,
            required: true
        }
    },
}
</script>

<style>

</style>