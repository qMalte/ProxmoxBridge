import {AppDataSource} from "../DatabaseProvider";
import {Permission} from "../../app/models/Permission";

export class PermissionsSeeder {

    private permissionRepo = AppDataSource.getRepository(Permission);

    async run() {

        await this.createPermission('*', 'Administrator (All Privileges)');

        // Permission / User / Group - Management
        await this.createPermission('permissions', 'Rechteverwaltung');
        await this.createPermission('users', 'Benutzerverwaltung');
        await this.createPermission('groups', 'Gruppenverwaltung');
        await this.createPermission('teams', 'Teams-Verwaltung');
        await this.createPermission('settings', 'Verwaltung von Basis-Einstellungen');
        await this.createPermission('assets', 'Asset-Management');
        await this.createPermission('assets_signing', 'Review Assets');
        await this.createPermission('gameServer_manage', 'Asset-Management');

    }

    private async createPermission(identifier: string, description: string) {
        if (await this.permissionRepo.countBy({identifier}) == 0) {
            const permission = new Permission();
            permission.identifier = identifier;
            permission.description = description;
            await this.permissionRepo.save(permission);
        }
    }

}
