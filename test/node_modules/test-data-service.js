
const assert = require('assert');
const fetch = require('node-fetch');

class User {
    static instance = new User();

    async sample() {
        const response = await fetch(`https://my.api.mockaroo.com/users.json?key=6b2275d0&count=1`);
        return await response.json();
    }

    async samples(count) {
        const response = await fetch(`https://my.api.mockaroo.com/users.json?key=6b2275d0&count=${count}`);
        return await response.json();
    }
}

module.exports = {
    user: User.instance
};
