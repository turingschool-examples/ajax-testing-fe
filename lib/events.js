var $ = require('jquery');

const Entry = require('./entry')

$(document).ready(function(){
  // fire GET request on page load
  Entry.allEntriesToHTML()
  .then(function(entriesHTML) {
    $('#entries').html(entriesHTML)
  });

});
