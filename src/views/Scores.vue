<template>
  <div>
    <b-table striped hover :items="formattedScores"></b-table>
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
  created () {
    console.log(`ini ${this.scores}`)
  }
}
</script>

<style>

</style>
