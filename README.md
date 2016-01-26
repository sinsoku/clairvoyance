# Clairvoyance - a css code coverage tool

[![Build Status](https://travis-ci.org/sinsoku/clairvoyance.svg?branch=master)](https://travis-ci.org/sinsoku/clairvoyance)
[![codecov.io](https://codecov.io/github/sinsoku/clairvoyance/coverage.svg?branch=master)](https://codecov.io/github/sinsoku/clairvoyance?branch=master)
[![npm version](https://badge.fury.io/js/clairvoyance.svg)](https://badge.fury.io/js/clairvoyance)

## Installation

Install with npm:

    $ npm install -g clairvoyance

## Getting Started

Run as follow:

    $ clairvoyance --css path/app.css --html path/index.html

## API

```js
var Clairvoyance = require("clairvoyance");

var parser = new Clairvoyance({css: "path/app.css", html: "path/index.html"});
parser.run(function(result) {
  console.log(result);
  // { "path/app.css": [null, null, 0, 0, 1, 1, 2, ...] }
});
```
