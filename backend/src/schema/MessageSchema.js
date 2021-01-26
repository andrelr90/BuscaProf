const Message = require('../model/Message');
const Database = require ('../../db_project/dbConfig');
const db = new Database();

class MessageSchema {
    constructor() {

    }
    async sendMessage(message) {
        const conn = await db.connect();
        const sql = "INSERT INTO Messages (idSender, idReceiver, time, text) VALUES (?,?,NOW(),?)";
        const values = [message.idSender, message.idReceiver, message.text];
        
        let success = null;
        let err = null;
        try {
            success = await conn.query(sql, values);
        }
        catch(error) {
            err = error;
        }

        db.disconnect(conn); 
        return {success: success, err: err};
    }

    async getMessages(message) {
        const conn = await db.connect();
        const sql = "SELECT * FROM Messages WHERE idSender = ? OR idReceiver = ? OR idSender = ? OR idReceiver = ?";
        const values = [message.idSender, message.idSender, message.idReceiver, message.idReceiver];
        
        let err = null;
        let messageFound = false;
        let messages = null;
        try {
            const [rows, _] = await conn.execute(sql, values);
            if (rows.length > 0) {
                messages = rows;
                messageFound = true;
            }
        }
        catch(error) {
            err = error;
        }

        db.disconnect(conn); 
        return {messages, messageFound, err};
    }
    async getNotifications(message) {
        const conn = await db.connect();
        const sql = "SELECT idSender FROM Messages WHERE idReceiver = ? AND status = 0";
        const values = [message.idReceiver];
        
        let err = null;
        let notificationFound = false;
        let set = new Set();

        try {
            const [rows, _] = await conn.execute(sql, values);
            console.log(rows)
            console.log(rows.length)
            if (rows.length > 0) {
                for (let row of rows) {
                    set.add(row.idSender);
                }
                notificationFound = true;
            }
        }
        catch(error) {
            err = error;
        }
        let uniq = [...set];
        console.log(notificationFound)
        db.disconnect(conn); 
        return {idContacts: uniq, notificationFound: notificationFound, err: err};
    }

    async getContacts(message) {
        const conn = await db.connect();
        const sql = "SELECT idSender, idReceiver FROM Messages WHERE idSender = ? OR idReceiver = ? OR idSender = ? OR idReceiver = ?";
        const values = [message.idSender, message.idSender, message.idSender, message.idSender];
        
        let err = null;
        let contactFound = false;
        let set = new Set();

        try {
            const [rows, _] = await conn.execute(sql, values);
            console.log(rows)
            console.log(rows.length)
            if (rows.length > 0) {
                for (let row of rows) {
                    let idSender = row.idSender;
                    let idReceiver = row.idReceiver;
                    if (idSender != message.idSender) {
                        set.add(idSender);
                    }
                    if (idReceiver != message.idSender) {
                        set.add(idReceiver);

                    }
                }
                idContacts = rows;
                contactFound = true;
            }
        }
        catch(error) {
            err = error;
        }

        let uniq = [...set];
        
        db.disconnect(conn); 
        return {idContacts: uniq, contactFound: contactFound, err: err};
    }

}

const messageSchema = new MessageSchema();

module.exports = messageSchema;