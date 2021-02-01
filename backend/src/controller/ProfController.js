const ProfData = require('../model/ProfData');
const SubProf = require('../model/SubProf');
const profDataSchema = require('../schema/ProfDataSchema');
const subProfSchema = require("../schema/SubProfSchema");

class ProfController {
    constructor(profSchema, subProfSchema) {
        this.profSchema = profSchema;
        this.subProfSchema = subProfSchema;
    }

    async updateProf(req, res) {
        console.log(req.body)
        const {description, price} = req.body;
        const id = req.user.id;
        const profToBeUpdated = new ProfData({id: id, description: description, price: price})
        const  {success, err} = await this.profSchema.updateProfData(profToBeUpdated);
        
        return res.json({success: success, err: err});
    }

    async updateProfSubject(req, res) {
        const {subjects} = req.body;
        console.log(req.body)
        const id = req.user.id;
        let subProfArray = []
        for (let subject of subjects) {
            subProfArray.push(new SubProf({professor: id, subject: subject}));
        }
        console.log(subProfArray)

        const deleteResp = await this.subProfSchema.deleteAllSubProf(new SubProf({professor: id}));
        const {success, err} = await this.subProfSchema.createManySubProf(subProfArray);
        return res.json({success: success, err: err});
    }

    async getProfDataById(id) {
        const userToBeSearched = new ProfData({id: id});
        const {user, userFound, err} = await this.profSchema.getUserById(userToBeSearched)
        
        return {user, userFound, err};
    }

    async searchProfBySubject (req,res) {
        const {subjects} = req.body;
        //const profSubjectsToBeSearched = new User({name: req.body.name});
        //const {user, userFound, err} = await this.userSchema.getUserByName(profSubjectsToBeSearched)
        
        return res.json({profs, profFound, err});
    }

}

const profController = new ProfController(profDataSchema, subProfSchema);

module.exports = profController;