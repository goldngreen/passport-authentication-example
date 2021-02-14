
const assert = require('assert');

const db = require('../server/db');

describe('db', () => {

    it('should be a valid object', () => {
        assert.notStrictEqual(db, null);
        assert.notStrictEqual(db.users, null);
        assert.ok(db.hasOwnProperty('users'));
        assert.ok(db.users.hasOwnProperty('findById'));
        assert.ok(db.users.hasOwnProperty('findByUsername'));
        assert.ok(db.users.hasOwnProperty('findOrCreate'));
        assert.ok(db.users.hasOwnProperty('fetch'));
   });

    it('should support fetch', () => {
        let records = db.users.fetch();
        assert.notStrictEqual(db.users.fetch(), null)
   });
   
});

