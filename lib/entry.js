var $ = require('jquery');
var host = require('./config').host

function Entry(entry) {
  this.id = entry.id;
  this.author = entry.author;
  this.body = entry.body;
  this.createdAt = entry.created_at;
}

Entry.prototype.toHTML = function() {
  return `<div class="entry" data-id=${this.id}>
            <h3>Posted by ${this.author} at ${this.createdAt}</h3>
            <div class="entry-body">${this.body}</div>
          </div>`
}

Entry.prototype.create = function() {
  return $.post( `${host}/api/v1/entries`,
     { author: this.author, body: this.body } )
     .then(function(entryObject){
       return new Entry(entryObject)
     });
}

Entry.getAllEntries = function() {
  return $.getJSON(`${host}/api/v1/entries`)
}

Entry.allEntriesToHTML = function() {
  return this.getAllEntries()
  .then(function(entries){
    return entries.map(function(entry){
      return new Entry(entry);
    })
  })
  .then(function(entries) {
    return entries.map(function(entry) {
      return entry.toHTML();
    })
  })
}


module.exports = Entry
