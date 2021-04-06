
let typeCheck = require('type-check').typeCheck;

class Type {
    static check(type,object) {
        let s = object.toString();
        if (!typeCheck(type,object)) {
            throw new TypeError(`Type error. Expected ${type} but received ${object}`);
        }
    }
}

module.exports = {
    Type: Type
};