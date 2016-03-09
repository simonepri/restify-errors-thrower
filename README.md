# restify-errors-thrower
This is an helper module in order to throw restify-errors errors
Detailed informations about error codes available can be found here:
https://github.com/restify/errors

## Getting Started

Install the module with: `npm install restify-errors-thrower`

## Usage


### Creating Errors

In your application, create errors by using the constructors:

```js
var thrower = require('restify-errors-thrower');

server.get('/foo', function(req, res, next) {

    if (!req.query.foo) {
        return next(thrower.throw('BadRequestError', 'foo undefined', 'some contex');
    }

    res.send(200, 'ok!');
    return next();
});
```

### Checking Error types

You can easily do instance checks against the Error objects:

```js
function redirectIfErr(req, res, next) {
    var err = req.data.error;
    if (err) {
        if (thrower.throwed(err,'InternalServerError')) {
            next(err);
        } else if (thrower.throwed(err,'NotFoundError')) {
            res.redirect('/NotFound', next);
        } else if (thrower.throwed(err)) {  
            res.redirect(err);
        }
    }
}
```

## License

Copyright (c) 2016 Simone Primarosa

Licensed under the MIT license.

