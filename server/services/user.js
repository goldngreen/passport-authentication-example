

const assert = require('assert');


const connect = require('../data').connect;
const validateUser = require('../data').validateUser;


function createUser(user) {
    validateUser(user);

}


module.exports = {
    createUser: createUser
};
