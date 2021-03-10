

const assert = require('assert');


const connect = require('../data').connect;
const User = require('../data').User;


function createUser(user) {
    User.validate(user);
}


module.exports = {
    createUser: createUser
};
