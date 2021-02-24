

const assert = require('assert');

const createUser = require('../../server/services/user').createUser;
const initSchema = require('../../server/data').initSchema;

describe('user-service', () => {

    it('should create a user', () => {
        let user = {
            username: 'test-user',
            password: 'password',
            firstName: 'First',
            lastName: 'Last',
            email: 'email@sample.com',
            validated: true,
            created: Date.now(),
            type: 'local'
        }
        createUser(user);
    });

    it('should reject an invalid user', () => {
        let user = {
            password: 'password',
            firstName: 'First',
            lastName: 'Last',
            email: 'email@sample.com',
            validated: true,
            created: Date.now(),
            type: 'local'
        }
        assert.throws(
            () => createUser(user),
            {
                name: 'TypeError'
            }
        );
    });

    it('should be easy to isolate test code', () => {
    });
});