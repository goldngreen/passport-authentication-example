

const assert = require('assert');

const root = '../../server';

const createUser = require(root + '/services/user').createUser;
const MetaUser = require(root + '/data').MetaUser;

describe('user-service', () => {

    it('should create a user', () => {
        user = MetaUser.sample;
        createUser(user);
    });

    it('should reject an invalid user', () => {
        let user = MetaUser.sample;
        delete user.username;
        assert.throws( () => createUser(user), { name: 'TypeError' } );
    });

    it('should be easy to isolate test code', () => {
    });
});