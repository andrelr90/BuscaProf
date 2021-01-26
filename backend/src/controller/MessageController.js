const Message = require("../model/Message");
//const messageSchema = require("../schema/MessageSchema");

class MessageController {
    constructor(messageSchema) {
        this.messageSchema = messageSchema;
    }
    
    async sendMessage(req, res) {
        const {idSender, idReceiver, text} = req.body;
        //const time = getTime;
        const time = 0;
        const newMessage = new Message({idSender: idSender, idReceiver: idReceiver, time: time, status: false, text: text});
        const {success, err} = await this.messageSchema.sendMessage(newMessage);

        return res.json({success: success, err: err});
    }

    async getMessages(req, res) {
        const {idSender, idReceiver} = req.body;
        const {messages, err} = await this.userSchema.getUserByEmail(userToBeSearched)
        
        return {user, userFound, err};
    }
}

const userController = new UserController(null, userSchema, profDataSchema);

module.exports = userController;