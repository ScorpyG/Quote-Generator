const router = require('express').Router();
let Quote = require('../models/quotes.model');

router.route('/').get((req, res) => {
    Quote.find()
        .then(quotes => res.json(quotes))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Adding quote handling route
router.route('/add').post((req, res) => {
    const quote = req.body.quote;
    const author = req.body.author;

    const newQuote = new Quote({
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