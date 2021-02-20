
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

exports.connect = connect;


