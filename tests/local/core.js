import test from 'tape';
import { identity } from 'transducers-js';
import { initApp, TRIGGER_TYPES } from '../../src/core';

test('core initApp', (t) => {
    let app = {
        notTrigger: identity,
        onOpen: identity,
        onInstall: identity,
        onEdit: identity,
        doPost: identity,
        doGet: identity,
        fn: identity,
        x: 5,
    }

    t.test('test context', (t) => {
        let context = {};
        initApp(app, [], context);

        t.deepEqual(Object.keys(context), Object.keys(app));
        t.end();
    });

    t.test('test with 0 middleware', (t) => {
        let context = {};
        initApp(app, [], context);

        t.equal(context.doGet(1), 1);
        t.end();
    });

    t.test('test with 1 middleware', (t) => {
        let context = {};
        let middleware = (type) => (next) => (event) => 1 + next(event);
        initApp(app, [middleware], context);

        t.equal(context.doGet(1), 2);
        t.end();
    });

    t.test('test with 2 middleware', (t) => {
        let context = {};
        let middleware = (type) => (next) => (event) => 1 + next(event);
        initApp(app, [middleware, middleware], context);

        t.equal(context.doGet(1), 3);
        t.end();
    });

    t.test('test middleware with app as second parameter', (t) => {
        let context = {};
        let middleware = (type, app_) => {
            t.equal(app_, app);
            return (next) => (event) => 1 + next(event)
        };
        initApp(app, [middleware, middleware], context);

        t.equal(context.doGet(1), 3);
        t.end();
    });

    t.test('test initApp does not warp not function objects in context/app', (t) => {
        let context = {};
        let middleware = (type, app_) => {
            t.equal(app_, app);
            return (next) => (event) => 1 + next(event)
        };
        initApp(app, [middleware, middleware], context);

        t.equal(context.x, 5);
        t.end();
    });
});
