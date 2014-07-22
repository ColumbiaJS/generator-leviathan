/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('leviathan:cleanup', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }
      this.app = helpers.createGenerator('leviathan:app', [
        '../../app'
      ]);
      this.cleanup = helpers.createGenerator('leviathan:cleanup', [
        '../../generators/cleanup'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // add files you expect to exist here.
      '.jshintrc',
      '.editorconfig',
      'bower.json',
      'package.json'
    ];

    helpers.mockPrompt(this.app, {
      'someOption': true
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      assert.file(expected);
    });
    this.cleanup.run({}, function () {
      assert.noFile(expected);
      done();
    });
  });
});
