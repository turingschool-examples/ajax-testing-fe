var $ = require('jquery');
const Entry = require('./entry')

// fire GET request on page load
$(document).ready(function(){
  Entry.allEntriesToHTML()
  .then(function(entriesHTML) {
    $('#entries').html(entriesHTML)
  });
});
