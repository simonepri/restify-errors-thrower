# Restify Errors Thrower
[![Travis CI](https://travis-ci.org/simonepri/restify-errors-thrower.svg?branch=master)](https://travis-ci.org/simonepri/restify-errors-thrower) [![Codecov](https://img.shields.io/codecov/c/github/simonepri/restify-errors-thrower/master.svg)](https://codecov.io/gh/simonepri/restify-errors-thrower) [![npm](https://img.shields.io/npm/dm/restify-errors-thrower.svg)](https://www.npmjs.com/package/restify-errors-thrower) [![npm version](https://img.shields.io/npm/v/restify-errors-thrower.svg)](https://www.npmjs.com/package/restify-errors-thrower) [![npm dependencies](https://david-dm.org/simonepri/restify-errors-thrower.svg)](https://david-dm.org/simonepri/restify-errors-thrower) [![npm dev dependencies](https://david-dm.org/simonepri/restify-errors-thrower/dev-status.svg)](https://david-dm.org/simonepri/restify-errors-thrower#info=devDependencies)
> 💥 Throw Restify errors easily and consistently!


## Install

```
$ npm install --save restify-errors-thrower
```

## Usage

```js
const restify = require('restify');
const thrower = require('restify-errors-thrower');

// Creates a Restify server
const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});

// Creates a foo endpoint
server.get('/foo', function(req, res, next) {
  if (!req.query.foo) {
    return next(thrower.throw('BadRequestError', 'foo undefined', 'R.FOO.0');
  }
  if (req.query.foo !== 'unicorn') {
    return next(thrower.throw('BadRequestError', 'foo should be an 🦄!', 'R.FOO.1');
  }

  // Adds debug info
  const keys = req.query.keys();
  if (keys.length > 1) {
    return next(thrower.throw('BadRequestError', 'Only foo allowed', 'R.FOO.2', keys);
  }

  res.send(200, 'ok!');
  return next();
});

// Logs errors and debug info
server.on('after', function(req, res, route, err) {
  if (err && err.context) {
    const method = req.method.toUpperCase();
    const uri = req._url.path;
    const endpoint = method + '\t' + uri;

    console.log('[API]', endpoint, err.toString() + ' (' + err.context.errno + ')');
    if(err.context.debug) {
      debug.forEach(d => console.log('[DEBUG]', endpoint, d);
    }
  }
});
```

## API

### throw(type, message, errno, [debug])

Throw a specific Restify error.

#### type

Type: `string`

The type of error to throw.
The list of types available can be found [here](https://github.com/restify/errors#restify-errors)

#### message

Type: `string`

An human-friendly error message sent to the client.<br>
**Never sent error messages that comes from other modules!!!** (E.g: your database)<br>
This may expose you to undesired hackers attack!<br>
Use the debug parameter instead for sensitive errors!

#### errno

Type: `string|number`

An unique error id code to send to clients.<br>
This will help your client to programmatically handle the error your API will throw.<br>
Choose a style and be consistent with it!

#### debug

Type: `string|number`

An indefinite number of contex information to collect.<br>
This is particular useful to send contex details to your logger!<br>
This will never sent to the client so you can store server critical messages. (E.g; errors coming from third pary APIs or errors coming from your DB)

## Authors
* **Simone Primarosa** - [simonepri](https://github.com/simonepri)

See also the list of [contributors](https://github.com/simonepri/restify-errors-thrower/contributors) who participated in this project.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
