var assert    = require('chai').assert;
var webdriver = require('selenium-webdriver');
var until = webdriver.until;
var test      = require('selenium-webdriver/testing');
var frontEndLocation = "http://localhost:8080"

test.describe('testing my simple blog', function() {
  var driver;
  this.timeout(10000);

  test.beforeEach(function() {
    driver = new webdriver.Builder()
      .forBrowser('chrome')
      .build();
  })

  test.afterEach(function() {
    driver.quit();
  })

  test.it("lists all the entries on load", function() {

    driver.get(`${frontEndLocation}`)
    driver.wait(until.elementLocated({css: "#entries .entry"}))

    driver.findElements({css: "#entries .entry"})
    .then(function (entries) {
      assert.lengthOf(entries, 3);
    })
  })

  test.it("lets a user create a new entry", function(){
    //// Given:
    //// Go to there
    driver.get(`${frontEndLocation}`)

    //// When:
    //// Fill in author
    //// Fill in body
    //// Hit submit

    driver.findElement({css: "#author-field input"})
    .sendKeys("Churchill")
    driver.findElement({css: "#body-field input"})
    .sendKeys("If you're going through hell, keep going")
    driver.findElement({css: "input[type=submit]"})
    .click()

    //// Then:
    //// I see the post in the list of entries
    driver.wait(until.elementLocated({css: ".entry[data-id='4']"}))

    driver.findElement({css: ".entry[data-id='4'] h3"}).getText()
    .then(function(header){
      assert.include(header, "Churchill")
    })
    driver.findElement({css: ".entry[data-id='4'] .entry-body"}).getText()
    .then(function(body){
      assert.equal(body, "If you're going through hell, keep going")
    })

  })
});
