const Base = require('./BaseModel');

module.exports = class User extends Base {
    constructor(data) {
        super(data, "User");
    }
}