const Entry = require('./entry')
const $ = require('jquery')

function getEntryFromForm(){
  var author = $('#author-field input').val();
  var body = $('#body-field input').val();

  return new Entry({
    author: author,
    body: body
  })
}


$(function() {
  Entry.allEntriesToHTML()
  .then(function(entriesHTML) {
    $('#entries').html(entriesHTML)
  });

  $('input[type=submit]').on('click', function(event){
    event.preventDefault();
    var newEntry = getEntryFromForm();

    newEntry.create().then(function(fullEntry) {
      $("#entries").append(fullEntry.toHTML())
    });

  });
});
