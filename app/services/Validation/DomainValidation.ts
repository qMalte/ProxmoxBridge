import {ValidationBase} from "./core/ValidationBase";
import {IValidation} from "./core/IValidation";
import {Domain} from "../../models/Domain";
import {ValidationError} from "./core/ValidationError";
import validator from "validator";

export class DomainValidation extends ValidationBase implements IValidation {

    private static _Instance: DomainValidation;

    validate(domain: Domain): ValidationError[] {
        this.resetErrors();

        if (domain.name == null || !validator.isFQDN(domain.name.toString()) || !domain.name.includes('.')) {
            this.addError('Der Domainname muss eine gültige Domain sein.');
        }

        if (domain.smtpHost == null || !validator.isFQDN(domain.smtpHost.toString()) || !domain.smtpHost.includes('.')) {
            this.addError('Die SMTP Serveradresse muss ein gültiger FQDN sein.');
        }

        return this.errors;
    }

    static getInstance() {
        if (this._Instance == null) this._Instance = new DomainValidation();
        return this._Instance;
    }

}
