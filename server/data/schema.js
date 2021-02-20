
var Sequelize = require('sequelize');

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

    return User;
}

exports.initSchema = initSchema;