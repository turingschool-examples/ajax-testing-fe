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
            <button class="delete" style="color:red;">
              ✖
            </button>
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

Entry.post = function(event) {
  event.preventDefault()
  const $author = $("#author-field");
  const $body = $("#body-field");
  const data = {
    author: $author.val(),
    body: $body.val(),
  }

  $.post(`${host}/posts`, data)
    .then(Entry.appendNew) .catch(Entry.handleError)
}

Entry.appendNew = function (entry) {
  const newEntry = new Entry(entry);
  $('#entries').append(newEntry.toHTML());
}

Entry.handleError = function (error) {
  console.error(error)
}

Entry.delete = function (event) {
  const parentId = event.target.parentElement.attributes[1].value;
  $.ajax({
    type: "DELETE",
    url: `${host}/posts/${parentId}`,
    id: parentId
  })
    .then(Entry.remove)
    .catch(Entry.handleError)
}

Entry.remove = function (response) {
  const { id } = this;
  $(`div[data-id='${id}'`).remove();
  const message = `Post ${id} removed!`;
  Entry.flash("delete", message);
}

Entry.flash = function (kind, message) {
  const $body = $("body");
  const flashMessage = `
    <article class="flash ${kind}">
      ${message}
    </article>
  `
  $body.prepend(flashMessage)
}

module.exports = Entry

