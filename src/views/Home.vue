<template>
  <div class="background">
     <div class="formnya">
       <div class="transparant">
    <b-form style="width:300px" @submit.prevent="isLogin">
      <b-form-group id="input-group" label-for="input" label="Name :" style="font-weight:900">
        <b-form-input
          id="input-2"
          v-model="name"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="warning">Submit</b-button>
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
    background: url("https://lumiere-a.akamaihd.net/v1/images/open-uri20160913-10271-1xduyet_81d5b057.png?region=0%2C0%2C1024%2C576");
    background-size: 100%;
    background-repeat: no-repeat;
    height: 100vh;
    width: 100vw;
}
.formnya{
height: 100vh;
display: flex;
justify-content: center;
align-items: center
}
.transparant{
  width: 50vw;
  background: rgba(212, 210, 210, 0.719);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px
}
</style>
