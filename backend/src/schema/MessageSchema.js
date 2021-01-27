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
        const sql = "SELECT * FROM Messages M JOIN Users U ON M.idSender = U.id WHERE (M.idSender = ? AND M.idReceiver = ?) OR (M.idSender = ? AND M.idReceiver = ?)";
        const sqlSetNotifications = "UPDATE Messages SET status = 1 WHERE idSender = ? OR idReceiver = ? OR idSender = ? OR idReceiver = ?";
        const values = [message.idSender, message.idReceiver, message.idReceiver, message.idSender];
        
        let err = null;
        let messageFound = false;
        let messages = null;
        try {
            const [rows, _] = await conn.execute(sql, values);
            await conn.execute(sqlSetNotifications, values);
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
        const sql = "SELECT M.idSender, M.idReceiver, S.name as nameSender, R.name as nameReceiver FROM Messages M JOIN Users S ON M.idSender = S.id OR M.idReceiver = S.id JOIN Users R ON M.idSender = R.id OR M.idReceiver = R.id WHERE (M.idSender = ? AND M.idReceiver = ?) OR (M.idSender = ? AND M.idReceiver = ?)";
        const values = [message.idSender, message.idReceiver, message.idReceiver, message.idSender];
        
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
                    let nameSender = nameSender;
                    let nameReceiver = nameReceiver;
                    if (idSender != message.idSender) {
                        set.add({id idSender, name: nameSender});
                    }
                    if (idReceiver != message.idSender) {
                        set.add(id: idReceiver, name: nameReceiver);

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