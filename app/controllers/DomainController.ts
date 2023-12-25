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

export class DomainController {

    async GetStateOfDomain(req: express.Request, res: express.Response) {
        try {

            if (req.params.domain == null) {
                return res.status(400).send(ValidationResources.MissingDomainCreationInformation);
            }

            const domain = await EntityRegistry.getInstance().Domain.findOne({
                where: {
                    name: req.params.domain
                }
            });

            if (domain == null) {
                return res.status(404).end();
            }

            delete domain.authToken;

            return res.status(200).send({
                domain
            });

        } catch (e) {
            return res.status(500).send(SystemResources.ServerError);
        }
    }

    async PostCreateDomain(req: express.Request, res: express.Response) {
        try {

            if (req.body.domain == null || req.body.smtpHost == null) {
                return res.status(400).send(ValidationResources.MissingDomainCreationInformation);
            }

            const domain = new Domain();
            domain.name = req.body.domain;
            domain.smtpHost = req.body.smtpHost;

            const validationErrors = DomainValidation.getInstance().validate(domain);
            if (validationErrors.length > 0) {
                return res.status(400).send({
                    reason: 'validation_error',
                    errors: validationErrors
                });
            }

            if (await EntityRegistry.getInstance().Domain.count({
                where: {
                    name: req.body.domain
                }
            }) > 0) {
                return res.status(400).send(ValidationResources.DomainAlreadyExists);
            }

            domain.lastCheck = null;
            domain.verifyToken = StringHelper.Generate(32);

            const authToken = `${NumericHelper.Generate(4)}-${NumericHelper.Generate(4)}-${NumericHelper.Generate(4)}-${NumericHelper.Generate(4)}`;
            domain.authToken = await bcrypt.hash(authToken, 10);

            await domain.save();

            delete domain.authToken;

            return res.status(200).send({
                domain, authToken
            });

        } catch (e) {
            return res.status(500).send(SystemResources.ServerError);
        }
    }

}
