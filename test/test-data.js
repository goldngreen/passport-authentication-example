

const assert = require('assert');

const connect = require('../server/data').connect;
const initSchema = require('../server/data').initSchema;

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
                models = initSchema(sql);
                models.user.describe(sql, {})
                    .then( result => {
                        console.log(result);
                    })
                    .catch(err => {
                        assert.fail('Exception connecting to database')
                    });
            })
            .catch(err => {
                assert.fail('Exception connecting to database')
            });
    });

    it('should be easy to isolate test code', () => {
    });
});