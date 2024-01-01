import express from "express";
import mailparser from "mailparser";
import {SystemResources} from "../../resources/SystemResources";
import {ValidationResources} from "../../resources/ValidationResources";
import bcrypt from "bcrypt";
import {EntityRegistry} from "../../database/EntityRegistry";
import {AuthenticationResources} from "../../resources/AuthenticationResources";
import {ProxmoxService, QuarantaineAction} from "../services/ProxmoxService";

export class SpamQuarantaineController {

    async GetSpamQuarantaine(req: express.Request, res: express.Response) {
        try {

            if (req.params.identifier == null || req.params.secret == null) {
                return res.status(401).send(AuthenticationResources.AuthorizationCredentialsNotProvided);
            }

            const authorization = await EntityRegistry.getInstance().Authentication.findOne({
                where: {
                    identifier: req.params.identifier
                }
            });

            if (authorization == null) {
                return res.status(401).send(AuthenticationResources.AuthorizationCredentialsInvalid);
            }

            if (await bcrypt.compare(req.params.secret, authorization.secret) === false) {
                return res.status(401).send(AuthenticationResources.AuthorizationCredentialsInvalid);
            }

            const quarantaine = await ProxmoxService.getSpamQuarantaineByReceiver(authorization.email);

            return res.status(200).send(quarantaine);

        } catch (e) {
            return res.status(500).send(SystemResources.ServerError);
        }
    }

    async GetSpamQuarantaineMessage(req: express.Request, res: express.Response) {
        try {

            if (req.params.mailId == null) {
                return res.status(400).send(ValidationResources.MailIdNotProvided);
            }

            if (req.params.identifier == null || req.params.secret == null) {
                return res.status(401).send(AuthenticationResources.AuthorizationCredentialsNotProvided);
            }

            const authorization = await EntityRegistry.getInstance().Authentication.findOne({
                where: {
                    identifier: req.params.identifier
                }
            });

            if (authorization == null) {
                return res.status(401).send(AuthenticationResources.AuthorizationCredentialsInvalid);
            }

            if (await bcrypt.compare(req.params.secret, authorization.secret) === false) {
                return res.status(401).send(AuthenticationResources.AuthorizationCredentialsInvalid);
            }

            const mail = await ProxmoxService.getMessageFromQuarantaineById(req.params.mailId);
            const parsedMail = await mailparser.simpleParser(mail);

            return res.status(200).send(parsedMail);

        } catch (e) {
            return res.status(500).send(SystemResources.ServerError);
        }
    }

    async PostPerformMessageAction(req: express.Request, res: express.Response) {
        try {

            if (req.body.mailId == null) {
                return res.status(400).send(ValidationResources.MailIdNotProvided);
            }

            if (req.body.action == null) {
                return res.status(400).send(ValidationResources.MailActionNotProvided);
            }

            if (req.body.identifier == null || req.body.secret == null) {
                return res.status(401).send(AuthenticationResources.AuthorizationCredentialsNotProvided);
            }

            const authorization = await EntityRegistry.getInstance().Authentication.findOne({
                where: {
                    identifier: req.body.identifier
                }
            });

            if (authorization == null) {
                return res.status(401).send(AuthenticationResources.AuthorizationCredentialsInvalid);
            }

            if (await bcrypt.compare(req.body.secret, authorization.secret) === false) {
                return res.status(401).send(AuthenticationResources.AuthorizationCredentialsInvalid);
            }

            const action = req.body.action;

            if (!(action === QuarantaineAction.DELETE
                || action === QuarantaineAction.BLACK_LIST
                || action === QuarantaineAction.WHITE_LIST
                || action === QuarantaineAction.DELIVER)) {
                return res.status(401).send(ValidationResources.MailActionValidateFailed);
            }

            const query = await ProxmoxService.executeQuarantaineActionById(req.body.mailId, req.body.action);

            return res.status(query ? 200 : 500).end();

        } catch (e) {
            return res.status(500).send(SystemResources.ServerError);
        }
    }

}
