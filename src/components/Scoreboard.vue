<template>
  <div>
    <b-card-group deck>
      <b-card class="scoreboard-container"
        header="Score"
        header-tag="header"
        :footer="username"
        footer-tag="footer"
      >
      <div style="font-size: 50px;">
        {{ score }}
      </div>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  name: 'Scoreboard',
  props: {
    score: Number
  },
  data () {
    return {
      username: ''
    }
  },
  created () {
    this.username = localStorage.name
  }
}
</script>

<style>
.scoreboard-container {
  max-width: 300px;
  background: #754223;
  color: #fff459;
  font-size: 30px;
  font-family: 'Modak', cursive;
}
</style>
