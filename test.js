import test from 'ava';
import m from '.';

test('empty test', t => {
	t.is(m.thrown(), false);
});

test('out test', t => {
	const out = m.throw('a', 'b', 'c');
	t.is(out.body.code, 'InternalServer');
	t.is(out.message, 'b');
	t.is(out.body.errno, 'c');
	t.is(out.context.debug[0], 'Invalid error type provided:InternalServerError');
});

test('error is present', t => {
	const pres = m.throw('LockedError', 'Requested resource is locked', '42');
	t.is(pres.body.code, 'Locked');
	t.is(pres.message, 'Requested resource is locked');
	t.is(pres.body.errno, '42');
	t.is(pres.context.debug.length, 0);
});

test('error is present with debug', t => {
	const pres = m.throw('LockedError', 'Requested resource is locked', '42', 'debugField1', 33);
	t.is(pres.body.code, 'Locked');
	t.is(pres.message, 'Requested resource is locked');
	t.is(pres.body.errno, '42');
	t.is(pres.context.debug[0], 'debugField1');
	t.is(pres.context.debug[1], 33);
	t.is(pres.context.debug.length, 2);
});
