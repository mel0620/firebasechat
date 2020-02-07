<template>
    <div class="chat-container">
        <div v-if="is_loading" style="padding: 2rem; text-align: center">
            loading...
        </div>
        <div v-else-if="messages.length == ''">
            Create your first message.
        </div>
        <div v-else class="message">
            <div v-for="(message, index) in messages" :key="index" class="message__item" :class="[message.author === authUser.displayName ? 'message__item--sender' : 'message__item--receiver']">
                <div class="message__item-content">
                    {{ message.message }}
                </div>
                <div class="message__item-author">
                    {{ message.author }}
                </div>
            </div>
        </div>
        <div class="input-wrapper">
            <input @keyup.enter="saveMessage" v-model="message" type="text" placeholder="Write a message...">
            <button @click="saveMessage">Send</button>
        </div>
    </div>
</template>

<script>
import "./ChatV2.scss"
import firebase from "firebase"
export default {
	name: 'chat',
	data: () => ({
		is_loading: true,
		message: null,
		messages: [],
		authUser:{}
	}),
	methods: {
		scrollToBottom() {
			let container  = document.querySelector('.message');
			container.scrollTop = container.scrollHeight;
		},
		saveMessage() {
			db.collection('chat').add({
				message: this.message,
				author: this.authUser.displayName,
				createdAt: new Date()
			}).then(() => {
				this.scrollToBottom();
			})
			this.message = null
		},
		async fetchMessages() {

			// db.collection('chat').orderBy('createdAt').get().then((querySnapshot)=>{
			db.collection('chat').orderBy('createdAt').onSnapshot((querySnapshot)=>{
				let all_messages = [];

				querySnapshot.forEach(doc=>{
					all_messages.push(doc.data())
				})

				this.messages = all_messages;

				setTimeout(() => {
					this.scrollToBottom();
				}, 1000)

				this.is_loading = false
			})

		}
	},
	created() {
		firebase.auth().onAuthStateChanged(user=>{
			if(user) {
				this.authUser=user
			} else {
				this.authUser = {}
			}
		})
		this.fetchMessages();
	},
	beforeRouterEnter(to,from,next){
		next(vm=>{
			firebase.auth().onAuthStateChanged(user=> {
				if(user) {
					next()
				} else {
					vm.$router.push('/login')
				}
			})
		})
	}
};
</script>