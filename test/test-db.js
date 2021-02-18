
const assert = require('assert');

const db = require('../server/db');

describe('db', () => {

    it('should be a valid object', () => {
        assert.notStrictEqual(db, null);
        assert.notStrictEqual(db.users, null);
        assert.ok(db.hasOwnProperty('users'));
        assert.ok(db.users.hasOwnProperty('count'));
        assert.ok(db.users.hasOwnProperty('create'));
        assert.ok(db.users.hasOwnProperty('remove'));
        assert.ok(db.users.hasOwnProperty('findById'));
        assert.ok(db.users.hasOwnProperty('findByUsername'));
        assert.ok(db.users.hasOwnProperty('findOrCreate'));
        assert.ok(db.users.hasOwnProperty('fetch'));
    });

    it('should support create', () => {
        console.log("Total users: " + db.users.count());
        let records = [];
        for (i = 0; i < 2; i++) {
            records.push( { username: "rec" + i, password: "recpass" + i, displayName: "Record " + i, email: "rec" + i + "@example.com" } );
        }
        console.log("Total users: " + db.users.count());

        records.forEach(r => testCreateFindByUser(r));
        console.log("Done testCreateFindByUser, total users: " + db.users.count());

        records.forEach(r => db.users.remove(r.id));
        console.log("Done deletes, total users: " + db.users.count());
    });

    it('should support fetch', () => {
        console.log("Empty test");
        // let records = db.users.fetch();
        // assert.notStrictEqual(db.users.fetch(), null)
    });

    const dummy = { id: -1, provider: '' };
});

   
testCreateFindByUser = (record) => {
    console.log("Do test" + record);
    db.users.create(record);

    db.users.findByUsername(record.username, (err, user) => {
        assert.strictEqual(user.username, record.username);
        assert.strictEqual(user.password, record.password);
        assert.strictEqual(user.displayName, record.displayName);
        assert.strictEqual(user.email, record.email);
    });        
};

