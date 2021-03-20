
let Sequelize = require('sequelize');
let Type = require('../useful/type.js').Type;

let connectionDetails = {
    dialect: 'sqlite',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    logging: false
};

class Database {
    constructor(dbFilePath) {
        connectionDetails.storage = dbFilePath;
        this.db = new Sequelize(connectionDetails);    
    }

    authenticate() {
        return this.db.authenticate();
    }

    initSchema() {
        return { users: MetaUser.instance.initSchema(this.db) };
    }
}

class MetaBase {
    validate(entity) {
        this._validate();
        Type.check(this.type,entity);
    }

    initSchema(db) {
        this._validate();
        let entity = db.define(this.table, this.schema);
        entity.sync({ force: true });
        return entity;
    }

    _validate() {
        Type.check('{ type: String, table: String, schema: {...}}', this);
    }
}

class MetaUser extends MetaBase {
    static instance = new MetaUser();

    type = '{username: String, password: String, displayName: String, firstName: String, lastName: String, email: String, validated: Boolean, created: Maybe Number, provider: String}';
    table = 'users';
    schema = {
        username: { type: Sequelize.STRING, allowNull: false, unique: true },
        password: { type: Sequelize.STRING },
        displayName: { type: Sequelize.STRING },
        firstName: { type: Sequelize.STRING },
        lastName: { type: Sequelize.STRING },
        email: { type: Sequelize.STRING, allowNull: false },
        validated: { type: Sequelize.BOOLEAN },
        created: { type: Sequelize.DATE },
        provider: { type: Sequelize.STRING, allowNull: false }
    };
}

module.exports = {
    Database: Database,
    metaUser: MetaUser.instance
};
