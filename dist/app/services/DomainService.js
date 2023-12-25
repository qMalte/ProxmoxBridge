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
exports.DomainService = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const EntityRegistry_1 = require("../../database/EntityRegistry");
const DNSService_1 = require("./DNSService");
const ProxmoxService_1 = require("./ProxmoxService");
const Domain_1 = require("../models/Proxmox/Domain");
const Transport_1 = require("../models/Proxmox/Transport");
class DomainService {
    static init() {
        node_cron_1.default.schedule('* * * * *', () => __awaiter(this, void 0, void 0, function* () {
            const domains = yield EntityRegistry_1.EntityRegistry.getInstance().Domain.find({
                order: {
                    lastCheck: 'DESC'
                },
                take: 1
            });
            if (domains != null && domains.length != null && domains.length > 0) {
                const domain = domains[0];
                const proxmoxDomain = new Domain_1.ProxmoxDomain();
                proxmoxDomain.domain = domain.name;
                proxmoxDomain.comment = domain.id.toString();
                const proxmoxTransport = new Transport_1.ProxmoxTransport();
                proxmoxTransport.domain = domain.name;
                proxmoxTransport.host = domain.smtpHost;
                proxmoxTransport.comment = domain.id.toString();
                const proxmoxDomains = yield ProxmoxService_1.ProxmoxService.getDomains();
                const proxmoxTransports = yield ProxmoxService_1.ProxmoxService.getTransports();
                domain.lastCheck = new Date();
                if ((yield DNSService_1.DNSService.checkTxtRecord('smtp-inbound-net.' + domain.name, domain.verifyToken))
                    && (yield DNSService_1.DNSService.checkMxRecord(domain.name, 'backup.smtp-inbound.net'))) {
                    domain.isValid = true;
                    domain.checksFailed = 0;
                    if (!proxmoxDomains.find(x => x.domain === domain.name)) {
                        yield ProxmoxService_1.ProxmoxService.addDomain(proxmoxDomain);
                    }
                    if (!proxmoxTransports.find(x => x.domain === domain.name)) {
                        yield ProxmoxService_1.ProxmoxService.addTransport(proxmoxTransport);
                    }
                    yield domain.save();
                }
                else {
                    domain.isValid = false;
                    if (proxmoxDomains.find(x => x.domain === domain.name)) {
                        yield ProxmoxService_1.ProxmoxService.removeDomain(proxmoxDomain);
                    }
                    if (proxmoxTransports.find(x => x.domain === domain.name)) {
                        yield ProxmoxService_1.ProxmoxService.removeTransport(proxmoxTransport);
                    }
                    yield domain.save();
                    if (domain.checksFailed > 32) {
                        yield domain.remove();
                    }
                    else {
                        domain.checksFailed++;
                        yield domain.save();
                    }
                }
            }
        }));
    }
}
exports.DomainService = DomainService;
//# sourceMappingURL=DomainService.js.map