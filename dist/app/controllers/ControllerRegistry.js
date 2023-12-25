"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerRegistry = void 0;
const UserController_1 = require("./UserController");
const GroupController_1 = require("./GroupController");
const PermissionController_1 = require("./PermissionController");
const TestController_1 = require("./TestController");
const AuthController_1 = require("./AuthController");
const EncryptionController_1 = require("./EncryptionController");
const DomainController_1 = require("./DomainController");
const SpamQuarantaineController_1 = require("./SpamQuarantaineController");
exports.ControllerRegistry = {
    User: new UserController_1.UserController(),
    Group: new GroupController_1.GroupController(),
    Permission: new PermissionController_1.PermissionController(),
    Test: new TestController_1.TestController(),
    Auth: new AuthController_1.AuthController(),
    Encryption: new EncryptionController_1.EncryptionController(),
    Domain: new DomainController_1.DomainController(),
    SpamQuarantaine: new SpamQuarantaineController_1.SpamQuarantaineController(),
};
//# sourceMappingURL=ControllerRegistry.js.map