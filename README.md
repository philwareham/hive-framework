# Hive framework

[![Build Status](https://travis-ci.org/philwareham/hive-framework.svg?branch=master)](https://travis-ci.org/philwareham/hive-framework)
[![Dependency Status](https://david-dm.org/philwareham/hive-framework/status.svg)](https://david-dm.org/philwareham/hive-framework#info=dependencies)
[![devDependency Status](https://david-dm.org/philwareham/hive-framework/dev-status.svg)](https://david-dm.org/philwareham/hive-framework#info=devDependencies)

![Hive logo](https://github.com/philwareham/hive-framework/blob/master/public/favicon-192x192.png)

[Demo](http://hive-framework.philwareham.co.uk/)

A website development framework built with Grunt and Sass, and incorporating jQuery UI. The theme styling is intentionally minimal to make re-skinning easier.

Source image files (Adobe Illustrator .ai and Adobe Photoshop .psd formats) are also included, within the `/src/assets/img/` directory.

## Supported web browsers

* Internet Explorer 11.
* Chrome, Edge, Firefox, Safari and Opera the last two recent stable releases.

Older versions of the above and other browsers may work, but these are the ones we verify.

## Requirements

Building this repository requires:

* [Node.js](http://nodejs.org/) >=0.12.0
* [Grunt](http://gruntjs.com/) >=0.4.0

## Setup

### Installing required tools

The project uses [Grunt](http://gruntjs.com/) to run tasks and [Sass](http://sass-lang.com/) for CSS pre-processing. First make sure you have base dependencies installed: [Node.js](http://nodejs.org/) and [Grunt](http://gruntjs.com/). You can install Node using the [installer](https://nodejs.org) and Grunt with npm:

```ShellSession
$ npm install -g grunt-cli
```

Consult the Grunt documentation for more instructions if necessary. You might need to use `sudo npm install -g grunt-cli` instead when installing on certain Unix-based systems.

### Installing dependencies

After you have the base dependencies taken care of, you can install the project's dependencies. Navigate to the project's directory, and run the dependency manager:

```ShellSession
$ cd hive-framework
$ npm install
```

**npm** installs Node modules for Grunt. You might need to use `sudo npm install` instead when installing on certain Unix-based systems (you can also install via Yarn, instead of npm).

## Building

This repository hosts sources and needs to be built before it can be used. After you have installed all dependencies, you will be able to run tasks using Grunt, including building:

```ShellSession
$ grunt @task@
```

Where the `@task@` is either `build` or `watch`.

* The `build` task builds the project.
* The `watch` task will launch a task that watches for file changes; the project is then automatically built if a source file is modified.

## Textpattern templates

Optional [Textpattern CMS](http://textpattern.com) theme 'forms' and 'pages' templates are included, for reference. They can be found in the `public/templates` directory, and follow the structure expected by the [rah_flat](https://github.com/gocom/rah_flat) Textpattern plugin.

## License

Licensed under MIT license except Textpattern templates, which are licensed under GPLv2 license.
