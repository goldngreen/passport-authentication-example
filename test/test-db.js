
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

    it('should support create', () => {
        let record = { username: "afs", password: "afs123", displayName: "Andy", email: "afs@example.com" };
        let records = db.users.create(record);

        db.users.findByUsername("afs", (err, user) => {
            assert.strictEqual(user.username, "afs");
            assert.strictEqual(user.password, "afs123");
            assert.strictEqual(user.displayName, "Andy");
            assert.strictEqual(user.email, "afs@example.com");
        });

    });

    it('should support fetch', () => {
        let records = db.users.fetch();
        assert.notStrictEqual(db.users.fetch(), null)
   });
   
});

