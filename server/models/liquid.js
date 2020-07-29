const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const liquidSchema = new Schema({
    name: String
});

module.exports = mongoose.model('Liquid', liquidSchema);