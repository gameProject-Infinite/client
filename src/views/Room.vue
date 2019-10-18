<template>
  <div class="background">
    <div class="d-flex justify-content-end px-5" style="width:100vw">
     <b-button type="submit" variant="warning" class="mx-5"><i class="fas fa-sign-out-alt mr-2" style="color:black"></i>Exit</b-button>
    </div>
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
      <Card v-for="room in rooms" :key="room.id" :id="room.id" :title="room.name" :total="room.total" :status="room.status" :startGame="room.startGame"></Card>
    </div>
  </div>
</template>

<script>
import Card from '../components/Card.vue'

export default {
  name: 'rooms',
  components: {
    Card
  },
  data () {
    return {
      newRoom: '',
      isLoading: false,
      myactiveroom: ''
    }
  },
  methods: {
    createRoom () {
      if (this.newRoom) {
        let newRoom = {
          master: localStorage.getItem('id'),
          name: this.newRoom,
          members: [{
            id: localStorage.getItem('id'),
            name: localStorage.getItem('name')
          }],
          memberScores: [],
          status: true,
          createdAt: new Date()
        }
        this.$store.dispatch('createRoom', newRoom)
      } else {
        console.log('noooo')
      }
      this.newRoom = ''
    }
  },
  computed: {
    activeRoom: {
      get () {
        return this.$store.state.myactiveroom
      },
      set (value) {
        console.log(value)
      }
    },
    rooms: {
      get () {
        return this.$store.state.rooms
      },
      set (value) {
        console.log(value)
      }
    }
  },
  watch: {
    activeRoom () {
      console.log('berubah')
      console.log(this.activeRoom)
      this.$router.push(`/rooms/${this.activeRoom}`)
    },
    rooms () {
    }
  },
  created () {
    this.$store.dispatch('fetchRooms')
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
