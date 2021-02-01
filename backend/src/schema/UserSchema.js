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
        let success = null;
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
        let success = null;
        let err = null;
        try {
            success = await conn.query(sql, values);
        }
        catch(error) {
            err = error;
        }

        console.log(success);
        console.log(`UpdateUser ${user}`);
        db.disconnect(conn);
        return {success: success, err: err};
    }

    async deleteUser(user) {
        const conn = await db.connect();
        const sql = "DELETE FROM Users WHERE id = ?";
        let success = null;
        let err = null;
        try {
            success = await conn.query(sql, [user.id]);
        }
        catch(error) {
            err = error;
        }
        console.log(success);
        console.log(`DeleteUser ${user}`);
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

    async getProfByName(userToBeSearched) {
        const conn = await db.connect();
        const sql = "select Users.id, Users.name, ProfData.price from Users inner join ProfData on Users.id = ProfData.id where Users.professor = 1 and Users.name = ?";
        let err = null;
        let userFound = false;
        let users = null;
        let subjects = null;
        try {
            const [rows, _] = await conn.execute(sql, [userToBeSearched.name]);
            if (rows.length > 0) {
                const sql2 = "SELECT Subjects.subjectName FROM SubProf inner join Subjects on SubProf.subject = Subjects.code where SubProf.professor = ?";
                users = rows;
                for (const [i, el] of users.entries()) {
                    console.log("aqui")
                    const [rows2, _] = await conn.execute(sql2, [el.id]);
                    console.log(rows2)
                    users[i].subjects = rows2
                }
                userFound = true;
            }
        }
        catch(error) {
            err = error;
        }

        db.disconnect(conn);
        return {users: users, userFound: userFound, err: err};
    }
    async getProfs() {
        const conn = await db.connect();
        const sql = "select Users.id, Users.name, ProfData.price from Users inner join ProfData on Users.id = ProfData.id where Users.professor = 1;";
        let err = null;
        let userFound = false;
        let users = null;
        let subjects = null;
        try {
            const [rows, _] = await conn.execute(sql);
            if (rows.length > 0) {
                const sql2 = "SELECT Subjects.subjectName FROM SubProf inner join Subjects on SubProf.subject = Subjects.code where SubProf.professor = ?";
                users = rows;
                for (const [i, el] of users.entries()) {
                    console.log("aqui")
                    const [rows2, _] = await conn.execute(sql2, [el.id]);
                    console.log(rows2)
                    users[i].subjects = rows2
                }
                userFound = true;
                console.log(users)
            }
        }
        catch(error) {
            err = error;
        }

        db.disconnect(conn);
        return {users: users, userFound: userFound, err: err};
    }
    async get_filter(subject){
        const conn = await db.connect();
        const sql = "SELECT Users.name, ProfData.price, Users.id FROM ((Users inner join SubProf on SubProf.professor = Users.id) inner join Subjects on SubProf.subject = Subjects.code) inner join ProfData on Users.id = ProfData.id where Subjects.subjectName = ?;";
        let err = null;
        let userFound = false;
        let users = null;
        let subjects = null;
        try {
            const [rows, _] = await conn.execute(sql, subject);
            if (rows.length > 0) {
                const sql2 = "SELECT Subjects.subjectName FROM SubProf inner join Subjects on SubProf.subject = Subjects.code where SubProf.professor = ?";
                users = rows;
                for (const [i, el] of users.entries()) {
                    console.log("aqui")
                    const [rows2, _] = await conn.execute(sql2, [el.id]);
                    console.log(rows2)
                    users[i].subjects = rows2
                }
                userFound = true;
                console.log(users)
            }
        }
        catch(error) {
            err = error;
        }

        db.disconnect(conn);
        return {users: users, userFound: userFound, err: err};
    }
    async getProfById(userToBeSearched){
        const conn = await db.connect();
        const sql = "select Users.id, Users.name, ProfData.price, ProfData.description from Users inner join ProfData on Users.id = ProfData.id where Users.professor = 1 and Users.id = ?";
        let err = null;
        let userFound = false;
        let user = null;
        let subjects = null;
        try {
            const [rows, _] = await conn.execute(sql, [userToBeSearched.id]);
            if (rows.length > 0) {
                const sql2 = "SELECT Subjects.subjectName FROM SubProf inner join Subjects on SubProf.subject = Subjects.code where SubProf.professor = ?";
                user = rows;
                const [rows2, _] = await conn.execute(sql2, [user[0].id]);
                user[0].subjects = rows2
            }
                userFound = true;
        }
        catch(error) {
            err = error;
        }

        db.disconnect(conn);
        return {user: user[0], userFound: userFound, err: err};
    }

}

const userSchema = new UserSchema();

module.exports = userSchema;