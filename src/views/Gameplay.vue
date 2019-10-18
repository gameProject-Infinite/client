<template>
  <div class="gameplay">
    <Scoreboard :score="score" style="float: left;"></Scoreboard>
    <Countdown style="float: right;" @endgame="endgame"></Countdown>
    <b-container class="bv-example-row gameplay-container">
      <b-row>
        <b-col v-for="i in hiddenMoleRow1Index" :key="i" class="mole-container">
          <Mole :show="hiddenMole[i]" @addScore="addScore"></Mole>
        </b-col>
      </b-row>
      <b-row>
        <b-col v-for="i in hiddenMoleRow2Index" :key="i" class="mole-container">
          <Mole :show="hiddenMole[i]" @addScore="addScore"></Mole>
        </b-col>
      </b-row>
      <b-row>
        <b-col v-for="i in hiddenMoleRow3Index" :key="i" class="mole-container">
          <Mole :show="hiddenMole[i]" @addScore="addScore"></Mole>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Mole from '../components/Mole'
import Scoreboard from '../components/Scoreboard'
import Countdown from '../components/Countdown'
import Swal from 'sweetalert2'

export default {
  name: 'Gameplay',
  components: {
    Mole,
    Scoreboard,
    Countdown
  },
  data () {
    return {
      score: 0,
      hiddenMole: {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false
      },
      hiddenMoleRow1Index: [0, 1, 2],
      hiddenMoleRow2Index: [3, 4, 5],
      hiddenMoleRow3Index: [6, 7, 8],
      audio: new Audio('http://soundbible.com/grab.php?id=1299&type=mp3'),
      hideShowInterval: ''
    }
  },
  methods: {
    addScore () {
      this.score = this.score + 10
    },
    hideShowMole () {
      this.hideShowInterval = setInterval(() => {
        let rand = Math.floor(Math.random() * Math.floor(9))
        for (let i in this.hiddenMole) {
          this.hiddenMole[i] = false
        }
        this.hiddenMole[rand] = !this.hiddenMole[rand]
        this.audio.play()
          .then(_ => {
            console.log('played')
          })
          .catch(err => {
            console.log(err)
          })
      }, 700)
    },
    endgame () {
      clearInterval(this.hideShowInterval)
      Swal.fire({
        title: `You got ${this.score}!`,
        confirmButtonText: 'Go to Scoreboard',
        allowOutsideClick: false
      })
        .then((value) => {
          console.log('then swal')
          let payload = {
            roomId: this.$route.params.id,
            score: this.score
          }
          this.$store.dispatch('setScore', payload)
          this.$router.push('/scores')
        })
        .catch(err => {
          Swal(err)
        })
    }
  },
  created () {
    this.hideShowMole()
  },
  deleted () {

  }
}
</script>

<style scoped>
.gameplay{
  background-image: url('../assets/grass.png');
  height: 100%;
  padding: 30px;
}
.gameplay-container {
  max-width: 600px;
  cursor: url('../assets/hammer.png') 30 64, default;
  background-image: url('https://image.freepik.com/free-vector/brown-soil-texture-background_1308-20483.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 3%;
}
.mole-container {
  height: 200px;
  width: 200px;
}

</style>
