import cron from 'node-cron';
import {EntityRegistry} from "../../database/EntityRegistry";
import {DNSService} from "./DNSService";
import {ProxmoxService} from "./ProxmoxService";
import {ProxmoxDomain} from "../models/Proxmox/Domain";
import {ProxmoxTransport} from "../models/Proxmox/Transport";

export class DomainService {

    static init() {
        cron.schedule('* * * * *', async () => {

            const domains = await EntityRegistry.getInstance().Domain.find({
                order: {
                    lastCheck: 'DESC'
                },
                take: 1
            });

            if (domains != null && domains.length != null && domains.length > 0) {
                const domain = domains[0];

                const proxmoxDomain = new ProxmoxDomain();
                proxmoxDomain.domain = domain.name;
                proxmoxDomain.comment = domain.id.toString();

                const proxmoxTransport = new ProxmoxTransport();
                proxmoxTransport.domain = domain.name;
                proxmoxTransport.host = domain.smtpHost;
                proxmoxTransport.comment = domain.id.toString();

                const proxmoxDomains = await ProxmoxService.getDomains();
                const proxmoxTransports = await ProxmoxService.getTransports();

                domain.lastCheck = new Date();

                if (await DNSService.checkTxtRecord('smtp-inbound-net.' + domain.name, domain.verifyToken)
                    && await DNSService.checkMxRecord(domain.name, 'backup.smtp-inbound.net')) {
                    domain.isValid = true;
                    domain.checksFailed = 0;

                    if (!proxmoxDomains.find(x => x.domain === domain.name)) {
                        await ProxmoxService.addDomain(proxmoxDomain)
                    }

                    if (!proxmoxTransports.find(x => x.domain === domain.name)) {
                        await ProxmoxService.addTransport(proxmoxTransport);
                    }

                    await domain.save();

                } else {

                    domain.isValid = false;

                    if (proxmoxDomains.find(x => x.domain === domain.name)) {
                        await ProxmoxService.removeDomain(proxmoxDomain)
                    }

                    if (proxmoxTransports.find(x => x.domain === domain.name)) {
                        await ProxmoxService.removeTransport(proxmoxTransport);
                    }

                    await domain.save();

                    if (domain.checksFailed > 32) {
                        await domain.remove();
                    } else {
                        domain.checksFailed++;
                        await domain.save();
                    }

                }

            }

        });
    }

}
