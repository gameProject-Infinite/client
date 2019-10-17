<template>
  <div>
    <img v-show="show" @click="hit" src="../assets/mole.png">
  </div>
</template>

<script>
export default {
  name: 'Mole',
  props: {
    show: Boolean
  },
  methods: {
    hit () {
      this.$emit('addScore')
    }
  }
}
</script>

<style>
img {
  height: 150px;
  width: 150px;
}
</style>
