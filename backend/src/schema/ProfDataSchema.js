const ProfData = require('../model/ProfData');
const Database = require ('../../db_project/dbConfig');
const db = new Database();

class ProfDataSchema {
    constructor() {

    }
    async createProfData(prof) {
        const conn = await db.connect();
        const sql = "INSERT INTO ProfData (id, description, price) VALUES (?,?,?)";
        const values = [prof.id, prof.description, prof.price];
        const {success, err} = conn.query(sql, values);

        //const query = `INSERT INTO ProfData (id, description, price) VALUES (${prof.id}, \"\", 0);´;
        //const {success, err} = db.runQuery(query);
        // const success = true;
        // const err = null; 
        
        console.log(`CreateProfData ${prof}`);
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
        const {[[user]], userFound, err} = await conn.query(sql, [prof.id]);

        //const query = `SELECT * FROM ProfData WHERE id = ${prof.id};
        //const {user, userFound, err} = db.runSelectQuery(query);
        // const user = new ProfData({id: 10});
        // const userFound = true;
        // const err = null;

        db.disconnect(conn); 
        return {user: user, userFound: userFound, err: err};
    }

}

const profDataSchema = new ProfDataSchema();

module.exports = profDataSchema;