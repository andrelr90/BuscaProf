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
        const sql = "SELECT M.idSender AS id, M.text AS body, U.name AS author, DATE_FORMAT(M.time, '%d/%m/%Y %h:%i:%s') as time FROM Messages M JOIN Users U ON M.idSender = U.id WHERE (M.idSender = ? AND M.idReceiver = ?) OR (M.idSender = ? AND M.idReceiver = ?) ORDER BY M.time ASC";
        const sqlSetNotifications = "UPDATE Messages SET status = 1 WHERE idReceiver = ?";
        const values = [message.idSender, message.idReceiver, message.idReceiver, message.idSender];
        
        let err = null;
        let messageFound = false;
        let messages = null;
        try {
            const [rows, _] = await conn.execute(sql, values);
            await conn.execute(sqlSetNotifications, [message.idSender]);
            if (rows.length > 0) {
                messages = rows;
                messageFound = true;
            }
            for(const index in messages){
            	if(messages[index].id == message.idSender){
            		messages[index].author = "You";
            	}
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
        const sql = "SELECT M.idSender, M.idReceiver, M.status, S.name as Sender, R.name as Receiver FROM ((Messages M JOIN Users S ON M.idSender = S.id) JOIN Users R ON M.idReceiver = R.id) WHERE (M.idSender = ? OR M.idReceiver = ?);";
        const values = [message.idSender, message.idSender];
        
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
                    let nameSender = row.Sender;
                    let nameReceiver = row.Receiver;
                    
                    if (idSender != message.idSender) {
                        set.add(JSON.stringify({id: idSender, name: nameSender, notifications: false}));
                    }
                    if (idReceiver != message.idSender) {
                        set.add(JSON.stringify({id: idReceiver, name: nameReceiver, notifications: false}));
                    }
                }
                idContacts = rows;
                contactFound = true;
            }
        }
        catch(error) {
            err = error;
        }
        const notifications = await this.getNotifications(new Message({idReceiver: message.idSender}));
        let notificationsId = {}
        for (let pending of notifications.idContacts) {
            notificationsId[pending] = true;
        }

        let uniqJson = [...set];
        let uniqNoNotifications = []
        let uniqNotifications = []
        for (let json of uniqJson) {
            uniqNoNotifications.push(JSON.parse(json));
        }
        console.log(uniqNoNotifications)
        for (let user of uniqNoNotifications) {
            let userNotifiedOrNot = user;
            let id = 0;
            try {
                id = userNotifiedOrNot.id;
            }
            catch(err) {
                console.log(err)
            }
            if (id in notificationsId) {
                userNotifiedOrNot.notifications = true;
            }
            else {
                userNotifiedOrNot.notifications = false;
            }
            
            uniqNotifications.push(userNotifiedOrNot);
        }
        
        db.disconnect(conn); 
        return {idContacts: uniqNotifications, contactFound: contactFound, err: err};
    }

}

const messageSchema = new MessageSchema();

module.exports = messageSchema;