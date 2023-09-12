"use strict";
/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncMap = void 0;
function asyncMap(array, callbackfn, thisArg) {
    return Promise.all(array.map(callbackfn, thisArg));
}
exports.asyncMap = asyncMap;

//# sourceMappingURL=async.js.map
