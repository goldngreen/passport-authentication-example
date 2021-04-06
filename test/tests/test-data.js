
if (process.env.GLITCH_ENV !== 'true') {
    require('dotenv').config();
}

const assert = require('assert');

const Database = require(process.env.PROJECT_ROOT+'/server/data').Database;
const userTestData = require(process.env.PROJECT_ROOT+'/test/services/test-data').user;
const logger = require(process.env.PROJECT_ROOT+'/server/useful/logular').defaultLogger;

"use strict";

describe('database', function() {
    const testDatabase = '.data/test.sqlite';
    const database = new Database(testDatabase);
    let models = null;
        
    describe('#new Database(path)', function() {
        it('should create database object', function() {
            assert.ok(database);
            assert.ok(database.db);
            assert.ok(database.db.config);
            assert.ok(database.db.connectionManager);
            assert.ok(database.db.queryInterface);
        });
    });

    describe('#authenticate()', function() {
        it('should authenticate against the database', () => {
            return database.authenticate();
        });
    });

    describe('#initSchema()', function() {
        it('should set up the schema', async function() {
            assert.ok(models.users);
            assert.ok(models.users.name);
            assert.ok(models.users.tableName);
            assert.strictEqual(models.users.tableName, "users");
        });
    });

    describe('#models.user.create(user)', function() {
        it('should store users', async function() {
            await addTestData(models, 10);
        });
    });

    describe('#models.user.findAll()', function() {
        it('should find all users', async function() {
            const testUserCount = 10;
            await addTestData(models, testUserCount);
            result = await models.users.findAll();
            assert.strictEqual(result.length, testUserCount);
        });
    });

    before(async function() {
        logger.trace(this.test.title);
        await database.authenticate();
        await database.initSchema();
        logger.trace(this.test.title);
    });

    beforeEach(async function() {
        logger.trace(this.test.title);
        models = await database.initSchema();
    });

    afterEach(function() {
        logger.trace(this.test.title);
    });

    const addTestData = async (models, count) => {
        const items = await userTestData.samples(count);
        items.forEach((user) => {
            models.users.create(user);
        });
    }
});