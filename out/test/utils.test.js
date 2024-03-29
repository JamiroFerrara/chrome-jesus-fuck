"use strict";
/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const mockery = require("mockery");
const assert = require("assert");
const testUtils = require("./testUtils");
const MODULE_UNDER_TEST = '../src/utils';
suite('Utils', () => {
    function getUtils() {
        return require(MODULE_UNDER_TEST);
    }
    setup(() => {
        testUtils.setupUnhandledRejectionListener();
        testUtils.registerLocMocks();
        mockery.enable({ useCleanCache: true, warnOnReplace: false, warnOnUnregistered: false });
        mockery.registerMock('fs', { statSync: () => { }, existsSync: () => false });
    });
    teardown(() => {
        testUtils.removeUnhandledRejectionListener();
        mockery.deregisterAll();
        mockery.disable();
    });
    suite('getBrowserPath()', () => {
        test('osx', () => {
            mockery.registerMock('os', { platform: () => 'darwin' });
            const Utils = getUtils();
            assert.equal(Utils.getBrowserPath(), '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome');
        });
        test('win', () => {
            // Overwrite the statSync mock to say the x86 path doesn't exist
            const statSync = (aPath) => {
                if (aPath.indexOf('(x86)') >= 0)
                    throw new Error('Not found');
            };
            const existsSync = () => false;
            mockery.registerMock('fs', { statSync, existsSync });
            mockery.registerMock('os', { platform: () => 'win32' });
            const Utils = getUtils();
            assert.equal(Utils.getBrowserPath(), 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe');
        });
        test('winx86', () => {
            mockery.registerMock('os', { platform: () => 'win32' });
            const Utils = getUtils();
            assert.equal(Utils.getBrowserPath(), 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe');
        });
        test('linux', () => {
            mockery.registerMock('os', { platform: () => 'linux' });
            const Utils = getUtils();
            assert.equal(Utils.getBrowserPath(), '/usr/bin/google-chrome');
        });
        test('freebsd (default to Linux for anything unknown)', () => {
            mockery.registerMock('os', { platform: () => 'freebsd' });
            const Utils = getUtils();
            assert.equal(Utils.getBrowserPath(), '/usr/bin/google-chrome');
        });
    });
    suite('getTargetFilter()', () => {
        test('defaultTargetFilter', () => {
            const { defaultTargetFilter } = getUtils();
            const targets = [{ type: 'page' }, { type: 'webview' }];
            assert.deepEqual(targets.filter(defaultTargetFilter), [{ type: 'page' }]);
        });
        test('getTargetFilter', () => {
            const { getTargetFilter } = getUtils();
            const targets = [{ type: 'page' }, { type: 'webview' }];
            assert.deepEqual(targets.filter(getTargetFilter(['page'])), [{ type: 'page' }]);
            assert.deepEqual(targets.filter(getTargetFilter(['webview'])), [{ type: 'webview' }]);
            assert.deepEqual(targets.filter(getTargetFilter(['page', 'webview'])), targets);
            // Falsy targetTypes should effectively disable filtering.
            assert.deepEqual(targets.filter(getTargetFilter()), targets);
        });
    });
});

//# sourceMappingURL=utils.test.js.map
