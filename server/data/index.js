
let Sequelize = require('sequelize');
let typeCheck = require('type-check').typeCheck;

let connectionDetails = {
    dialect: 'sqlite',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
};

class Database {
    constructor(dbFilePath) {
        connectionDetails.storage = dbFilePath;
        this.db = new Sequelize(connectionDetails);    
    }

    authenticate() {
        return this.db.authenticate();
    }

    initSchema() {
        let user = this.db.define('users', MetaUser.schema);
    
        user.sync({ force: true })
            .then(function () {
            });
    
        return { user: user };    
    }
}

class MetaUser {
    static type = '{username: String, password: String, displayName: String, firstName: String, lastName: String, email: String, validated: Boolean, created: Number, type: String}';
    static schema = {
        username: { type: Sequelize.STRING, allowNull: false, unique: true },
        password: { type: Sequelize.STRING },
        displayName: { type: Sequelize.STRING },
        firstName: { type: Sequelize.STRING },
        lastName: { type: Sequelize.STRING },
        email: { type: Sequelize.STRING, allowNull: false },
        validated: { type: Sequelize.BOOLEAN },
        created: { type: Sequelize.DATE },
        type: { type: Sequelize.STRING, allowNull: false }
    };
    
    static sample = {
        username: 'username',
        password: 'password',
        displayName: 'FirstLast',
        firstName: 'First',
        lastName: 'Last',
        email: 'email@sample.com',
        validated: true,
        created: Date.now(),
        type: 'local'
    }

    static validate(user) {
        if (!typeCheck(this.type, user)) throw new TypeError('Invalid user ${user}');    
    }
}

module.exports = {
    Database: Database,
    MetaUser: MetaUser
};
