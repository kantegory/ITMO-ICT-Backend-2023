"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_service_1 = require("./index-service");
function Index(...args) {
    if (args.length >= 2) {
        const [target, propertyName] = args;
        annotateModelWithIndex(target, propertyName);
        return;
    }
    return (target, propertyName) => {
        annotateModelWithIndex(target, propertyName, args[0]);
    };
}
exports.Index = Index;
function annotateModelWithIndex(target, propertyName, optionsOrName = {}, indexId) {
    let indexOptions;
    let fieldOptions;
    if (typeof optionsOrName === 'string') {
        indexOptions = { name: optionsOrName };
        fieldOptions = { name: propertyName };
    }
    else {
        const { length, order, collate } = optionsOrName, rest = __rest(optionsOrName, ["length", "order", "collate"]);
        indexOptions = rest;
        fieldOptions = {
            name: propertyName,
            length,
            order,
            collate,
        };
    }
    return index_service_1.addFieldToIndex(target, fieldOptions, indexOptions, indexId);
}
exports.annotateModelWithIndex = annotateModelWithIndex;
//# sourceMappingURL=index-decorator.js.map