

const assert = require('assert');


const connect = require('../data').connect;
const isUser = require('../data').isUser;


function createUser(user) {
    assert.ok(isUser(user));
}


module.exports = {
    createUser: createUser
};
