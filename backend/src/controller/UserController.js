const User = require('../model/User')
//const hashService = require('../util/cryptService')
const userSchema = require("../schema/UserSchema");

class UserController {
    constructor(hashService, userSchema) {
        this.hashService = hashService;
        this.userSchema = userSchema;
    }
    
    async createUser(req, res) {
        console.log(req.body)
        const {email, password, name, professor} = req.body;

        const hashedPassword = await this.hashPassword(password);
        console.log(hashedPassword);
        const newUser = new User({email: email, password: hashedPassword, name: name, professor: professor})
        const {success, err} = await userSchema.createUser(newUser);
        console.log(newUser)

        return res.json({success: success, err: err});
    }

    async updateUser(req, res) {
        console.log(req.body)
        const {id, password, name, professor} = req.body;

        const hashedPassword = await this.hashPassword(password);
        console.log(hashedPassword);
        const userToBeUpdated = new User({id: id, password: hashedPassword, name: name, professor: professor})
        const  {success, err} = await userSchema.updateUser(userToBeUpdated);
        
        return res.json({success: success, err: err});
    }

    async deleteUser(req, res) {
        const {id} = req.body;
        const userToBeDeleted = new User({id: id})
        const {success, err} = await userSchema.deleteUser(userToBeDeleted);

        return res.json({success: success, err: err});
    }

    async hashPassword(password) {
        //const hashedPassword = await hashService.hashString(password);
        const hashedPassword = 1;
        return hashedPassword;
    }

    async checkSamePassword(unhashedPassword, hashedPassword) {
        //const isSamePassword = await hashService.checkSameHash(unhashedPassword, hashedPassword);
        const isSamePassword = unhashedPassword === hashedPassword;
        return isSamePassword;
    }

    async getUserByEmail(email) {
        const userToBeSearched = new User({email: email});
        const {user, userFound, err} = await userSchema.getUserByEmail(userToBeSearched)
        
        return {user, userFound, err};
    }

    async getUserById(id) {
        const userToBeSearched = new User({id: id});
        const {user, userFound, err} = await userSchema.getUserById(userToBeSearched)
        
        return {user, userFound, err};
    }

}

const userController = new UserController(null, userSchema);

module.exports = userController;