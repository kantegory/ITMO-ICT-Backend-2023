"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_service_1 = require("./index-service");
function createIndexDecorator(options = {}) {
    let indexId;
    return ((...args) => {
        if (args.length >= 2) {
            const [target, propertyName] = args;
            const fieldOptions = { name: propertyName };
            indexId = index_service_1.addFieldToIndex(target, fieldOptions, options, indexId);
            return;
        }
        return (target, propertyName) => {
            const fieldOptions = Object.assign({ name: propertyName }, args[0]);
            indexId = index_service_1.addFieldToIndex(target, fieldOptions, options, indexId);
        };
    });
}
exports.createIndexDecorator = createIndexDecorator;
//# sourceMappingURL=create-index-decorator.js.map