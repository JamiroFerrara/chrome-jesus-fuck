"use strict";
/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testUsing = void 0;
/** Run a test doing the setup/cleanup indicated by the provided fixtures */
function testUsingFunction(expectation, fixtureProvider, testFunction) {
    return test(expectation, function () {
        return __awaiter(this, void 0, void 0, function* () {
            const fixture = yield fixtureProvider(this);
            try {
                yield testFunction(fixture);
            }
            finally {
                yield fixture.cleanUp();
            }
        });
    });
}
exports.testUsing = testUsingFunction;

//# sourceMappingURL=testUsing.js.map
