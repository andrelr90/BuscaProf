const User = require('../model/User')
const Database = require ('../../db_project/dbConfig');
const db = new Database();

class UserSchema {
    constructor() {

    }
    async createUser(user) {
        const conn = await db.connect();
        const sql = "INSERT INTO Users (email, name, password, professor) VALUES (?,?,?,?)";
        const values = [user.email, user.name, user.password, user.professor];
        const {success, err}  = conn.query(sql, values);
        //const query = `INSERT INTO Users (email, name, password, professor) VALUES (${user.email}, ${user.name}, ${user.password}, ${user.professor});´;
        //const {success, err} = db.runQuery(query);
        //const success = true;
        //const err = null; 
        console.log(`CreateUser ${user}`)
        db.disconnect(conn);
        return {success: success, err: err};
    }

    async updateUser(user) {
        const conn = await db.connect();
        const sql = "UPDATE Users SET email = ?, name = ?, password = ?, professor = ? WHERE id = ?";
        const values = [user.email, user.name, user. password, user.professor, user.id];

        const {success, err} = conn.query(sql, values);
        //const query = `UPDATE Users
        //SET email = '${user.email}', name = '${user.name}', password = '${user.password}', professor = '${user.professor}',
        //WHERE id = ${user.id};`
        
        //const {success, err} = db.runQuery(query);
        //const success = true;
        //const err = null;
        db.disconnect(conn);
        return {success: success, err: err};
    }

    async deleteUser(user) {
        const conn = await connect();
        const sql = "DELETE FROM Users WHERE id = ?";
        const {success, err} = conn.query(sql, [user.id]);
        //const query = `DELETE FROM Users WHERE id = ${user.id};`

        //const {success, err} = db.runQuery(query);
        //const success = true;
        //const err = null; 
        db.disconnect(conn);
        return {success: success, err: err};
    }


    async getUserByEmail(userToBeSearched) {
        const conn = await db.connect();
        const sql = "SELECT * FROM Users WHERE email = ?";
        const {[[user]], userFound, err} = conn.query(sql, [userToBeSearched.email]);
        //const query = `SELECT * FROM Users WHERE email = '${user.email}';`

        //const {user, userFound, err} = db.runSelectQuery(query);
        //const user = new User({email: userToBeSearched.email, id: 10});
        //const userFound = true;
        //const err = null;
        db.disconnect(conn); 
        return {user: user, userFound: userFound, err: err};
    }

    async getUserById(userToBeSearched) {
        const conn = await db.connect();
        const sql = "SELECT * FROM Users WHERE id = ?";
        const {[[user]], userFound, err} = conn.query(sql, [userToBeSearched.id]);
        //const query = `SELECT * FROM Users WHERE id = ${user.id};`

        //const {user, userFound, err} = db.runSelectQuery(query);
        //const user = new User({id: userToBeSearched.id, email: "teste"});
        //const userFound = true;
        //const err = null;
        db.disconnect(conn);
        return {user: user, userFound: userFound, err: err};
    }

    async getUserByName(userToBeSearched) {
        const conn = await db.connect();
        const sql = "SELECT * FROM Users WHERE name = ?";
        const {[[user]], userFound, err} = conn.query(sql, [userToBeSearched.name]);

        //const query = `SELECT * FROM Users WHERE name = ${user.name};`

        //const {user, userFound, err} = db.runSelectQuery(query);
        //const user = new User({name: userToBeSearched.name, email: "teste"});
        //const userFound = true;
        //const err = null;
        db.disconnect(conn);
        return {user: user, userFound: userFound, err: err};
    }

}

const userSchema = new UserSchema();

module.exports = userSchema;