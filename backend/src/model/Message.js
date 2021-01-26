class Message {
    constructor({idSender, idReceiver, time, status, text}) {
        this.idSender = idSender;
        this.idReceiver = idReceiver;
        this.time = time;
        this.status = status;
        this.text = text;
    }
}

module.exports = Message;