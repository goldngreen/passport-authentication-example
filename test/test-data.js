

const assert = require('assert');

const Database = require('../server/data').Database;
const metaUser = require('../server/data').metaUser;

describe('sandbox', () => {

    describe('database', function() {
        const addTestData = (models, count) => {
            const user = metaUser.sample;
            for (let i = 0; i < count; i++) {
                user.username = 'username' + i;
                user.password = 'password' + i;
                models.users.create(user); // create a new entry in the users table
            }
        }

        it('should connect to the database', () => {
            const database = new Database('.data/test.sqlite');
        });

        it('should authenticate against the database', () => {
            const database = new Database('.data/test.sqlite');
            return database.authenticate();
        });

        it('should set up the schema', function() {
            const database = new Database('.data/test.sqlite');
            const models = database.initSchema();
            assert.ok(models.users);
            assert.ok(models.users.name);
            assert.ok(models.users.tableName);
            assert.strictEqual(models.users.tableName, "users");
        });

        it('should store users', function() {
            const database = new Database('.data/test.sqlite');
            const models = database.initSchema();
            return models.users.sync({force: true}) // Test: use 'force: true' to drop the table user and create a new one if it exists
                .then(() => {
                    addTestData(models, 10);
                });
        });

        it('should find users', function() {
            const database = new Database('.data/test.sqlite');
            const models = database.initSchema();
            const testUserCount = 100;
            return models.users.sync({force: true}) // Test: use 'force: true' to drop the table user and create a new one if it exists
                .then( () => {        
                    addTestData(models, testUserCount);
                })
                .then( () => {
                    models.users.findAll()
                        .then((users) => {
                            assert.strictEqual(users.length, testUserCount);
                        })
                        .catch(err => {
                            assert.fail(`Exception in findAll ${err}`);
                        });
                });
        });
    });
});