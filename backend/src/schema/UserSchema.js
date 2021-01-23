const User = require('../model/User')

class UserSchema {
    constructor() {

    }
    async createUser(user) {
        //const query = `INSERT INTO Users (email, name, password, professor) VALUES (${user.email}, ${user.name}, ${user.password}, ${user.professor});´;
        //const {success, err} = db.runQuery(query);
        const success = true;
        const err = null; 
        console.log(`CreateUser ${user}`)
        return {success: success, err: err};
    }

    async updateUser(user) {
        //const query = `UPDATE Users
        //SET email = '${user.email}', name = '${user.name}', password = '${user.password}', professor = '${user.professor}',
        //WHERE id = ${user.id};`
        
        //const {success, err} = db.runQuery(query);
        const success = true;
        const err = null;
        return {success: success, err: err};
    }

    async deleteUser(user) {
        //const query = `DELETE FROM Users WHERE id = ${user.id};`

        //const {success, err} = db.runQuery(query);
        const success = true;
        const err = null; 
        return {success: success, err: err};
    }


    async getUserByEmail(userToBeSearched) {
        //const query = `SELECT * FROM Users WHERE email = '${user.email}';`

        //const {user, userFound, err} = db.runSelectQuery(query);
        const user = new User({email: userToBeSearched.email, id: 10});
        const userFound = true;
        const err = null; 
        return {user: user, userFound: userFound, err: err};
    }

    async getUserById(userToBeSearched) {
        //const query = `SELECT * FROM Users WHERE id = ${user.id};`

        //const {user, userFound, err} = db.runSelectQuery(query);
        const user = new User({id: userToBeSearched.id, email: "teste"});
        const userFound = true;
        const err = null;
        return {user: user, userFound: userFound, err: err};
    }

}

const userSchema = new UserSchema();

module.exports = userSchema;