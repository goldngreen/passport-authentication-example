

const assert = require('assert');

const root = '../../server';

const createUser = require(root + '/services/user').createUser;
const userTestData = require('../data/service').user;

describe('user-service', () => {

    it('should create a user', () => {
        const user = userTestData.sample();
        createUser(user);
    });

    it('should reject an invalid user', () => {
        const user = Object.assign({}, userTestData.sample());
        delete user.username;
        assert.throws( () => createUser(user), { name: 'TypeError' } );
    });

    it('should be easy to isolate test code', () => {
    });
});