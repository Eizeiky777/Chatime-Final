const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const toppingSchema = new Schema({
    name: String,
});

module.exports = mongoose.model('Topping', toppingSchema);