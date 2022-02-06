const hash = require("object-hash");

// Alternate quote before hashing
const quoteHash = (quote) => {
  var hashResult;
  hashResult = quote
    .trim() // Remove white space from both ends of string
    .replace(/ /g, '') // Replace white-space inside string
    .toLowerCase() // Put string into lowerCase
    .replace(/[!@#$%^&*()-=_+{};:'"<>,./?\|]/gi, '') // Remove special characters
  ;

  // return the hashed key
  return (hash(hashResult, { algorithm: process.env.HASH_ALGO, encoding: 'base64'}));
};

module.exports = { quoteHash };