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
        let success = 0;
        let err = null;
        try {
            success = await conn.query(sql, values);
        }
        catch(error) {
            err = error;
        }
        
        console.log(success);
        console.log(`CreateUser ${user}`)
        db.disconnect(conn);
        return {success: success, err: err};
    }

    async updateUser(user) {
        const conn = await db.connect();
        const sql = "UPDATE Users SET email = ?, name = ?, password = ?, professor = ? WHERE id = ?";
        const values = [user.email, user.name, user. password, user.professor, user.id];

        const {success, err} = await conn.query(sql, values);
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
        const conn = await db.connect();
        const sql = "DELETE FROM Users WHERE id = ?";
        const {success, err} = await conn.query(sql, [user.id]);
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
        let err = null;
        let userFound = false;
        let user = null;
        try {
            const [rows, _] = await conn.execute(sql, [userToBeSearched.email]);
            
            if (rows.length > 0) {
                user = rows[0];
                userFound = true;
            }
            
        } 
        catch(error) {
            err = error;
        }
        //const query = `SELECT * FROM Users WHERE email = '${user.email}';`
        console.log("A")
        console.log(user)
        console.log(userFound)
        console.log(err)
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
        let err = null;
        let userFound = false;
        let user = null;
        try {
            const [rows, _] = await conn.execute(sql, [userToBeSearched.id]);
            if (rows.length > 0) {
                user = rows[0];
                userFound = true;
            }
        }
        catch(error) {
            err = error;
        }

        db.disconnect(conn);
        return {user: user, userFound: userFound, err: err};
    }

    async getUserByName(userToBeSearched) {
        const conn = await db.connect();
        const sql = "SELECT * FROM Users WHERE name = ?";
        let err = null;
        let userFound = false;
        let users = null;
        try {
            const [rows, _] = await conn.execute(sql, [userToBeSearched.name]);
            if (rows.length > 0) {
                users = rows;
                userFound = true;
            }
        }
        catch(error) {

        }

        db.disconnect(conn);
        return {users: users, userFound: userFound, err: err};
    }

}

const userSchema = new UserSchema();

module.exports = userSchema;