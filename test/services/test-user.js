

const assert = require('assert');

const root = '../../server';

const createUser = require(root + '/services/user').createUser;
const metaUser = require(root + '/data').metaUser;

describe('user-service', () => {

    it('should create a user', () => {
        user = metaUser.sample;
        createUser(user);
    });

    it('should reject an invalid user', () => {
        let user = metaUser.sample;
        delete user.username;
        assert.throws( () => createUser(user), { name: 'TypeError' } );
    });

    it('should be easy to isolate test code', () => {
    });
});