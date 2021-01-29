const chat = Vue.createApp({})
chat.component('chat', {
    data() {
        return {
            contacts: [{name: "", id: 0}],
            contactId: -1,
            bobMessage: '',
            youMessage: '',
            messages: [{body: 'Starter message', author: 'You', time: 'd/m/aa h:m:s'}],
            intervalLoadMessage: null,

            isOpen: false
        }
    },
    template: `
        <main id="chat">
            <section id="contactScreen" ref="contactScreen">
                <section id="headContacts">
                    Contatos:
                </section>
                <section class="contacts">
                    <section class="contact" v-for="contact in contacts" @click="showMessageScreen(contact.name, contact.id)">
                        <div class="notification" :style="[ contact.notifications ? {'display': 'block'} : {'display': 'none'} ]"></div>
                        <section class="contactsNames">
                            {{contact.name}}
                        </section>
                    </section>
                    <br/>
                </section>
            </section>
            <section id="chatPage" ref="chatPage">
                <section id="headChat">
                    <div @click="showContactScreen()" id="backButton">&nbsp;&#60;</div>
                    <div ref="contactName" id="contactName"></div>
                </section>
                <section ref="chatArea" class="chat-area">
                    <p v-for="message in messages" class="message" :title=message.time :class="{ 'message-out': message.author === 'You', 'message-in': message.author !== 'You' }">
                        {{ message.body }}
                    </p>
                </section>
            
                <section class="chat-inputs">
                    <form @submit.prevent="sendMessage('out')" id="person1-form" style="display: contents;" autocomplete="off">
                        <input v-model="youMessage" id="person1-input" type="text" class="form-control mr-sm-2">
                        <button class="btn btn-outline-primary" type="submit">Enviar</button>
                    </form>
                </section>
            </section>
        </main>

        <div id="chatButton">
            <div class="notification" id="chatButtonNotification"></div>
            <div class="buttonContainer" @click="toggleChat()">
                <img src="imagens/chat-icon.png" style="width: 60%" id="buttonChatIcon">
            </div>
        </div>
    `,
    methods: {
        async sendMessageDB(id, text){
            const headers = new Headers();
            headers.append(
                "Content-Type",
                "application/json"
            );
            const request = new Request( "/sendMessage",
                {
                    method: "POST",
                    headers,
                    body: JSON.stringify({idReceiver: id, text: text, notifications: false}),
                    mode: "cors",
                    cache: "default"
                }
            );      
            const res = await fetch(request);
            const response = await res.json();
        },
        sendMessage(direction) {
            if (!this.youMessage && !this.bobMessage) {
                return
            }
            if (direction === 'out') {
                this.messages.push({body: this.youMessage, author: 'You'})
                this.sendMessageDB(this.contactId, this.youMessage)
                this.youMessage = ''
                // Also add to the database here.
            } else {
                alert('something went wrong')
            }
            Vue.nextTick(() => {
                let messageDisplay = this.$refs.chatArea
                messageDisplay.scrollTop = messageDisplay.scrollHeight
            })
        },

        async loadContacts(){
            // get contacts from the database here.
            const headers = new Headers();
            headers.append(
                "Content-Type",
                "application/json"
            );
            const request = new Request( "/getContacts",
                {
                    method: "POST",
                    headers,
                    body: JSON.stringify({}),
                    mode: "cors",
                    cache: "default"
                }
            );
            const res = await fetch(request);
            const response = await res.json();
            this.contacts = response['idContacts'];

            this.showNotification = false;
            for(let i=0; i < response['idContacts'].length; i++) {
                if (response['idContacts'][i]["notifications"]){
                    this.showNotification = true;
                    break;
                }
            }
            if (this.showNotification)
                document.getElementById("chatButtonNotification").style.display = 'block'
            else
                document.getElementById("chatButtonNotification").style.display = 'none'
        },
        showContactScreen(){
            this.messages = [];
            clearInterval(this.intervalLoadMessage);
            this.$refs.contactScreen.style.display="block";
            this.$refs.chatPage.style.display="none";
        },

        async getMessages(id, scroll=false){
            const headers = new Headers();
            headers.append(
                "Content-Type",
                "application/json"
            );
            const request = new Request( "/getMessages",
                {
                    method: "POST",
                    headers,
                    body: JSON.stringify({idReceiver: id}),
                    mode: "cors",
                    cache: "default"
                }
            );      
            const res = await fetch(request);
            const response = await res.json();
            this.messages = response['messages'];
            if(scroll)
                Vue.nextTick(() => {
                    let messageDisplay = this.$refs.chatArea
                    messageDisplay.scrollTop = messageDisplay.scrollHeight
                })
        },
        showMessageScreen(name, id){
            this.getMessages(id, true);
            this.intervalLoadMessage = setInterval(() => this.getMessages(id), 1000);
            this.contactId = id;
            this.$refs.contactName.innerHTML = name;
            this.$refs.contactScreen.style.display="none";
            this.$refs.chatPage.style.display="block";
        },

        toggleChat(){
            if(!this.isOpen){
                document.getElementById("chat").style.display = "inline-block";
                document.getElementById("buttonChatIcon").src = "imagens/chat-close.png";
            } else{
                this.showContactScreen();
                document.getElementById("chat").style.display = "none";
                document.getElementById("buttonChatIcon").src = "imagens/chat-icon.png";
            }
            this.isOpen = !this.isOpen;
        }
    },
    created() {
        this.loadContacts();
        this.interval = setInterval(() => this.loadContacts(), 1000);
    },
}).mount("#chatSimulator")