

const assert = require('assert');


const connect = require('../data').connect;
const MetaUser = require('../data').MetaUser;


function createUser(user) {
    MetaUser.validate(user);
}


module.exports = {
    createUser: createUser
};
