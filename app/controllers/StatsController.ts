import express from "express";
import {SystemResources} from "../../resources/SystemResources";
import {ProxmoxService} from "../services/ProxmoxService";

export class StatsController {

    async GetMailStats(req: express.Request, res: express.Response) {
        try {
            const stats = await ProxmoxService.getMailStats();
            return res.status(200).send(stats);
        } catch (e) {
            console.log(e);
            return res.status(500).send(SystemResources.ServerError);
        }
    }

}
