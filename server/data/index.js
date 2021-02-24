
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

function isUser(user) {
    return user.hasOwnProperty('username')
        && user.hasOwnProperty('password')
        && user.hasOwnProperty('firstName')
        && user.hasOwnProperty('lastName')
        && user.hasOwnProperty('email')
        && user.hasOwnProperty('validated')
        && user.hasOwnProperty('created')
        && user.hasOwnProperty('type');
}

module.exports = {
    connect: connect,
    initSchema: initSchema,
    isUser: isUser
};
