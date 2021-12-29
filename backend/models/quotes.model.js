const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const quotesSchema = new Schema ({
    quote: { type: String, required: true },
    author: { type: String }
});

const Quote = mongoose.model('Quote', quotesSchema);

module.exports = Quote;