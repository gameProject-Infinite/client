<template>
  <div >
    <b-card
        :title="title"
        style="max-width: 20rem; color:black;"
        class="m-4 card">
        <p>{{total}} players</p>
        <b-button @click="toGame" variant="primary">Enter Room</b-button>
    </b-card>
    </div>
</template>

<script>
export default {
  props: ['total', 'title']
}
</script>

<style scoped>
.card{
    width: 265px
}

</style>
