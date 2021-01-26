const SubProf = require('../model/SubProf')
const Database = require ('../../db_project/dbConfig');
const db = new Database();

class SubProfSchema{
	constructor(){

	}

	async createSubProf(subProf) {
        const conn = await db.connect();
        const sql = "INSERT INTO SubProf (professor, subject) VALUES (?,?)";
        const values = [subProf.professor, subProf.subject];
        let success = null;
        let err = null;
        try {
            success = await conn.query(sql, values);
        }
        catch(error) {
            err = error;
        }
        
        console.log(success);
        console.log(`CreateSubProf ${subProf}`)
        db.disconnect(conn);
        return {success: success, err: err};
    }

    async deleteSubProf(subProf) {
        const conn = await db.connect();
        const sql = "DELETE FROM SubProf WHERE professor = ? AND subject = ?";
        const values = [subProf.professor, subProf.subject];
        let success = null;
        let err = null;
        try {
            success = await conn.query(sql, values);
        }
        catch(error) {
            err = error;
        }
        onsole.log(success);
        console.log(`DeleteSubProf ${subProf}`)
        db.disconnect(conn);
        return {success: success, err: err};
    }

    async getSubProfByProfessor(professorToBeSearched) {
        const conn = await db.connect();
        const sql = "SELECT subject FROM SubProf WHERE professor = ?";
        let err = null;
        let professorFound = false;
        let subjects = null;
        try {
            const [rows, _] = await conn.execute(sql, [professorToBeSearched.professor]);
            subjects = rows;
            professorFound = true;
        }
        catch(error) {
            err = error;
        }

        console.log("A");
        console.log(subjects);
        console.log(professorFound);
        console.log(err);

        db.disconnect(conn);
        return {subjects: subjects, professorFound: professorFound, err: err};
    }

    async getSubProfBySubject(subjectToBeSearched) {
        const conn = await db.connect();
        const sql = "SELECT professor FROM SubProf WHERE subject = ?";
        let err = null;
        let subjectFound = false;
        let professors = null;
        try {
            const [rows, _] = await conn.execute(sql, [subjectToBeSearched.subject]);
            professors = rows;
            subjectFound = true;
        }
        catch(error) {
            err = error;
        }

        console.log("A");
        console.log(professors);
        console.log(subjectFound);
        console.log(err);

        db.disconnect(conn);
        return {professors: professors, subjectFound: subjectFound, err: err};
    }

}

const subProfSchema = new SubProfSchema();

module.exports = subProfSchema;