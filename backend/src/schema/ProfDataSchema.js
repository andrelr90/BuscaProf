const ProfData = require('../model/ProfData')

class ProfDataSchema {
    constructor() {

    }
    async createProfData(prof) {
        //const query = `INSERT INTO ProfData (id, description, price) VALUES (${prof.id}, \"\", 0);´;
        //const {success, err} = db.runQuery(query);
        const success = true;
        const err = null; 
        console.log(`CreateProfData ${prof}`)
        return {success: success, err: err};
    }

    async updateProfData(prof) {
        //const query = `UPDATE ProfData
        //SET description = \"${prof.description}\", price = ${prof.price},
        //WHERE id = ${prof.id};`
        
        //const {success, err} = db.runQuery(query);
        const success = true;
        const err = null;
        return {success: success, err: err};
    }

    async deleteProfData(prof) {
        //const query = `DELETE FROM ProfData WHERE id = ${prof.id};`

        //const {success, err} = db.runQuery(query);
        const success = true;
        const err = null; 
        return {success: success, err: err};
    }

    async getProfDataById(prof) {
        //const query = `SELECT * FROM ProfData WHERE id = ${prof.id};`

        //const {user, userFound, err} = db.runSelectQuery(query);
        const user = new ProfData({id: 10});
        const userFound = true;
        const err = null; 
        return {user: user, userFound: userFound, err: err};
    }

}

const profDataSchema = new ProfDataSchema();

module.exports = profDataSchema;