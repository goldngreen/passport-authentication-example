
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
    type = '{username: String, password: String, displayName: String, firstName: String, lastName: String, email: String, validated: Boolean, created: Date, type: String}';

    constructor(dbFilePath) {
        connectionDetails.storage = database;
        this.db = new Sequelize(connectionDetails);    
    }

    initSchema() {
        let User = db.define('users', {
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
        let ok = typeCheck(type, user);
        if (!ok) {
            console.log("type error");
        }
    }
}

function connect(database) {
    connectionDetails.storage = database;
    return new Sequelize(connectionDetails);
}

function initSchema(sql) {
    let User = sql.define('users', {
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

function validateUser(user) {
    let ok = typeCheck('{username: String, password: String, displayName: String, firstName: String, lastName: String, email: String, validated: Boolean, created: Number, type: String}', user);
    if (!ok) {
        console.log("type error");
    }


    if (!('username' in user)) throw new TypeError(`User ${user} missing usernme`);
    if (!user.hasOwnProperty('password')) throw new TypeError(`User ${user} missing password`);
    if (!user.hasOwnProperty('displayName')) throw new TypeError(`User ${user} missing display name`);
    if (!user.hasOwnProperty('firstName')) throw new TypeError(`User ${user} missing first name`);
    if (!user.hasOwnProperty('lastName')) throw new TypeError(`User ${user} missing last name`);
    if (!user.hasOwnProperty('email')) throw new TypeError(`User ${user} missing email address`);
    if (!user.hasOwnProperty('validated')) throw new TypeError(`User ${user} missing validated setting`);
    if (!user.hasOwnProperty('created')) throw new TypeError(`User ${user} missing created date`);
    if (!user.hasOwnProperty('type')) throw new TypeError(`User ${user} missing type`);
}

module.exports = {
    connect: connect,
    initSchema: initSchema,
    validateUser: validateUser
};
