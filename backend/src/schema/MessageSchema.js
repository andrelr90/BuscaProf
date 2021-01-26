const Message = require('../model/Message')

class MessageSchema {
    constructor() {

    }
    async sendMessage(message) {
        //const query = `INSERT INTO Messages (idSender, idReceiver, time, status, text) VALUES (${prof.id}, \"\", 0);´;
        //const {success, err} = db.runQuery(query);
        const success = true;
        const err = null; 
        return {success: success, err: err};
    }

    async getMessages(message) {
        //const query = `SELECT * FROM Messages WHERE idSender = ${message.idSender} AND idReceiver = ${message.idReceiver};`

        //const {user, userFound, err} = db.runSelectQuery(query);
        const messages = [new Message({idSender: 10, idReceiver: 20, text: "Teste"})];
        const err = null; 
        return {messages, err};
    }

}

const messageSchema = new MessageSchema();

module.exports = messageSchema;