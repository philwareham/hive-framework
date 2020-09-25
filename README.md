# Hive framework &nbsp; [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=A%20website%20development%20framework%20built%20with%20Grunt%20and%20Sass.%20The%20theme%20styling%20is%20intentionally%20minimal%20to%20make%20re-skinning%20easier.&url=https://hive-framework.philwareham.co.uk/&via=philwareham&hashtags=html,css,js,framework,webdesign)

[![Build Status](https://travis-ci.org/philwareham/hive-framework.svg)](https://travis-ci.org/philwareham/hive-framework)

![Hive logo](https://hive-framework.philwareham.co.uk/favicon-192x192.png)

[Demo](https://hive-framework.philwareham.co.uk/)

A website development framework built with Grunt and Sass, with optional support for jQuery UI. The theme styling is intentionally minimal to make re-skinning easier.

## Supported web browsers

* Chrome, Edge, Firefox, Safari and Opera the last two recent stable releases.
* Firefox ESR latest major point release.

Older versions of the above and other browsers may work, but these are the ones we verify.

## Requirements

Building this repository requires:

* [Node.js](https://nodejs.org/)
* [Grunt](https://gruntjs.com/)

## Setup

### Installing required tools

The project uses [Grunt](https://gruntjs.com/) to run tasks and [Sass](https://sass-lang.com/) for CSS pre-processing. First make sure you have base dependencies installed: Node.js and Grunt. You can install Node using the [installer](https://nodejs.org) and Grunt with npm:

```bash
$ npm install -g grunt-cli
```

Consult the Grunt documentation for more instructions if necessary.

### Installing dependencies

After you have the base dependencies taken care of, you can install the project's dependencies. Navigate to the project's directory, and run the dependency manager:

```bash
$ cd hive-framework
$ npm install
```

**npm** installs Node modules for Grunt (you can also install via Yarn, instead of NPM, if you prefer).

## Building

This repository hosts sources and needs to be built before it can be used. After you have installed all dependencies, you will be able to run tasks using Grunt, including building:

```bash
$ grunt @task@
```

Where the `@task@` is either `build` or `watch`.

* The `build` task builds the project.
* The `watch` task will launch a task that watches for file changes; the project is then automatically built if a source file is modified.

## License

Licensed under MIT license.

Some demo site content is licensed under Creative Commons BY-NC 3.0 (audio: "Moonlight Reprise" from "Irsen's Tale" by Kai Engel) and BY 3.0 (video: "Big Buck Bunny").
