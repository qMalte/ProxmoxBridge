import {UserController} from "./UserController";
import {GroupController} from "./GroupController";
import {PermissionController} from "./PermissionController";
import {TestController} from "./TestController";
import {AuthController} from "./AuthController";
import {EncryptionController} from "./EncryptionController";
import {DomainController} from "./DomainController";
import {SpamQuarantaineController} from "./SpamQuarantaineController";
import {StatsController} from "./StatsController";

export const ControllerRegistry = {
    User: new UserController(),
    Group: new GroupController(),
    Permission: new PermissionController(),
    Test: new TestController(),
    Auth: new AuthController(),
    Encryption: new EncryptionController(),
    Domain: new DomainController(),
    SpamQuarantaine: new SpamQuarantaineController(),
    Stats: new StatsController(),
};
