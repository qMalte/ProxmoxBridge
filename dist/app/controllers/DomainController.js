"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainController = void 0;
const SystemResources_1 = require("../../resources/SystemResources");
const ValidationResources_1 = require("../../resources/ValidationResources");
const DomainValidation_1 = require("../services/Validation/DomainValidation");
const Domain_1 = require("../models/Domain");
const StringHelper_1 = require("../../helpers/StringHelper");
const NumericHelper_1 = require("../../helpers/NumericHelper");
const bcrypt_1 = __importDefault(require("bcrypt"));
const EntityRegistry_1 = require("../../database/EntityRegistry");
class DomainController {
    GetStateOfDomain(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.params.domain == null) {
                    return res.status(400).send(ValidationResources_1.ValidationResources.MissingDomainCreationInformation);
                }
                const domain = yield EntityRegistry_1.EntityRegistry.getInstance().Domain.findOne({
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
            }
            catch (e) {
                return res.status(500).send(SystemResources_1.SystemResources.ServerError);
            }
        });
    }
    PostCreateDomain(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.body.domain == null || req.body.smtpHost == null) {
                    return res.status(400).send(ValidationResources_1.ValidationResources.MissingDomainCreationInformation);
                }
                const domain = new Domain_1.Domain();
                domain.name = req.body.domain;
                domain.smtpHost = req.body.smtpHost;
                const validationErrors = DomainValidation_1.DomainValidation.getInstance().validate(domain);
                if (validationErrors.length > 0) {
                    return res.status(400).send({
                        reason: 'validation_error',
                        errors: validationErrors
                    });
                }
                if ((yield EntityRegistry_1.EntityRegistry.getInstance().Domain.count({
                    where: {
                        name: req.body.domain
                    }
                })) > 0) {
                    return res.status(400).send(ValidationResources_1.ValidationResources.DomainAlreadyExists);
                }
                domain.lastCheck = null;
                domain.verifyToken = StringHelper_1.StringHelper.Generate(32);
                const authToken = `${NumericHelper_1.NumericHelper.Generate(4)}-${NumericHelper_1.NumericHelper.Generate(4)}-${NumericHelper_1.NumericHelper.Generate(4)}-${NumericHelper_1.NumericHelper.Generate(4)}`;
                domain.authToken = yield bcrypt_1.default.hash(authToken, 10);
                yield domain.save();
                delete domain.authToken;
                return res.status(200).send({
                    domain, authToken
                });
            }
            catch (e) {
                return res.status(500).send(SystemResources_1.SystemResources.ServerError);
            }
        });
    }
}
exports.DomainController = DomainController;
//# sourceMappingURL=DomainController.js.map