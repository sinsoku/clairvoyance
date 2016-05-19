# Clairvoyance - a css code coverage tool

[![npm version](https://badge.fury.io/js/clairvoyance.svg)](https://badge.fury.io/js/clairvoyance)
[![Build Status](https://travis-ci.org/sinsoku/clairvoyance.svg?branch=master)](https://travis-ci.org/sinsoku/clairvoyance)
[![codecov.io](https://codecov.io/github/sinsoku/clairvoyance/coverage.svg?branch=master)](https://codecov.io/github/sinsoku/clairvoyance?branch=master)
[![Inline docs](http://inch-ci.org/github/sinsoku/clairvoyance.svg?branch=master)](http://inch-ci.org/github/sinsoku/clairvoyance)

## Installation

Install with npm:

    $ npm install -g clairvoyance

## Getting Started

Run as follow:

    $ clairvoyance --css path/app.css --html path/index.html

And this will write a coverage file to `coverage/css-coverage.json`.

## Usage

```
Usage: clairvoyance [options]

Options:

  -h, --help             output usage information
  -V, --version          output the version number
  --css <path>           specify css path
  --html <path>          specify html path
  -R, --reporter <name>  append the reporter
```

### -R, --reporter

The --reporter option allows you to append the reporter. For example, you append the [clairvoyance-html](https://github.com/sinsoku/clairvoyance-html) to generate a html report.

    $ clairvoyance --css path/app.css --html path/index.html --reporter clairvoyance-html

Then, you will get a html report like below:

![](https://raw.github.com/sinsoku/clairvoyance-html/master/doc/images/index.png)

**source code view**:

![](https://raw.github.com/sinsoku/clairvoyance-html/master/doc/images/source.png)



## API

```js
var Clairvoyance = require("clairvoyance");

var parser = new Clairvoyance({css: "path/app.css", html: "path/index.html"});
parser.run(function(result) {
  console.log(result);
  // { "path/app.css": [null, null, 0, 0, 1, 1, 2, ...] }
});
```
