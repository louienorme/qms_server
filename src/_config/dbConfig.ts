const mongoose = require('mongoose');
const { MONGO_DB_URI, MONGO_DB_USER, MONGO_DB_PASSWORD, MONGO_DB_PORT, MONGO_DB_HOST, MONGO_DB_NAME } = process.env;

const DB_URI = MONGO_DB_URI || `mongodb://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}:${MONGO_DB_PORT}/${MONGO_DB_NAME}`;

module.exports = async () => {
    try {
        await mongoose.connect(DB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('Database Connected...')
    } catch (err) {
        throw new Error('Failed to connect to the Database');
    }
};
