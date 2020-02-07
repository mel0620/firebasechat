import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

// Required for side-effects
require("firebase/firestore");
var firebaseConfig = {
  apiKey: "AIzaSyCki3hrGsBB2BzXXuQb_t_MdtzMdwmgS8U",
  authDomain: "chat-sample-a65e0.firebaseapp.com",
  databaseURL: "https://chat-sample-a65e0.firebaseio.com",
  projectId: "chat-sample-a65e0",
  storageBucket: "chat-sample-a65e0.appspot.com",
  messagingSenderId: "570743673721",
  appId: "1:570743673721:web:cc8a31d5ea3774915f15a8",
  measurementId: "G-EJPCZKB6J7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

var db = firebase.firestore();

window.db = db;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
