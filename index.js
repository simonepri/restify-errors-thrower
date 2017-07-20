'use strict';

const errors = require('restify-errors');

function errorExist(type) {
	return Object.prototype.hasOwnProperty.call(errors, type);
}

/**
 * Throws a specific Restify error.
 * @param  {string} type The type of error to throw
 * @param  {string} msg An error message
 * @param  {(string|number)} errno An unique error id code to let clients handle the error
 * @param  {...} [debug] An indefinite number of contex-debug information to collect
 */
function throwError(type, msg, errno, ...debug) {
	debug = debug || [];
	if (!errorExist(type)) {
		type = 'InternalServerError';
		debug.push('Invalid error type provided:' + type);
	}
	const err = new errors[type]({
		message: msg,
		context: {
			errno,
			debug
		}
	});
	err.body.errno = errno;
	return err;
}

/**
 * Checks if a specific Restify error was thrown.
 * @param  {object} err The object to check
 * @param  {string} [type] The type of error that the object should be instance of
 * @returns  {boolean} true if the type match, false otherwise
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
