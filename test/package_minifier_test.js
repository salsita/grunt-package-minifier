'use strict';

var grunt = require('grunt'),
  fs = require('fs');

var equalFiles = function (test, filename, filename2) {
  filename2 = filename2 || filename;

  // Read in content
  var expectedContent = fs.readFileSync('test/expected/' + filename, 'utf8'),
      actualContent = fs.readFileSync('test/actual/' + filename2, 'utf8');

  // Assert that the content is *exactly* the same
  test.strictEqual(actualContent, expectedContent, filename + ' does not have the same content in `expected` as `actual`');
};

exports.package_minifier = {
  setUp: function(done) {
    done();
  },
  default_options: function(test) {
    test.expect(5);

    equalFiles(test, 'default/foo.js');
    equalFiles(test, 'default/bar.js');
    equalFiles(test, 'default/baz.js');
    equalFiles(test, 'default/bar1/bar1.js');
    equalFiles(test, 'default/bar2/bar2.js');

    test.done();
  },

  custom_options: function(test) {
    test.expect(5);

    equalFiles(test, 'custom/foo.js');
    equalFiles(test, 'custom/bar.js');
    equalFiles(test, 'custom/baz.js');
    equalFiles(test, 'custom/bar1/bar1.js');
    equalFiles(test, 'custom/bar2/bar2.js');

    test.done();
  }
};
