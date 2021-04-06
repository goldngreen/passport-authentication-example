
const connect = require('../data').connect;
const metaUser = require('../data').metaUser;

class UserService {
    constructor(database) {
        this.database = database;    
    }

    async create(user) {
        metaUser.validate(user);
        return this.database.db.models.users.create(user);
    }

    async fetch() {
        return this.database.db.models.users.findAll();
    }

    async findById(id) {
        return this.database.db.models.users.findByPk(id);
    }

    async findByUsername(username) {
        return this.database.db.models.users.findOne({ where: {username: username}});
    }

    async remove(id) {
        this.database.db.models.users.destroy({ where: {id: id}});
    }

    async count() {
        return this.database.db.models.users.count();
    }
}

module.exports = {
    UserService: UserService
};
