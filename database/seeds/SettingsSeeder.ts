import {SetupService} from "../../app/services/SetupService";

export class SettingsSeeder {

    async run() {
        await SetupService.EnsureIfExists<boolean>('enableRegistration', true);
        await SetupService.EnsureIfExists<boolean>('userRequireValidMail', true);
        await SetupService.EnsureIfExists<number>('sessionTimeout', 60);
    }

}
