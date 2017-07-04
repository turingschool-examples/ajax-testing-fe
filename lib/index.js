const Entry = require('./entry')
const $ = require('jquery')

$(function() {
  Entry.allEntriesToHTML()
  .then(function(entriesHTML) {
    $('#entries').html(entriesHTML)
  });
});
