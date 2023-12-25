import express from "express";
import {RSAService} from "../services/RSAService";
import {SystemResources} from "../../resources/SystemResources";
import {ValidationResources} from "../../resources/ValidationResources";
import {DomainValidation} from "../services/Validation/DomainValidation";
import {Domain} from "../models/Domain";
import {StringHelper} from "../../helpers/StringHelper";
import {NumericHelper} from "../../helpers/NumericHelper";
import bcrypt from "bcrypt";
import {EntityRegistry} from "../../database/EntityRegistry";
import {AuthenticationResources} from "../../resources/AuthenticationResources";
import {ProxmoxService} from "../services/ProxmoxService";

export class StatsController {

    async GetMailStats(req: express.Request, res: express.Response) {
        try {
            const stats = await ProxmoxService.getMailStats();
            return res.status(200).send(stats);
        } catch (e) {
            return res.status(500).send(SystemResources.ServerError);
        }
    }

}
