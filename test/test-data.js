

const assert = require('assert');

const Database = require('../server/data').Database;
const userTestData = require('./data/service').user;

describe('sqlite3', () => {

    describe('database', function() {
        const testDatabase = '.data/test.sqlite';
        const addTestData = (models, count) => {
            const items = userTestData.samples(count).forEach((user) => {
                models.users.create(user);
            });
        }
          
        it('should connect to the database', () => {
            const database = new Database(testDatabase);
            assert.ok(database);
            assert.ok(database.db);
            assert.ok(database.db.config);
            assert.ok(database.db.connectionManager);
            assert.ok(database.db.queryInterface);
        });

        it('should authenticate against the database', () => {
            const database = new Database(testDatabase);
            return database.authenticate();
        });

        it('should set up the schema', function() {
            const database = new Database(testDatabase);
            const models = database.initSchema();
            assert.ok(models.users);
            assert.ok(models.users.name);
            assert.ok(models.users.tableName);
            assert.strictEqual(models.users.tableName, "users");
        });

        it('should store users', function() {
            const database = new Database(testDatabase);
            const models = database.initSchema();
            return models.users.sync({force: true}) // Test: use 'force: true' to drop the table and create again
                .then(() => {
                    addTestData(models, 10);
                });
        });

        it('should find all users', function() {
            const database = new Database(testDatabase);
            const models = database.initSchema();
            const testUserCount = 100;
            return models.users.sync({force: true}) // Test: use 'force: true' to drop the table and create again
                .then( () => {        
                    addTestData(models, testUserCount);
                })
                .then( () => {
                    return models.users.findAll()
                        .then((users) => {
                            assert.strictEqual(users.length, testUserCount);
                        });
                });
        });
    });
});