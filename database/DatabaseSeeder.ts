import {UserSeeder} from "./seeds/UserSeeder";
import {PermissionsSeeder} from "./seeds/PermissionsSeeder";
import {SettingsSeeder} from "./seeds/SettingsSeeder";

export class DatabaseSeeder {

    static async run() {
        await new UserSeeder().run();
        await new PermissionsSeeder().run();
        await new SettingsSeeder().run();
    }

}
