<template>
  <div class="container">
		<div class="messaging">
			<div class="inbox_msg">
			<div class="mesgs">
				<div v-if="is_loading">
					loading...
				</div>
				<div v-else-if="messages.length == ''">
					Create your first message.
				</div>
				<div v-else class="msg_history">
				<div v-for="(message, index) in messages" :key="index">
					<div class="incoming_msg_img">
						<img
							src="https://ptetutorials.com/images/user-profile.png"
							alt="sunil"
						/>
					</div>
					<div class="received_msg">
						<div class="received_withd_msg">
							<p>{{ message.message }}</p>
							<span class="time_date">{{ message.author }}</span>
						</div>
					</div>
				</div>
				</div>
				<div class="type_msg">
				<div class="input_msg_write">
					<input @keyup.enter="saveMessage" v-model="message" type="text" class="write_msg" placeholder="Type a message" />
					<button class="msg_send_btn" @click="saveMessage" type="button">
					<i class="fa fa-paper-plane-o" aria-hidden="true"></i>
					</button>
				</div>
				</div>
			</div>
			</div>
		</div>
  </div>
</template>

<script>
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
			let container  = document.querySelector('.msg_history');
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

<style scoped>
@import "./Chat.scss";
</style>
