<template>
  <div class="score-container">
    <div class="scoreboard">
      <b-table striped hover :items="formattedScores"></b-table>
    </div>
    <b-button @click="toHome" class="button-done" variant="success">Play Again</b-button>
  </div>
</template>

<script>
export default {
  computed: {
    scores: {
      get () {
        return this.$store.state.memberScores
      }
    },
    formattedScores () {
      let scoresArr = []
      this.scores.forEach(score => {
        scoresArr.push({
          name: score.name,
          score: score.score
        })
      })
      scoresArr.sort(function (a, b) {
        return b.score - a.score
      })
      return scoresArr
    }
  },
  methods: {
    toHome () {
      localStorage.clear()
      this.$router.push('/')
    }
  },
  created () {
    console.log(`ini ${this.scores}`)
  }
}
</script>

<style>
.scoreboard {
  margin-top: 30px;
  background: #fcadf6;
  font-size: 30px;
  max-width: 700px;
  margin: auto;
  font-family: 'Fredoka One', cursive;
}

.score-container {
  background-image: url('../assets/grass.png');
  height: 100%;
  padding: 10px;
  border: none;
}

.button-done {
  font-family: 'Fredoka One', cursive;
  width: 300px;
}

.button-done::first-line {
  font-size: 50px;
  font-family: 'Fredoka One', cursive;
}
</style>
