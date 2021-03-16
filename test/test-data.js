

const assert = require('assert');

const Database = require('../server/data').Database;
const metaUser = require('../server/data').metaUser;

describe('sandbox', () => {

    it('should connect to the database', () => {
        let database = new Database('.data/test.sqlite', err => { assert.fail('Failed to connect to database'); } );
    });

    it('should authenticate against the database', () => {
        let database = new Database('.data/test.sqlite', err => { assert.fail('Failed to connect to database'); } );
        return database.authenticate()
            .then(() => {
                console.log('Authenticated against test.sqlite');
            })
            .catch(err => {
                assert.fail('Failed to authenticate against test.sqlite');
            });
    });

    it('should set up the schema', () => {
        let database = new Database('.data/test.sqlite');
        let models = database.initSchema();
        return models.users.describe()
            .then(result => {
                console.log(`models.user = ${result}`);
            })
            .catch(err => {
                assert.fail(`Exception in schema ${err}`);
            });
    });

    it('should store users', () => {
        let database = new Database('.data/test.sqlite');
        let models = database.initSchema();

        let user = metaUser.sample;
        return models.users.sync({force: true}) // Test: use 'force: true' to drop the table user and create a new one if it exists
            .then(() => {        
                for (let i = 0; i < 10; i++) {
                    user.username = 'username' + i;
                    models.users.create(user); // create a new entry in the users table
                }
            });
    });

    it('should find users', () => {
        let database = new Database('.data/test.sqlite');
        let models = database.initSchema();

        let user = metaUser.sample;
        return models.users.sync({force: true}) // Test: use 'force: true' to drop the table user and create a new one if it exists
            .then( () => {        
                for (let i = 0; i < 10; i++) {
                    user.username = 'username' + i;
                    models.users.create(user); // create a new entry in the users table
                }
            })
            .then( () => {
                models.users.findAll()
                    .then((users) => {
                        users.forEach(user => {
                            console.log(`User: ${user.username} found`);
                        });
                    })
                    .catch(err => {
                        console.log(`Exception in findAll ${err}`);
                        assert.fail(`Exception in findAll ${err}`);
                    });
            });
    });
});