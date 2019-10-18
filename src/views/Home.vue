<template>
  <div class="background">
     <div class="formnya">
       <div class="transparant">
          <div class="game-name" d="M6,150C49.63,93,105.79,36.65,156.2,47.55,207.89,58.74,213,131.91,264,150c40.67,14.43,108.57-6.91,229-145">
            INFINITE MOLE
          </div>
         <img src="../assets/mole.png"/>
    <b-form style="width:300px" @submit.prevent="isLogin">
      <b-form-group id="input-group" label-for="input" style="font-weight:900">
        <b-form-input
          id="input-2"
          v-model="name"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>

      <b-button class="button-play" type="submit" variant="warning">Play Now!</b-button>
    </b-form>
       </div>
  </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: ''
    }
  },
  methods: {
    isLogin () {
      console.log('heii')
      let id = ''
      let char = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890'
      for (let i = 0; i < 20; i++) {
        let random = Math.floor(Math.random() * char.length)
        id += char[random]
      }
      localStorage.setItem('name', this.name)
      localStorage.setItem('id', id)
      this.name = ''
      this.$router.push('/rooms')
    }
  }
}
</script>

<style scoped>

.background{
  background-image: url('../assets/grass.png');
  height: 100vh;
  width: 100vw;
  padding-top: 50px;
}
.formnya{
height: 100vh;
display: flex;
justify-content: center;
align-items: flex-start;
}
.transparant{
  width: 50vw;
  height: 75vh;
  background-image: url('https://image.freepik.com/free-vector/brown-soil-texture-background_1308-20483.jpg');
  background-size: cover;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px
}
img {
  height: 25vh;
  width: 12vw;
}
.game-name {
  color: #ffd359;
  font-size: 62pt;
  font-family: 'Modak', cursive;
  -webkit-text-stroke: 4px rgb(29, 29, 29);
}
.button-play {
  font-family: 'Fredoka One', cursive;
  width: 300px;
}

.button-play::first-line {
  font-size: 50px;
  font-family: 'Fredoka One', cursive;
}
</style>
