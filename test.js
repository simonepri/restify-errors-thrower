import test from 'ava';
import m from '.';

test('should throw InternalServer error with an invalid type', t => {
	const out = m.throw('a', 'An error message', 'errorno');
	t.is(out.body.code, 'InternalServer');
	t.is(out.message, 'An error message');
	t.is(out.body.errno, 'errorno');
	t.is(out.context.debug[0], 'Invalid error type provided:InternalServerError');
});

test('should throw the correct error with a valid type', t => {
	const pres = m.throw('LockedError', 'Requested resource is locked', '42');
	t.is(pres.body.code, 'Locked');
	t.is(pres.message, 'Requested resource is locked');
	t.is(pres.body.errno, '42');
	t.is(pres.context.debug.length, 0);
});

test('should contain debug information', t => {
	const pres = m.throw('LockedError', 'Requested resource is locked', '42', 'debugField1', 33);
	t.is(pres.body.code, 'Locked');
	t.is(pres.message, 'Requested resource is locked');
	t.is(pres.body.errno, '42');
	t.is(pres.context.debug[0], 'debugField1');
	t.is(pres.context.debug[1], 33);
	t.is(pres.context.debug.length, 2);
});

test('should return false, if error does not exist', t => {
	const out = m.throw('InexistentError', 'This error does not exist', 130);
	t.is(m.thrown(out, 'InexistentError'), false);
});

test('should return true, if the error exists', t => {
	const out = m.throw('WrongAcceptError', 'I cannot accept this', 118);
	t.is(m.thrown(out, 'WrongAcceptError'), true);
});
