<template>
  <div class="background">
     <loading :active.sync="isLoading" color="#f2d221" :height="185" :width="210" :can-cancel="false" loader="dots"
      ></loading>
    <div class="header">
      <h1 class="pb-2">Room List</h1>
    <b-form style="width:300px" @submit.prevent="createRoom" class="d-flex">
      <b-form-group id="input-group" label-for="input" style="font-weight:900">
        <b-form-input
          id="input-2"
          v-model="newRoom"
          required
          placeholder="Create room"
        ></b-form-input>
      </b-form-group>
      <div>
      <b-button type="submit" variant="warning" class="ml-2">Submit</b-button>
      </div>
    </b-form>
    </div>
    <div class="board mt-3 d-flex flex-wrap">
      <Card v-for="(room , index) in rooms" :key="index" :title="room.name" :total="room.total"></Card>
    </div>
  </div>
</template>

<script>
import Card from '../components/Card.vue'
import db from '../apis/firestore'

export default {
  name: 'rooms',
  components: {
    Card
  },
  data () {
    return {
      newRoom: '',
      isLoading: false,
      rooms: []
    }
  },
  methods: {
    fetchRoom () {
      this.isLoading = true
      let rooms = []
      db.collection('room').onSnapshot(querySnapshot => {
        querySnapshot.forEach(el => {
          let room = el.data()
          let id = el.id
          let inforoom = {
            id: id,
            name: room.name,
            members: room.members,
            total: room.members.length,
            createdAt: new Date()
          }
          rooms.push(inforoom)
        })
        this.rooms = rooms
        this.isLoading = false
      })
    },
    createRoom () {
      if (this.newRoom) {
        let newRoom = {
          master: localStorage.getItem('id'),
          name: this.newRoom,
          members: [],
          status: false
        }
        this.$store.dispatch('createRoom', newRoom)
        this.fetchRoom()
      } else {
        console.log('noooo')
      }
      this.newRoom = ''
    }
  },
  created () {
    this.fetchRoom()
  }
}
</script>

<style scoped>
*{
  color: white
}
.background{
  height: 100vh;
  width: 100vw;
  background: url("https://img.freepik.com/free-vector/dark-stone-cave_1308-22272.jpg?size=626&ext=jpg");
  background-repeat: no-repeat;
  background-size: 100%;
  padding: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column
}
.board{
  background: #d8d4d49d;
  width: 90%;
  height: 100%;
  border-radius: 10px;
  overflow: scroll
}
</style>
