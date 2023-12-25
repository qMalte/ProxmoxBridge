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

            return res.status(200).send(mail);

        } catch (e) {
            return res.status(500).send(SystemResources.ServerError);
        }
    }

}
