import Vue from 'vue'
import Vuex from 'vuex'
import db from '../apis/firestore'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    createRoom ({ commit }, payload) {
      console.log(payload)
      db.collection('room').add(payload)
        .then(function (docRef) {
          Swal.close()
          Swal.fire({
            title: 'Successfully Create',
            text: 'Room has been created',
            type: 'success',
            timer: 2000,
            showConfirmButton: false
          })
        })
    }
  },
  modules: {
  }
})
