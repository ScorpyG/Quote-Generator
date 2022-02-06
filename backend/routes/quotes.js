const router = require('express').Router();
const Quote = require('../models/quotes.model');
const { quoteHash } = require('./duplicateQuotes');

router.route('/').get((req, res) => {
    Quote.find()
        .then(quotes => {
            // Return 1 random quote as JSON instead of the whole query
            var randObjIndex = Math.floor(Math.random() * quotes.length); // Get a random index position in quotes' object
            res.json(quotes[randObjIndex])
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// Adding quote handling route
router.route('/add').post((req, res) => {
    const quote = req.body.quote;
    const author = req.body.author;
    const hash = quoteHash(quote);

    const newQuote = new Quote({
        hash,
        quote,
        author
    });

    newQuote.save()
        .then(() => res.json('Quote added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Find quote by ID
router.route('/:id').get((req, res) => {
    Quote.findById(req.params.id)
        .then(quote => res.json(quote))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

// Deleting quote handling route
router.route('/:id').delete((req, res) => {
    Quote.findByIdAndDelete(req.params.id)
        .then(() => res.json('Quote deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Updating quote handling route
router.route('/update/:id').post((req, res) => {
    Quote.findById(req.params.id)
        .then(quote => {
            quote.quote = req.body.quote;
            quote.author = req.body.author;

            quote.save()
                .then(() => res.json('Quote updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
});

module.exports = router;