import * as firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE,
  projectId: process.env.VUE_APP_PROJECT_ID
}

firebase.initializeApp(firebaseConfig)

export default firebase
