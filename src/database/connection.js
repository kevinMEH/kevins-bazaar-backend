// TODO: Convert to ES6
const { MongoClient } = require("mongodb");

const connectionString = process.env.ATLAS_URI;

const client = new MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let connection;

module.exports = {
    connectToServer: function (callback) {
        client.connect((error, database) => {
            if(error || !database) return callback(error);
            
            connection = database.db("kevins_bazaar");
            console.log("Connected to MongoDB");
            
            return callback();
        });
    },

    getDatabase: function() {
        return connection;
    }
}