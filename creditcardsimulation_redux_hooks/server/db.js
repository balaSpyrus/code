let mongoose = require('mongoose');
class Database {
    constructor(server, database, done) {
        this.server = server;
        this.database = database;
        this._connect(done)
    }
    _connect(done) {
        mongoose.connect(`mongodb://${this.server}/${this.database}`, { useNewUrlParser: true })
            .then(() => done())
            .catch(err => done({ err, msg: 'Database connection error' }))
    }
}

module.exports = Database