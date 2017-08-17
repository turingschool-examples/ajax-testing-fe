var $ = require('jquery');

const Entry = require('./entry')

$(document).ready(function(){
  // fire GET request on page load
  const $entries = $('#entries');
  Entry.allEntriesToHTML()
  .then(function(entriesHTML) {
    $entries.html(entriesHTML)
  });

  const $button = $("input[type='submit']");
  $button.on("click", Entry.post);
  $entries.on("click", ".delete", Entry.delete);
});
