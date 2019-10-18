<template>
  <div class="countdown-container">
    <div>
      Countdown:
    </div>
    <div>
      {{ seconds }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Countdown',
  data () {
    return {
      seconds: 30
    }
  },
  methods: {
    runCountdown () {
      let countdownInterval = setInterval(() => {
        if (this.seconds) {
          this.seconds--
        } else {
          this.$emit('endgame')
          clearInterval(countdownInterval)
        }
      }, 1000)
    }
  },
  created () {
    this.runCountdown()
  }

}
</script>

<style>
.countdown-container {
  font-size: 50px;
  font-family: 'Modak', cursive;
}
</style>
