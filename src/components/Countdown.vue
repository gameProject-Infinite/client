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
      seconds: 60
    }
  },
  methods: {
    runCountdown () {
      setInterval(() => {
        if (this.seconds) {
          this.seconds--
        } else {
          console.log('game over')
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
