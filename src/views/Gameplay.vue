<template>
  <div class="gameplay">
    <b-container class="bv-example-row gameplay-container">
      <b-row>
        <b-col v-for="i in hiddenMoleRow1Index" :key="i" class="mole-container">{{ i }}
          <Mole :show="hiddenMole[i]"></Mole>
        </b-col>
      </b-row>
      <b-row>
        <b-col v-for="i in hiddenMoleRow2Index" :key="i" class="mole-container">{{ i }}
          <Mole :show="hiddenMole[i]"></Mole>
        </b-col>
      </b-row>
      <b-row>
        <b-col v-for="i in hiddenMoleRow3Index" :key="i" class="mole-container">{{ i }}
          <Mole :show="hiddenMole[i]"></Mole>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Mole from '../components/Mole'

export default {
  name: 'Gameplay',
  components: {
    Mole
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
      hiddenMoleRow3Index: [6, 7, 8]
    }
  },
  methods: {
    addScore () {
      console.log('hit!')
      this.score++
    },
    hideShowMole () {
      setInterval(() => {
        console.log('masuk toggle')
        let rand = Math.floor(Math.random() * Math.floor(9))
        for (let i in this.hiddenMole) {
          this.hiddenMole[i] = false
        }
        this.hiddenMole[rand] = !this.hiddenMole[rand]
      }, 500)
    }
  },
  created () {
    this.hideShowMole()
  }
}
</script>

<style scoped>
.gameplay-container {
  max-width: 800px;
}
.mole-container {
  height: 200px;
  width: 200px;
}
img {
  height: 150px;
  width: 150px;
}
</style>
