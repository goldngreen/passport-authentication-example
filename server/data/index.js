
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
        username: { type: Sequelize.STRING },
        password: { type: Sequelize.STRING },
        firstName: { type: Sequelize.STRING },
        lastName: { type: Sequelize.STRING },
        email: { type: Sequelize.STRING },
        validated: { type: Sequelize.BOOLEAN }
    });

    User.sync({ force: true })
        .then(function () {
        });

    return { user: User };
}

module.exports = {
    connect: connect,
    initSchema: initSchema
};
