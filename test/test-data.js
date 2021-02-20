

const assert = require('assert');

const connect = require('../server/data/connect').connect;
const initSchema = require('../server/data/schema').initSchema;

describe('sandbox-1', () => {

    it('should connect to the database', () => {
        let sql = connect('.data/test.sqlite');
        sql.authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                assert.fail('Exception connecting to database')
            });
    });

    it('should set up the schema', () => {
        let sql = connect('.data/test.sqlite');
        sql.authenticate()
            .then(() => {
                initSchema(sql);
            })
            .catch(err => {
                assert.fail('Exception connecting to database')
            });
    });

    it('should be easy to isolate test code', () => {
    });
});