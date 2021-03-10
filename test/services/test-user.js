

const assert = require('assert');

const root = '../../server';

const createUser = require(root + '/services/user').createUser;
const User = require(root + '/data').User;

describe('user-service', () => {

    it('should create a user', () => {
        user = User.sample;
        createUser(user);
    });

    it('should reject an invalid user', () => {
        let user = User.sample;
        delete user.username;
        assert.throws( () => createUser(user), { name: 'TypeError' } );
    });

    it('should be easy to isolate test code', () => {
    });
});