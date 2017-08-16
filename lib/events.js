var $ = require('jquery');
const Entry = require('./entry')

// fire GET request on page load
$(function() {
  Entry.allEntriesToHTML()
  .then(function(entriesHTML) {
    $('#entries').html(entriesHTML)
  });
});
