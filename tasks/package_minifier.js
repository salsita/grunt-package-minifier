/*
 * grunt-package-minifier
 *
 *
 * Copyright (c) 2013 Matthew Gertner
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var required = require('required'),
    async = require('async'),
    path = require('path'),
    _s = require('underscore.string');

  grunt.registerMultiTask('package_minifier', 'Minimize space used by Node.js packages for distribution.', function() {
    var done = this.async(),
      dest = this.data.dest,
      paths = {};

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      target: 'main'
    });

    function copyModule(module, basePath) {
      if (module.core) {
        // Skip core modules.
        return;
      }
      var modulePath = calculateModulePath(module, basePath);
      if (modulePath in paths) {
        // Already handled this module.
        return;
      }
      grunt.file.copy(module.filename, modulePath);
      paths[modulePath] = true;
      if (module.deps) {
        for (var i=0; i<module.deps.length; i++) {
          copyModule(module.deps[i], path.dirname(modulePath));
        }
      }
    }

    function calculateModulePath(module, basePath) {
      if ('.' === module.id[0]) {
        // Relative path
        return path.resolve(basePath, module.id + '.js');
      }
      else {
        return path.resolve(dest, module.id + '.js');
      }
    }

    // Start with a clean slate.
    if (grunt.file.exists(dest)) {
      grunt.file.delete(dest);
    }

    async.map(this.filesSrc, function(packageJSON, callback) {
      var pkg = JSON.parse(grunt.file.read(packageJSON));
      var main = pkg[options.target] ? pkg[options.target] : pkg.main;
      if (!_s.endsWith(main, '.js')) {
        main += '.js';
      }
      var file = path.join(path.dirname(packageJSON), main);
      required(file, function(err, deps) {
        deps.push({ id: path.basename(path.dirname(packageJSON)), filename: file });
        callback(err, deps);
      });
    }, function(err, results) {
      if (err) {
        done(false);
      }
      else {
        for (var i=0; i<results.length; i++) {
          var deps = results[i];
          for (var j=0; j<deps.length; j++) {
            copyModule(deps[j], dest);
          }
        }
      }
      done();
    });
  });

};
