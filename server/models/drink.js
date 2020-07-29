const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const drinkSchema = new Schema({
    name: String,
    liquidId: String,
    toppingId: String,
    options: {
        type: String,
        enum: ['ICE', 'LESS_ICE', 'NO_ICE', 'SUGAR'],
        default: 'ICE'
    }
});

module.exports = mongoose.model('Drink', drinkSchema);