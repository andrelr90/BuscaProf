class User {
    constructor({id, email, name, password, professor}) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.password = password;
        this.professor = professor;
    }
}

module.exports = User;