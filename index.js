'use strict';

const errors = require('restify-errors');

function errorExist(type) {
	return Object.prototype.hasOwnProperty.call(errors, type);
}

/**
 * Throw a specific Restify error.
 * @param  {String} type The type of error to throw
 * @param  {String} msg An error message
 * @param  {(String|Number)} errno An unique error id code to let clients handle the error
 * @param  {...} [debug] An undefined number of contex-debug informations to pass
 */
function throwError(type, msg, errno, ...debug) {
	debug = debug || [];
	if (!errorExist(type)) {
		type = 'InternalServerError';
		debug.push('Invalid error type provided:' + type);
	}
	return new errors[type]({
		message: msg,
		context: {
			errno,
			debug
		}
	});
}

/**
 * Checks if a specific Restify error was thrown.
 * @param  {Object} err The object to check
 * @param  {String} [type] The type of error that the object should be instance of
 * @returns  {Boolean} true if the type match, false otherwise
 */
function errorThrown(err, type) {
	if (type !== undefined) {
		if (errorExist(type)) {
			return err instanceof errors[type];
		}
		return false;
	}
	return err instanceof Error;
}

module.exports = {
	throw: throwError,
	thrown: errorThrown
};
