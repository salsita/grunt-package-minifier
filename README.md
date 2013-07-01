# grunt-package-minifier

> Minimizes space taken by node modules and their dependencies.

NodeJS packages are generally deployed with a full hierarchy of supporting files include package.json, README and tests. For cases where the packages are to be bundled with an application and distributed, the extra space taken by these support files can signficantly increase the size of the distributed bundle.

This plugin takes the one of more `package.json` files as input and flattens each package so that only the necessary JavaScript files are copied to the output directory. It uses [`node-required`](https://github.com/shtylman/node-required) to trace the dependencies.

This plugin is similar to [`browserify`](https://github.com/substack/node-browserify) but it preserves the CommonJS-compatible modile structure rather than concatenating everything into one big file.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-package-minifier --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-package-minifier');
```

## The "package_minifier" task

### Overview
In your project's Gruntfile, add a section named `package_minifier` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  package_minifier: {
    your_target: {
      target: '', // (optional) Entry point (e.g 'browser') to use, when present, instead of 'main' (the default)
      src: [], // Path to package.json files for modules to be minified
      dest: '' // Target directory for minified modules.
    },
  },
})
```
