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
exports.SpamQuarantaineController = void 0;
const mailparser_1 = __importDefault(require("mailparser"));
const SystemResources_1 = require("../../resources/SystemResources");
const ValidationResources_1 = require("../../resources/ValidationResources");
const bcrypt_1 = __importDefault(require("bcrypt"));
const EntityRegistry_1 = require("../../database/EntityRegistry");
const AuthenticationResources_1 = require("../../resources/AuthenticationResources");
const ProxmoxService_1 = require("../services/ProxmoxService");
class SpamQuarantaineController {
    GetSpamQuarantaine(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.params.identifier == null || req.params.secret == null) {
                    return res.status(401).send(AuthenticationResources_1.AuthenticationResources.AuthorizationCredentialsNotProvided);
                }
                const authorization = yield EntityRegistry_1.EntityRegistry.getInstance().Authentication.findOne({
                    where: {
                        identifier: req.params.identifier
                    }
                });
                if (authorization == null) {
                    return res.status(401).send(AuthenticationResources_1.AuthenticationResources.AuthorizationCredentialsInvalid);
                }
                if ((yield bcrypt_1.default.compare(req.params.secret, authorization.secret)) === false) {
                    return res.status(401).send(AuthenticationResources_1.AuthenticationResources.AuthorizationCredentialsInvalid);
                }
                const quarantaine = yield ProxmoxService_1.ProxmoxService.getSpamQuarantaineByReceiver(authorization.email);
                return res.status(200).send(quarantaine);
            }
            catch (e) {
                return res.status(500).send(SystemResources_1.SystemResources.ServerError);
            }
        });
    }
    GetSpamQuarantaineMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.params.mailId == null) {
                    return res.status(400).send(ValidationResources_1.ValidationResources.MailIdNotProvided);
                }
                if (req.params.identifier == null || req.params.secret == null) {
                    return res.status(401).send(AuthenticationResources_1.AuthenticationResources.AuthorizationCredentialsNotProvided);
                }
                const authorization = yield EntityRegistry_1.EntityRegistry.getInstance().Authentication.findOne({
                    where: {
                        identifier: req.params.identifier
                    }
                });
                if (authorization == null) {
                    return res.status(401).send(AuthenticationResources_1.AuthenticationResources.AuthorizationCredentialsInvalid);
                }
                if ((yield bcrypt_1.default.compare(req.params.secret, authorization.secret)) === false) {
                    return res.status(401).send(AuthenticationResources_1.AuthenticationResources.AuthorizationCredentialsInvalid);
                }
                const mail = yield ProxmoxService_1.ProxmoxService.getMessageFromQuarantaineById(req.params.mailId);
                const parsedMail = yield mailparser_1.default.simpleParser(mail);
                return res.status(200).send(parsedMail);
            }
            catch (e) {
                return res.status(500).send(SystemResources_1.SystemResources.ServerError);
            }
        });
    }
    PostPerformMessageAction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.body.mailId == null) {
                    return res.status(400).send(ValidationResources_1.ValidationResources.MailIdNotProvided);
                }
                if (req.body.action == null) {
                    return res.status(400).send(ValidationResources_1.ValidationResources.MailActionNotProvided);
                }
                if (req.body.identifier == null || req.body.secret == null) {
                    return res.status(401).send(AuthenticationResources_1.AuthenticationResources.AuthorizationCredentialsNotProvided);
                }
                const authorization = yield EntityRegistry_1.EntityRegistry.getInstance().Authentication.findOne({
                    where: {
                        identifier: req.body.identifier
                    }
                });
                if (authorization == null) {
                    return res.status(401).send(AuthenticationResources_1.AuthenticationResources.AuthorizationCredentialsInvalid);
                }
                if ((yield bcrypt_1.default.compare(req.body.secret, authorization.secret)) === false) {
                    return res.status(401).send(AuthenticationResources_1.AuthenticationResources.AuthorizationCredentialsInvalid);
                }
                const action = req.body.action;
                if (!(action === ProxmoxService_1.QuarantaineAction.DELETE
                    || action === ProxmoxService_1.QuarantaineAction.BLACK_LIST
                    || action === ProxmoxService_1.QuarantaineAction.WHITE_LIST
                    || action === ProxmoxService_1.QuarantaineAction.DELIVER)) {
                    return res.status(401).send(ValidationResources_1.ValidationResources.MailActionValidateFailed);
                }
                const query = yield ProxmoxService_1.ProxmoxService.executeQuarantaineActionById(req.body.mailId, req.body.action);
                return res.status(query ? 200 : 500).end();
            }
            catch (e) {
                return res.status(500).send(SystemResources_1.SystemResources.ServerError);
            }
        });
    }
}
exports.SpamQuarantaineController = SpamQuarantaineController;
//# sourceMappingURL=SpamQuarantaineController.js.map