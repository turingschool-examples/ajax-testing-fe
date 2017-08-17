var assert    = require('chai').assert;
var webdriver = require('selenium-webdriver');
var until     = webdriver.until;
var test      = require('selenium-webdriver/testing');
var frontEndLocation = "http://localhost:8080"

test.describe('testing my simple blog', function() {
  var driver;
  this.timeout(10000);

  test.beforeEach(function() {
    driver = new webdriver.Builder()
      .forBrowser('chrome')
      .build();
    driver.get(`${frontEndLocation}`);
    driver.wait(until.elementLocated({css: "#entries .entry"}));
  });

  test.afterEach(function() {
    driver.quit();
  });

  test.it("lists all the entries on load", function() {
    driver.findElements({css: "#entries .entry"})
    .then(function (entries) {
      assert.lengthOf(entries, 100);
    });
  });

  test.it("posts an entry", function() {
    driver.findElement({ id: "author-field" }).sendKeys("Lauren");
    driver.findElement({ id: "body-field" }).sendKeys("Some text");
    driver.findElement({ css: "input[type='submit']" }).click();
    driver.wait(until.elementLocated({ css: "div[data-id='101']" }))
    driver.findElements({css: "#entries .entry"})
      .then(function (entries) {
        assert.lengthOf(entries, 101);
      });
  });

  test.it("deletes an entry", function() {
    driver.findElement({ css: "div[data-id='100'] .delete" }).click()
    driver.wait(until.elementLocated({ css: ".flash.delete" }))
    driver.findElements({css: "#entries .entry"})
      .then(function (entries) {
        assert.lengthOf(entries, 99);
      });
  });
});
