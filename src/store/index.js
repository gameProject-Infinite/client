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
    rooms: [],
    dataMembers: [],
    master: false,
    startGame: false,
    memberScores: []
  },
  mutations: {
    ENTERING_ROOM (state, payload) {
      state.myactiveroom = payload
      console.log(payload, 'ini payload')
    },
    PLAYER_IN_GAME (state, payload) {
      state.player = payload
    },
    ROOMS (state, payload) {
      state.rooms = payload
    },
    EMPTYROOMS (state, payload) {
      state.rooms = []
    },
    DATA_MEMBERS (state, payload) {
      state.dataMembers = payload
    },
    MASTER_ROOM (state, payload) {
      state.master = payload
    },
    START_GAME (state, payload) {
      state.startGame = payload
    },
    SET_SCORESLIST (state, payload) {
      state.memberScores = payload
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
            createdAt: new Date(room.createdAt.seconds * 1000),
            status: room.status,
            startGame: room.startGame
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
    },
    getMembers ({ commit }, payload) {
      db.collection('room').doc(payload)
        .onSnapshot(doc => {
          // console.log(doc.data().members, '=========')
          let payload = doc.data().members
          let master = doc.data().master
          let start = doc.data().startGame
          let scorelist = doc.data().memberScores
          commit('DATA_MEMBERS', payload)
          commit('MASTER_ROOM', master)
          commit('START_GAME', start)
          commit('SET_SCORESLIST', scorelist)
        })
    },
    startGame ({ commit }, payload) {
      db.collection('room').doc(payload)
        .update({
          startGame: true
        })
    },
    setScore ({ commit }, payload) {
      console.log('masuk set score', payload)
      let player = {
        name: localStorage.getItem('name'),
        id: localStorage.getItem('id'),
        score: payload.score
      }
      console.log(player)
      db.collection('room')
        .doc(payload.roomId)
        .update({
          memberScores: firebase.firestore.FieldValue.arrayUnion(player)
        })
        .then(() => {
          return db.collection('room').doc(payload.roomId).get()
        })
        .then(doc => {
          console.log('update memberScores')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
