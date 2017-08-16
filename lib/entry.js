const $ = require('jquery')
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

Entry.getAllEntries = function() {
  return $.getJSON(`${host}/posts`)
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
