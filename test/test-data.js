

const assert = require('assert');

const Database = require('../server/data').Database;
const metaUser = require('../server/data').metaUser;

describe('sandbox', () => {

    it('should connect to the database', () => {
        let db = new Database('.data/test.sqlite', err => { assert.fail('Failed to connect to database'); } );
    });

    it('should authenticate against the database', () => {
        let db = new Database('.data/test.sqlite', err => { assert.fail('Failed to connect to database'); } );
        db.authenticate()
            .then(() => {
                console.log('Authenticated against test.sqlite');
            })
            .catch(err => {
                assert.fail('Failed to authenticate against test.sqlite');
            });
    });

    it('should set up the schema', () => {
        let db = new Database('.data/test.sqlite');
        let models = db.initSchema();
        models.user.describe(db.db, {})
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                assert.fail('Exception in schema')
            });
    });

    it('should store users', () => {
        let db = new Database('.data/test.sqlite');
        let models = db.initSchema();

        let user = metaUser.sample;
        for (let i = 0; i < 10; i++) {
            user.username = 'username' + i;
            models.user.create(user); // create a new entry in the users table
        }
    });

    it('should find users', () => {
        let db = new Database('.data/test.sqlite');
        let models = db.initSchema();

        let user = metaUser.sample;
        for (let i = 0; i < 10; i++) {
            user.username = 'username' + i;
            models.user.create(user); // create a new entry in the users table
        }
        process.nextTick( () => {
            models.user.findAll()
                .then((users) => {
                    users.forEach(user => {
                        console.log(user.username);
                    });
                })
                .catch(err => {
                    assert.fail('Exception in findAll')
                });
            });
    });
});