const ProfData = require('../model/ProfData');
const profDataSchema = require('../schema/ProfDataSchema');

class ProfController {
    constructor(profSchema) {
        this.profSchema = profSchema;
    }

    async updateProf(req, res) {
        console.log(req.body)
        const {id, description, price} = req.body;

        const profToBeUpdated = new ProfData({id: id, description: description, price: price})
        const  {success, err} = await this.profSchema.updateProfData(profToBeUpdated);
        
        return res.json({success: success, err: err});
    }

    async updateProfSubject(req, res) {
        const {id, subjects} = req.body;
        const userToBeDeleted = new User({id: id})
        const {success, err} = await this.profSchema.deleteUser(userToBeDeleted);

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

const userController = new UserController(null, userSchema, profDataSchema);

module.exports = userController;