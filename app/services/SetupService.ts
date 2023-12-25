import {SetupEntity} from "../models/SetupEntity";
import {AppDataSource} from "../../database/DatabaseProvider";

export class SetupService {

    static async GetEntity(identifier: string): Promise<SetupEntity> {
        const settingsRepo = AppDataSource.getRepository(SetupEntity);
        return await settingsRepo.findOneBy({identifier});
    }

    static async EnsureIfExists<T>(identifier: string, value: T): Promise<void> {
        const settingsRepo = AppDataSource.getRepository(SetupEntity);
        if (await settingsRepo.countBy({identifier}) == 0) {
            const setupEntity = new SetupEntity();
            setupEntity.identifier = identifier;
            if (typeof value == 'string') {
                setupEntity.stringValue = value;
            } else if (typeof value == 'number') {
                setupEntity.numericValue = value;
            } else if (typeof value == 'boolean') {
                setupEntity.boolValue = value;
            }
            await settingsRepo.save(setupEntity);
        }
    }

}
