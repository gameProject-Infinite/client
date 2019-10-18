<template>
<div class="background">
    <div class="header">
      <h1 class="py-4">LOBBY</h1>
    </div>
      <b-button @click="playGame" v-if="owner" class="btn btn-warning">Start Game</b-button>
      <div class="table m-auto">
        <b-table striped hover :items="membersName"></b-table>
      </div>
    </div>
</template>

<script>
export default {
  name: 'lobby',
  data () {
    return {
      roomId: this.$route.params.id
    }
  },
  computed: {
    members: {
      get () {
        return this.$store.state.dataMembers
      },
      set () {
      }
    },
    owner: {
      get () {
        return this.$store.state.master === localStorage.getItem('id')
      },
      set () {
      }
    },
    startGame: {
      get () {
        return this.$store.state.startGame
      },
      set () {
      }
    },
    membersName () {
      let membersName = []
      this.members.forEach((el, i) => {
        let member = {
          no: i + 1,
          name: el.name
        }
        membersName.push(member)
      })
      return membersName
    }
  },
  methods: {
    playGame () {
      this.$store.dispatch('startGame', this.roomId)
    }
  },
  created () {
    this.$store.dispatch('getMembers', this.roomId)
  },
  watch: {
    startGame () {
      if (this.startGame) {
        this.$router.push(`/gameplay/${this.roomId}`)
      }
    }
  }
}
</script>

<style scoped>
  .table {
    width: 390px;
    margin-top: 20px;
    background-color: rgb(255, 255, 255)
  }
  h1{
    color: white;
    font-size: 40pt;
    font-weight: 900
  }
  .background{
    height: 100vh;
    background: url("https://img.freepik.com/free-vector/background-scene-with-cave-mountain_1308-8111.jpg?size=626&ext=jpg");
    background-repeat: no-repeat;
    background-size: 100%
  }
</style>
