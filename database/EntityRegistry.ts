import {AppDataSource} from "./DatabaseProvider";
import {BlacklistedIP} from "../app/models/BlacklistedIP";
import {FailedLogin} from "../app/models/FailedLogin";
import {Group} from "../app/models/Group";
import {Log} from "../app/models/Log";
import {MailChangeRequest} from "../app/models/MailChangeRequest";
import {PasswordResetLink} from "../app/models/PasswordResetLink";
import {Permission} from "../app/models/Permission";
import {PermissionAssignment} from "../app/models/PermissionAssignment";
import {Session} from "../app/models/Session";
import {SetupEntity} from "../app/models/SetupEntity";
import {User} from "../app/models/User";
import {Domain} from "../app/models/Domain";
import {Authentication} from "../app/models/Authentication";

export class EntityRegistry {

    private static _Instance: EntityRegistry;

    BlacklistedIP = AppDataSource.getRepository(BlacklistedIP);
    FailedLogin = AppDataSource.getRepository(FailedLogin);
    Group = AppDataSource.getRepository(Group);
    Log = AppDataSource.getRepository(Log);
    MailChangeRequest = AppDataSource.getRepository(MailChangeRequest);
    PasswordResetLink = AppDataSource.getRepository(PasswordResetLink);
    Permission = AppDataSource.getRepository(Permission);
    PermissionAssignment = AppDataSource.getRepository(PermissionAssignment);
    Session = AppDataSource.getRepository(Session);
    SetupEntity = AppDataSource.getRepository(SetupEntity);
    User = AppDataSource.getRepository(User);
    Domain = AppDataSource.getRepository(Domain);
    Authentication = AppDataSource.getRepository(Authentication);

    static getInstance() {
        if (this._Instance == null) this._Instance = new EntityRegistry();
        return this._Instance;
    }

}
