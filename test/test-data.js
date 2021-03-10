

const assert = require('assert');

const Database = require('../server/data').Database;

describe('sandbox-1-2', () => {

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
            .then( result => {
                console.log(result);
            })
            .catch(err => {
                assert.fail('Exception in schema')
            });
    });

    it('should be easy to isolate test code', () => {
    });
});