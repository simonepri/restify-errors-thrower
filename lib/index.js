'use strict';

const errors = require('restify-errors');

var thrower = {};

thrower.throw = function(type, msg, context) {
	if(errors.hasOwnProperty(type) {
		return new errors[type]({
			message: msg,
			context: context
		});
	}
	return new errors.InternalServerError({
		message: msg,
		context: context
	});
};

thrower.throwed = function(err, type) {
	if(type !== undefined && errors.hasOwnProperty(type)) {
		return err instanceof errors[type];
	}
	return err instanceof Error;
};

module.exports = thrower;