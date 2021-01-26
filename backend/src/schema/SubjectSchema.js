const User = require('../model/Subjects')
const Database = require ('../../db_project/dbConfig');
const db = new Database();

class SubjectSchema{
	constructor() {

    }

    async getSubjectByCode(subjectToBeSearched){
    	const conn = await db.connect();
        const sql = "SELECT * FROM Subjects WHERE code = ?";
        let err = null;
        let subjectFound = false;
        let subject = null;
        try {
            const [rows, _] = await conn.execute(sql, [subjectToBeSearched.code]);
            
            if (rows.length > 0) {
                subject = rows[0];
                subjectFound = true;
            }
            
        }
        catch(error) {
            err = error;
        }

        console.log("A");
        console.log(subject);
        console.log(subjectFound);
        console.log(err);

        db.disconnect(conn); 
        return {subject: subject, subjectFound: subjectFound, err: err};
    }

    async getSubjectByName(subjectToBeSearched){
    	const conn = await db.connect();
        const sql = "SELECT * FROM Subjects WHERE name = ?";
        let err = null;
        let subjectFound = false;
        let subject = null;
        try {
            const [rows, _] = await conn.execute(sql, [subjectToBeSearched.name]);
            
            if (rows.length > 0) {
                subject = rows[0];
                subjectFound = true;
            }
            
        }
        catch(error) {
            err = error;
        }

        console.log("A");
        console.log(subject);
        console.log(subjectFound);
        console.log(err);

        db.disconnect(conn); 
        return {subject: subject, subjectFound: subjectFound, err: err};
    }

}

const subjectSchema = new SubjectSchema();

module.exports = subjectSchema;