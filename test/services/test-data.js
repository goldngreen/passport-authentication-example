
if (process.env.GLITCH_ENV !== 'true') {
    require('dotenv').config();
}

const fetch = require('node-fetch');
const testData = require(process.env.PROJECT_ROOT+'/test/services/Users.json');

class User {
    static instance = new User();
    useApi = process.env.TEST_USE_API == 'true';
    src = process.env.TEST_DATA_SRC;
    srcKey = process.env.TEST_DATA_KEY;

    async sample() {
        if (this.useApi) {
            const url = `${this.src}?key=${this.srcKey}&count=1`;
            const response = await fetch(url);
            return await response.json();
        } else {
            const user = testData[Math.floor(Math.random() * testData.length)];
            return user;
        }
    }

    async samples(count) {
        if (this.useApi) {
            const url = `${this.src}?key=${this.srcKey}&count=${count}`;
            const response = await fetch(url);
            return await response.json();
        } else {
            const start = Math.floor(Math.random() * (testData.length - count));
            return testData.slice(start, start+count);
        }
    }
}

module.exports = {
    user: User.instance
};
