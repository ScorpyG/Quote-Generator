const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const quotesSchema = new Schema ({
    hash: { type: String, required: true, unique: true},
    quote: { type: String, required: true},
    author: { type: String }
});

const Quote = mongoose.model('Quote', quotesSchema);

module.exports = Quote;