
const assert = require('assert');

const usersTestData = require('./users.json');

class User {
    static instance = new User();

    sample() {
        const user = usersTestData[Math.floor(Math.random() * usersTestData.length)];
        return user;
    }

    samples(size) {
        assert(size < usersTestData.length);
        const start = Math.floor(Math.random() * usersTestData.length-size);
        return usersTestData.slice(start, start+size);
    }
}

module.exports = {
    user: User.instance
};
