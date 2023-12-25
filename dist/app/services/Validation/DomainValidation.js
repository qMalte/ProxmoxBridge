"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainValidation = void 0;
const ValidationBase_1 = require("./core/ValidationBase");
const validator_1 = __importDefault(require("validator"));
class DomainValidation extends ValidationBase_1.ValidationBase {
    validate(domain) {
        this.resetErrors();
        if (domain.name == null || !validator_1.default.isFQDN(domain.name.toString()) || !domain.name.includes('.')) {
            this.addError('Der Domainname muss eine gültige Domain sein.');
        }
        if (domain.smtpHost == null || !validator_1.default.isFQDN(domain.smtpHost.toString()) || !domain.smtpHost.includes('.')) {
            this.addError('Die SMTP Serveradresse muss ein gültiger FQDN sein.');
        }
        return this.errors;
    }
    static getInstance() {
        if (this._Instance == null)
            this._Instance = new DomainValidation();
        return this._Instance;
    }
}
exports.DomainValidation = DomainValidation;
//# sourceMappingURL=DomainValidation.js.map