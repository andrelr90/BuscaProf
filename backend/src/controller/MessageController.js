const Message = require("../model/Message");
const messageSchema = require("../schema/MessageSchema");

class MessageController {
    constructor(messageSchema) {
        this.messageSchema = messageSchema;
    }
    
    async sendMessage(req, res) {
        const {idReceiver, text} = req.body;
        const idSender = req.user.id;
        const time = 0;
        const newMessage = new Message({idSender: idSender, idReceiver: idReceiver, time: time, status: false, text: text});
        const {success, err} = await this.messageSchema.sendMessage(newMessage);

        return res.json({success: success, err: err});
    }

    async getMessages(req, res) {
        const {idReceiver} = req.body;
        const idSender = req.user.id;
        const message = new Message({idReceiver: idReceiver, idSender: idSender});
        const {messages, messageFound, err} = await this.messageSchema.getMessages(message);
        
        return res.json({messages: messages, messageFound: messageFound, err: err});
    }

    async getContacts(req, res) {
        const idSender = req.user.id;
        const id = new Message({idSender: idSender});
        const {idContacts, contactFound, err} = await this.messageSchema.getContacts(id);
        
        console.log(req.user)
        return res.json({idContacts: idContacts, contactFound: contactFound, err: err});

    }

    async getNotifications(req, res) {
        const {idReceiver} = req.body;
        const id = new Message({idReceiver: idReceiver});
        const {idContacts, notificationFound, err} = await this.messageSchema.getNotifications(id);
        return res.json({idContacts: idContacts, notificationFound: notificationFound, err: err});
    }

}

const messageController = new MessageController(messageSchema);

module.exports = messageController;