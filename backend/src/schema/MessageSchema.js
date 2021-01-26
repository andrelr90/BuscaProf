const Message = require('../model/Message');
const Database = require ('../../db_project/dbConfig');
const db = new Database();

class MessageSchema {
    constructor() {

    }
    async sendMessage(message) {
        const conn = await db.connect();
        const sql = "INSERT INTO Messages (idSender, idReceiver, time, text) VALUES (?,?,?,?)";
        const values = [message.idSender, message.idReceiver, message.time, message.text];
        const {success, err} = conn.query(sql, values);

        //const query = `INSERT INTO Messages (idSender, idReceiver, time, status, text) VALUES (${prof.id}, \"\", 0);´;
        //const {success, err} = db.runQuery(query);
        // const success = true;
        // const err = null;

        db.disconnect(conn); 
        return {success: success, err: err};
    }

    async getMessages(message) {
        const conn = await db.connect();
        const sql = "SELECT * FROM Messages WHERE idSender = ? OR idReceiver = ? OR idSender = ? OR idReceiver = ?";
        const values = [message.idSender, message.idSender, message.idReceiver, message.idReceiver];
        const {[user], userFound, err} = await conn.query(sql, values);

        //const query = `SELECT * FROM Messages WHERE idSender = ${message.idSender} AND idReceiver = ${message.idReceiver};`
        //const {user, userFound, err} = db.runSelectQuery(query);
        // const messages = [new Message({idSender: 10, idReceiver: 20, text: "Teste"})];
        // const err = null;

        db.disconnect(conn); 
        return {messages, err};
    }

}

const messageSchema = new MessageSchema();

module.exports = messageSchema;