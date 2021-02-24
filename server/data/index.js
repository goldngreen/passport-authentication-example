
let Sequelize = require('sequelize');

let connectionDetails = {
    dialect: 'sqlite',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
};

function connect(database) {
    connectionDetails.storage = database;
    return new Sequelize(connectionDetails);
}

function initSchema(sql) {
    let User = sql.define('users', {
        username: { type: Sequelize.STRING, allowNull: false, unique: true },
        password: { type: Sequelize.STRING },
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
    if (!user.hasOwnProperty('username')) throw new TypeError(`User ${user} missing usernme`);
    if (!user.hasOwnProperty('password')) throw new TypeError(`User ${user} missing password`);
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
