const bcrypt = require('bcrypt');

class CryptService {
    constructor(hash_function) {
        this.hash_function = hash_function;
    }

    async hashString(string) {
        const salt = await this.hash_function.genSalt(10).catch((err) => {
            if (err) {
                throw err;
            }
        });
        const hash = await this.hash_function.hash(string, salt).catch((err) => {
            if (err) {
                throw err;
            }
        });
        return hash;
    }

    async checkSameHash(string, hash) {
        return await this.hash_function.compare(string, hash);
    }
}

const hashService = new CryptService(bcrypt);

module.exports = hashService;

