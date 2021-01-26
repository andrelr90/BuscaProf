const ProfData = require('../model/ProfData');
const Database = require ('../../db_project/dbConfig');
const db = new Database();

class ProfDataSchema {
    constructor() {

    }
    async createProfData(prof) {
        const conn = await db.connect();
        const sql = "INSERT INTO ProfData (id, description, price) VALUES (?,?,?)";
        const values = [prof.id, prof.description, prof.price]
        let success = null;
        let err = null;
        try {
            success = await conn.query(sql, values);
        }
        catch(error) {
            err = error;
        }
        console.log(`CreateProfData ${prof}`)
        db.disconnect(conn);
        return {success: success, err: err};
    }

    async updateProfData(prof) {
        const conn = await db.connect();
        const sql = "UPDATE ProfData SET description = ?, price = ? WHERE id = ?";
        const values = [prof.description, prof.price, prof.id];
        const {success, err} = conn.query(sql, values);

        //const query = `UPDATE ProfData
        //SET description = \"${prof.description}\", price = ${prof.price},
        //WHERE id = ${prof.id};`
        //const {success, err} = db.runQuery(query);
        //const success = true;
        //const err = null;

        db.disconnect(conn);
        return {success: success, err: err};
    }

    async deleteProfData(prof) {
        const conn = await db.connect();
        const sql = "DELETE FROM ProfData WHERE id = ?";
        const {success, err} = conn.query(sql, [prof.id]);

        //const query = `DELETE FROM ProfData WHERE id = ${prof.id};`
        //const {success, err} = db.runQuery(query);
        // const success = true;
        // const err = null;

        db.disconnect(conn); 
        return {success: success, err: err};
    }

    async getProfDataById(prof) {
        const conn = await db.connect();
        const sql = "SELECT * FROM ProfData WHERE id = ?";
        let err = null;
        let userFound = false;
        let users = null;
        try {
            const [rows, _] = await conn.execute(sql, [prof.id]);
            if (rows.length > 0) {
                users = rows[0];
                userFound = true;
            }
        }
        catch(error) {
            err = error;
        }

        db.disconnect(conn);
        return {user: user, userFound: userFound, err: err};
    }

}

const profDataSchema = new ProfDataSchema();

module.exports = profDataSchema;