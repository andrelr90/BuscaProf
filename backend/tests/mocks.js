class MockHashService {
    constructor() {
        
    }
    async hashString(password) {
        return password;
    }

    async checkSameHash(unhashedPassword, hashedPassword) {
        const isSamePassword = unhashedPassword === hashedPassword;
        return isSamePassword;
    }   
};

class MockUserSchema {
    constructor() {
        
    }
    async getUserByEmail(user) {
        if (user.email == "teste@email.com") {
            const user = {id: 1, email: "teste@email.com", password: "teste", professor: false}
            return {user: user, userFound: true, err: null};
        }
        else {
            return {user: null , userFound: false, err: null};
        }
    }
    
    async getUserById(user) {
        if (user.id == 1) {
            const user = {id: 1, email: "teste@email.com", password: "teste", professor: false};
            return {user: user, userFound: true, err: null};
        }
        else {
            return {user: null , userFound: false, err: null};
        }
    }
};

class MockProfSchema {
    constructor() {
        
    }
};

class MockMessageSchema {
    constructor() {

    }
};

module.exports = {MockHashService, MockUserSchema, MockProfSchema};