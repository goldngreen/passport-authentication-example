
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
        let User = this.db.define('users', {
            username: { type: Sequelize.STRING, allowNull: false, unique: true },
            password: { type: Sequelize.STRING },
            displayName: { type: Sequelize.STRING },
            firstName: { type: Sequelize.STRING },
            lastName: { type: Sequelize.STRING },
            email: { type: Sequelize.STRING, allowNull: false },
            validated: { type: Sequelize.BOOLEAN },
            created: { type: Sequelize.DATE },
            type: { type: Sequelize.STRING, allowNull: false }
        });
    
        User.sync({ force: true })
            .then(function () {
            });
    
        return { user: User };    
    }

    validateUser(user) {
        let ok = typeCheck(userType, user);
        if (!ok) {
            console.log("type error");
        }
    }
}

class User {
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

    static validate(user) {
        if (!typeCheck(this.type, user)) throw new TypeError('Invalid user ${user}');    
    }
}

module.exports = {
    Database: Database,
    User: User
};
