
if (process.env.GLITCH_ENV !== 'true') {
    require('dotenv').config();
}

const assert = require('assert');

const UserService = require(process.env.PROJECT_ROOT+'/server/services/user').UserService;
const Database = require(process.env.PROJECT_ROOT+'/server/data').Database;
const userTestData = require(process.env.PROJECT_ROOT+'/test/services/test-data').user;
const logger = require(process.env.PROJECT_ROOT+'/server/useful/logular').defaultLogger;

"use strict";

describe('user-service', function() {
    const testDatabase = '.data/test.sqlite';
    const database = new Database(testDatabase);

    describe('#create()', function() {    
        it('should create a user', async function() {
            const sample = await userTestData.sample();
            const user = await userService.create(sample);
            logger.info(`create username is ${user.username}, user.id is ${user.id}`);
        });
        it('should reject an invalid user', async function() {
            const user = Object.assign({}, await userTestData.sample());
            delete user.username;
            assert.rejects( async () => await userService.create(user) );
        });
    });

    describe('#fetch()', function() {
        it('should fetch all of the users in the database', async function() {
            const count = 12;
            await addTestData(count);
            const result = await userService.fetch();
            logger.info("result: " + result);
        });
    });

    describe('#findById(id)', function() {    
        it('should find a user in the database by id', async function() {
            const sample = await userTestData.sample();
            const user = await userService.create(sample);
            logger.info(`FindById: user is ${user.username}, user.id is ${user.id}`);
            const found = await userService.findById(user.id);
            logger.info(`Found user: ${found.username}, user.id is ${found.id}`);
            assert.ok(found.id);
        });
        it('should not find a user that is not in the database by id', async function() {
            const sample = await userTestData.sample();
            logger.info(`FindById: user is "missing", user id is 1000`);
            const found = await userService.findById(1000);
            logger.info(`Found user: ${found}`);
            assert.strictEqual(found, null);
        });
    });

    describe('#findByUsername(username)', function() {    
        it('should find a user in the database by username', async function() {
            const sample = await userTestData.sample();
            const user = await userService.create(sample);
            logger.info(`FindByUsername: user is ${user.username}, user.id is ${user.id}`);
            const found = await userService.findByUsername(user.username);
            logger.info(`Found user: ${found.username}`);
            assert.strictEqual(found.username, user.username);
        });
        it('should not find a user that is not in the database by username', async function() {
            const sample = await userTestData.sample();
            logger.info(`FindByUsername: user is "missing"`);
            const found = await userService.findByUsername("missing");
            logger.info(`Found user: ${found}`);
            assert.strictEqual(found, null);
        });
    });

    describe('#remove(id)', function() {
        it('should remove a user specified by its id from the database', async function() {
            const sample = await userTestData.sample();
            const user = await userService.create(sample);
            logger.info(`findById: user is ${user.username}, user.id is ${user.id}`);
            const found = await userService.findById(user.id);
            logger.info(`Found user: ${found.username}, user.id is ${found.id}`);
            assert.ok(found.id);
            await userService.remove(user.id);
            const missing = await userService.findById(user.id);
            logger.info(`Found user: ${missing}`);
            assert.strictEqual(missing, null);            
        });
    });

    describe('#count()', function() {
        it('should return a count of the number of users', async function() {
            const count = 12;
            await addTestData(count);
            const result = await userService.count();
            assert.strictEqual(count, result);
        });
    });

    it('should be easy to isolate test code', () => {
    });

    const addTestData = async (count) => {
        const items = await userTestData.samples(count);
        items.forEach((user) => {
            userService.create(user);
        });
    }

    before(async function() {
        logger.trace(this.test.title);
        logger.trace(this.test.title);
    });

    beforeEach(async function() {
        logger.trace(this.test.title);
        await database.authenticate();
        await database.initSchema();
        userService = new UserService(database);
    });

    afterEach(function() {
        logger.trace(this.test.title);
    });
});