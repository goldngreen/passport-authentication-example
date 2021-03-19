
const connect = require('../data').connect;
const metaUser = require('../data').metaUser;

function createUser(user) {
    metaUser.validate(user);
}

module.exports = {
    createUser: createUser
};
