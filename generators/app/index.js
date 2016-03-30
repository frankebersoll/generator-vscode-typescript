'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({

  initializing: function () {
    this.composeWith('npm-init', {
      options: {
        "skip-main": true,
        "skip-test": true,
        "main": "out/index.js"
      }
    }, {
      local: require.resolve('generator-npm-init/app')
    });
  },

  prompting: function () {
    var done = this.async();

    this.log(yosay(
      'Welcome to frankebersoll\'s ' + chalk.red('Visual Studio Code TypeScript') + ' generator!'
    ));

    done();
  },

  writingFiles: function () {
    this.fs.copy(
      this.templatePath('**/*.*'),
      this.destinationRoot(), {
        globOptions: {
          dot: true
        }
      }
    );
  },

  installingNpmDependecies: function () {
    this.npmInstall([
      'del',
      'gulp',
      'gulp-tsb',
      'typescript'], {
        saveDev: true
      });
  },

  installingTypings: function() {
    this.spawnCommandSync('typings', ['install', 'node', '--ambient', '--save']);
  },

  end: function () {
    this.fs.delete(this.destinationPath('.yo-rc.json'));
    this.spawnCommand('code', ['.']);
  }

});
