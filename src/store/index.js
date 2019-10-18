import Vue from 'vue'
import Vuex from 'vuex'
import db from '../apis/firestore'
import Swal from 'sweetalert2'
import firebase from 'firebase/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    myactiveroom: false,
    player: {},
    players: [],
    rooms: []
  },
  mutations: {
    ENTERING_ROOM (state, payload) {
      state.myactiveroom = payload
      console.log(payload, 'ini payload')
    },
    PLAYER_IN_GAME (state, payload) {
      state.player = payload
    },
    PLAYERS_IN_ROOM (state, payload) {
      state.players = payload
    },
    ROOMS (state, payload) {
      state.rooms = payload
    },
    EMPTYROOMS (state, payload) {
      state.rooms = []
    }
  },
  actions: {
    createRoom ({ commit }, payload) {
      console.log(payload)
      db.collection('room').add(payload)
        .then(function (docRef) {
          commit('ENTERING_ROOM', docRef.id)
          // console.log(docRef)
          Swal.close()
          Swal.fire({
            title: 'Successfully Create',
            text: 'Room has been created',
            type: 'success',
            timer: 2000,
            showConfirmButton: false
          })
        })
    },
    joinRoom ({ commit }, payload) {
      console.log('hereeee')
      let player = {
        name: localStorage.getItem('name'),
        id: localStorage.getItem('id'),
        score: 0
      }
      db.collection('room')
        .doc(payload.roomId)
        .update({
          members: firebase.firestore.FieldValue.arrayUnion(player)
        })
        .then(() => {
          return db.collection('room').doc(payload.roomId).get()
        })
        .then(doc => {
          console.log(doc.data())
          if (doc.data().members.length >= 5) {
            db.collection('room').doc(payload.roomId).update({ status: false })
          } else {
            console.log('Successfuly join room')
            commit('PLAYERS_IN_ROOM', doc.data().members)
            commit('ENTERING_ROOM', payload.roomId)
            commit('PLAYER_IN_GAME', player)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchRooms ({ commit }) {
      let rooms = []
      db.collection('room').onSnapshot(querySnapshot => {
        querySnapshot.forEach(el => {
          let room = el.data()
          let id = el.id
          let inforoom = {
            id: id,
            name: room.name,
            members: room.members,
            total: room.members.length,
            createdAt: new Date(room.createdAt.seconds * 1000)
          }
          rooms.push(inforoom)
        })
        rooms.sort(function (a, b) {
          return b.createdAt - a.createdAt
        })
        commit('EMPTYROOMS')
        commit('ROOMS', rooms)
        rooms = []
      })
    }
  },
  modules: {
  }
})
