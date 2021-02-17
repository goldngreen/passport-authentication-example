
module.exports = {
    count: count,
    create: create,
    remove: remove,
    findById: findById,
    findByUsername: findByUsername,
    findOrCreate: findOrCreate,
    fetch: fetch
};

function count() {
    return records.length;
}


function findById(id, next) {
  process.nextTick(function() {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.id === id) {
        return next(null, record);
      }
    }
    next(new Error('User ' + id + ' does not exist'));
  });
}

function findByUsername(username, next) {
  process.nextTick(function() {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {
        return next(null, record);
      }
    }
    return next(null, null);
  });
}

function findOrCreate(profile, next) {
  process.nextTick(function() {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.provider === profile.provider && record.id === profile.id) {
        return next(null, record);
      }
    }
    console.log('Creating user');
    var user = {
      id: profile.id,
      provider: profile.provider,
      username: profile.username,
      displayName: profile.displayName,
      email: profile.email
    };
    records.push(user);
    return next(null, user);
  });
}

// yeah... probably should return copies, but whatever.
function fetch() {
  console.log('returning all records');
  return records;
}

function create(record) {
    let id = records.length + 1;
    record["id"] = id;
    record["provider"] = 'local';
    records.push(record);
    return id;
}

function remove(id) {
    records = records.filter((v,i,a) => v.id !== id);
}


var records = [
    { 
      id: 1,
      provider: 'local',
      username: 'jack',
      password: process.env.PASS1,
      displayName: 'Jack Skellington',
      email: 'jack@example.com'
    }, {
      id: 2,
      provider: 'local',
      username: 'jill',
      password: process.env.PASS2,
      displayName: 'Jill Scott',
      email: 'jill@example.com'
    }
];