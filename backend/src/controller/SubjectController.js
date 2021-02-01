const Subjects = require('../model/Subjects');
const subjectSchema = require('../schema/SubjectSchema');

class SubjectController {
    constructor(subjectSchema) {
        this.subjectSchema = subjectSchema;
    }

    async getAllSubjects(req, res) {
        const {subjects, subjectFound, err} = await this.subjectSchema.getAllSubjects();
        return res.json({subjects: subjects, subjectFound: subjectFound, err: err});
    }

}

const subjectController = new SubjectController(subjectSchema);

module.exports = subjectController;