<template>
  <div >
    <b-card
        :title="title"
        style="max-width: 20rem; color:black;"
        class="m-4 card">
        <p>{{total}} players</p>
        <b-button @click="toGame(id)" variant="primary" v-if="status">Enter Room</b-button>
    </b-card>
    </div>
</template>

<script>
export default {
  props: ['total', 'title', 'id', 'status'],
  methods: {
    toGame (id) {
      if (this.total < 5) {
        let payload = {
          roomId: id
        }
        this.$store.dispatch('joinRoom', payload)
        this.$router.push(`/rooms/${id}`)
      } else {
        console.log('noooo')
      }
    }
  },
  created () {
    console.log(this.status)
  }
}
</script>

<style scoped>
.card{
    width: 265px
}

</style>
