const ProfData = require('../model/ProfData');
const User = require('../model/User')
const hashService = require('../util/CryptService')
const userSchema = require("../schema/UserSchema");
const profDataSchema = require('../schema/ProfDataSchema');

class UserController {
    constructor(hashService, userSchema, profSchema) {
        this.hashService = hashService;
        this.userSchema = userSchema;
        this.profSchema = profSchema;
    }
    
    async createUser(req, res) {
        console.log(req.body)
        const {email, password, name, professor} = req.body;

        const hashedPassword = await this.hashPassword(password);
        console.log(hashedPassword);
        const newUser = new User({email: email, password: hashedPassword, name: name, professor: professor})
        let {success, err} = await this.userSchema.createUser(newUser);

        if (err) {
            if (err.code == 'ER_DUP_ENTRY') {
                return res.json({success: false, err: "Email já cadastrado no sistema"});
            }
        }
        if (professor && success) {
            const {user, userFound, err} =  await this.getUserByEmail(email);
            const profData = new ProfData({id: user.id, description: "", price: 0});
            console.log("Professor")
            const responseProf = await this.profSchema.createProfData(profData);

            //todo check error
        }
        console.log(newUser)
        if (success) {
            res.redirect("/login");
        }
        else {
            return res.json({success: success, err: err});
        }
        
    }

    async updateUser(req, res) {
        const {password, name, professor} = req.body;
        const id = req.user.id;
        const hashedPassword = await this.hashPassword(password);
        console.log(hashedPassword);
        const userToBeUpdated = new User({id: id, password: hashedPassword, name: name, professor: professor})
        const  {success, err} = await this.userSchema.updateUser(userToBeUpdated);
        
        return res.json({success: success, err: err});
    }

    async deleteUser(req, res) {
        const {id} = req.user.id;
        const userToBeDeleted = new User({id: id})
        const {success, err} = await this.userSchema.deleteUser(userToBeDeleted);

        return res.json({success: success, err: err});
    }

    async hashPassword(password) {
        const hashedPassword = await hashService.hashString(password);
        return hashedPassword;
    }

    async checkSamePassword(unhashedPassword, hashedPassword) {
        const isSamePassword = await hashService.checkSameHash(unhashedPassword, hashedPassword);
        return isSamePassword;
    }

    async getUserByEmail(email) {
        const userToBeSearched = new User({email: email});
        const {user, userFound, err} = await this.userSchema.getUserByEmail(userToBeSearched)
        
        return {user, userFound, err};
    }

    async getUserById(id) {
        const userToBeSearched = new User({id: id});
        const {user, userFound, err} = await this.userSchema.getUserById(userToBeSearched)
        
        return {user, userFound, err};
    }

    async searchProfByName(req,res) {
        const userToBeSearched = new User({name: req.body.name});
        const {users, userFound, err} = await this.userSchema.getProfByName(userToBeSearched)

        return res.json({users, userFound, err});
    }
    async searchProfs(req, res) {
        const {users, userFound, err} = await this.userSchema.getProfs()

        return res.json({users, userFound, err});
    }
    async filter(req, res){
        const {users, userFound, err} = await this.userSchema.get_filter(req.body.subjects)

        return res.json({users, userFound, err});
    }
    async searchProfById(req, res){
        const userToBeSearched = new User({id: req.body.id});
        const {user, userFound, err} = await this.userSchema.getProfById(userToBeSearched)
       // console.log(user)
        return res.json({user, userFound, err});
    }

}

const userController = new UserController(hashService, userSchema, profDataSchema);

module.exports = userController;