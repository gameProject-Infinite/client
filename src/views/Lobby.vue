<template>
<div class="background">
    <div class="header">
      <h1 class="pb-2">LOBBY</h1>

    </div>
      <b-button @click="startGame" v-if="owner" class="btn btn-warning">Start Game</b-button>
      <div class="container table">
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
  created () {
    this.$store.dispatch('getMembers', this.roomId)
  }
}
</script>

<style scoped>
  .table {
    width: 400px;
    margin-top: 20px;
  }
</style>
