const Message = require("../src/model/Message");

test('Send Message', async () => {
    const messageSchema = require("../src/schema/MessageSchema");
    const message = new Message({idSender: 1, idReceiver: 2, time: 0, status: false, text: "teste de software"});
    const resultSend = await messageSchema.sendMessage(message);
    expect(resultSend.success[0].affectedRows).toStrictEqual(1);
});

test('Get contacts - contact add from person 1.', async () => {
    const messageSchema = require("../src/schema/MessageSchema");
    const message = new Message({idSender: 1, idReceiver: 2, time: 0, status: false, text: "teste de software"});
    const resultSend = await messageSchema.sendMessage(message);

    const id = new Message({idSender: 1});
    const contacts1 = await messageSchema.getContacts(id);

    expect(contacts1['idContacts']).toEqual(
        expect.arrayContaining([
            expect.objectContaining({id: 2})
        ])
    );
});

test('Get contacts - contact add from person 2.', async () => {
    const messageSchema = require("../src/schema/MessageSchema");
    const message = new Message({idSender: 1, idReceiver: 2, time: 0, status: false, text: "teste de software"});
    const resultSend = await messageSchema.sendMessage(message);

    const id = new Message({idSender: 2});
    const contacts2 = await messageSchema.getContacts(id);

    expect(contacts2['idContacts']).toEqual(
        expect.arrayContaining([
            expect.objectContaining({id: 1})
        ])
    );
});

test('Get messages.', async () => {
    const messageSchema = require("../src/schema/MessageSchema");
    const message = new Message({idSender: 1, idReceiver: 2, time: 0, status: false, text: "teste de software"});
    const resultSend = await messageSchema.sendMessage(message);

    const id = new Message({idReceiver: 1, idSender: 2});
    const messages = await messageSchema.getMessages(id);
;
    expect(messages.messages).toEqual(
        expect.arrayContaining([
            expect.objectContaining({body: 'teste de software'})
        ])
    );
});