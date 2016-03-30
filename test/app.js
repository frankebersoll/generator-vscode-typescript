'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var assert = require('yeoman-assert');

var helpers = yeoman.test;

yeoman.generators.Base.prototype.spawnCommand = function () { };
yeoman.generators.Base.prototype.spawnCommandSync = function () { };

describe('generator-vscode-typescript:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withArguments(['test'])
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'README.md',
      'gulpfile.js',
      '.gitignore',
      '.vscode/launch.json',
      '.vscode/tasks.json'
    ]);
  });
});
