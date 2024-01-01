import superagent from 'superagent';
import dotenv from "dotenv";
import {ProxmoxDomain} from "../models/Proxmox/Domain";
import {ProxmoxTransport} from "../models/Proxmox/Transport";
import * as process from "process";
import {ProxmoxSpamEntry} from "../models/Proxmox/SpamEntry";

dotenv.config();

export class ProxmoxService {

    private static readonly host: string = `https://${process.env.PROXMOX_HOST}:8006`;
    private static ticket: string;
    private static csrf: string;

    static async createTicket() {
        try {
            const req = await superagent
                .post(`${this.host}/api2/json/access/ticket`)
                .disableTLSCerts()
                .send({
                    username: process.env.PROXMOX_USER,
                    password: process.env.PROXMOX_PASS
                })
                .timeout(6000);

            if (req.status === 200) {
                this.ticket = req.body.data.ticket;
                this.csrf = req.body.data.CSRFPreventionToken;
                return true;
            }

            return false;
        } catch(e) {
            console.log(e);
            return false;
        }
    }

    static async getDomains(retry: boolean = true): Promise<ProxmoxDomain[]> {

        if (this.ticket == null) {
            await this.createTicket();
            if (retry) {
                return await this.getDomains(false);
            }
        }

        try {

            const cookie = `PMGAuthCookie=${this.ticket};  Path=/; Expires=Sat, 04 May 2024 14:42:19 GMT;`;

            const req = await superagent
                .get(`${this.host}/api2/json/config/domains`)
                .disableTLSCerts()
                .set('cookie', cookie)
                .timeout(6000);

            if (req.status === 200) {
                const list: ProxmoxDomain[] = [];
                for (const item of req.body.data) {
                    const domain = new ProxmoxDomain();
                    domain.domain = item.domain;
                    domain.comment = item.comment;
                    list.push(domain);
                }
                return list;
            } else if (req.status === 401) {
                await this.createTicket();
                if (retry) {
                    this.ticket = null;
                    return await this.getDomains(false);
                }
            }

            return [];
        } catch(e) {
            return [];
        }
    }

    static async addDomain(domain: ProxmoxDomain, retry: boolean = true): Promise<boolean> {

        if (this.ticket == null) {
            await this.createTicket();
            if (retry) {
                return await this.addDomain(domain, false);
            }
        }

        try {

            const cookie = `PMGAuthCookie=${this.ticket};  Path=/; Expires=Sat, 04 May 2024 14:42:19 GMT;`;

            const req = await superagent
                .post(`${this.host}/api2/json/config/domains`)
                .send(domain)
                .disableTLSCerts()
                .set('cookie', cookie)
                .set('CSRFPreventionToken', this.csrf)
                .timeout(6000);

            if (req.status === 200) {
                return true;
            } else if (req.status === 401) {
                await this.createTicket();
                if (retry) {
                    this.ticket = null;
                    return await this.addDomain(domain, false);
                }
            }

            return false;
        } catch(e) {
            return false;
        }
    }

    static async removeDomain(domain: ProxmoxDomain, retry: boolean = true): Promise<boolean> {

        if (this.ticket == null) {
            await this.createTicket();
            if (retry) {
                return await this.removeDomain(domain, false);
            }
        }

        try {

            const cookie = `PMGAuthCookie=${this.ticket};  Path=/; Expires=Sat, 04 May 2024 14:42:19 GMT;`;

            const req = await superagent
                .delete(`${this.host}/api2/json/config/domains/${domain.domain}`)
                .disableTLSCerts()
                .set('cookie', cookie)
                .set('CSRFPreventionToken', this.csrf)
                .timeout(6000);

            if (req.status === 200) {
                return true;
            } else if (req.status === 401) {
                await this.createTicket();
                if (retry) {
                    this.ticket = null;
                    return await this.removeDomain(domain, false);
                }
            }

            return false;
        } catch(e) {
            return false;
        }
    }

    static async addTransport(transport: ProxmoxTransport, retry: boolean = true): Promise<boolean> {

        if (this.ticket == null) {
            await this.createTicket();
            if (retry) {
                return await this.addTransport(transport, false);
            }
        }

        try {

            const cookie = `PMGAuthCookie=${this.ticket};  Path=/; Expires=Sat, 04 May 2024 14:42:19 GMT;`;

            const req = await superagent
                .post(`${this.host}/api2/json/config/transport`)
                .send(transport)
                .disableTLSCerts()
                .set('cookie', cookie)
                .set('CSRFPreventionToken', this.csrf)
                .timeout(6000);

            if (req.status === 200) {
                return true;
            } else if (req.status === 401) {
                await this.createTicket();
                if (retry) {
                    this.ticket = null;
                    return await this.addTransport(transport, false);
                }
            }

            return false;
        } catch(e) {
            return false;
        }
    }

    static async removeTransport(transport: ProxmoxTransport, retry: boolean = true): Promise<boolean> {

        if (this.ticket == null) {
            await this.createTicket();
            if (retry) {
                return await this.removeTransport(transport, false);
            }
        }

        try {

            const cookie = `PMGAuthCookie=${this.ticket};  Path=/; Expires=Sat, 04 May 2024 14:42:19 GMT;`;

            const req = await superagent
                .delete(`${this.host}/api2/json/config/transport/${transport.domain}`)
                .disableTLSCerts()
                .set('cookie', cookie)
                .set('CSRFPreventionToken', this.csrf)
                .timeout(6000);

            if (req.status === 200) {
                return true;
            } else if (req.status === 401) {
                await this.createTicket();
                if (retry) {
                    this.ticket = null;
                    return await this.removeTransport(transport, false);
                }
            }

            return false;
        } catch(e) {
            return false;
        }
    }

    static async getTransports(retry: boolean = true): Promise<ProxmoxTransport[]> {

        if (this.ticket == null) {
            await this.createTicket();
            if (retry) {
                return await this.getTransports(false);
            }
        }

        try {

            const cookie = `PMGAuthCookie=${this.ticket};  Path=/; Expires=Sat, 04 May 2024 14:42:19 GMT;`;

            const req = await superagent
                .get(`${this.host}/api2/json/config/transport`)
                .disableTLSCerts()
                .set('cookie', cookie)
                .timeout(6000);

            if (req.status === 200) {
                const list: ProxmoxTransport[] = [];
                for (const item of req.body.data) {
                    const transport = new ProxmoxTransport();
                    transport.port = item.port;
                    transport.host = item.host;
                    transport.use_mx = item.use_mx;
                    transport.protocol = item.protocol;
                    transport.domain = item.domain;
                    transport.comment = item.comment;
                    list.push(transport);
                }
                return list;
            } else if (req.status === 401) {
                await this.createTicket();
                if (retry) {
                    this.ticket = null;
                    return await this.getTransports(false);
                }
            }

            return [];
        } catch(e) {
            return [];
        }
    }

    static async getSpamQuarantaine(retry: boolean = true): Promise<ProxmoxSpamEntry[]> {

        if (this.ticket == null) {
            await this.createTicket();
            if (retry) {
                return await this.getSpamQuarantaine(false);
            }
        }

        try {

            const cookie = `PMGAuthCookie=${this.ticket};  Path=/; Expires=Sat, 04 May 2024 14:42:19 GMT;`;

            const req = await superagent
                .get(`${this.host}/api2/json/quarantine/spam`)
                .disableTLSCerts()
                .set('cookie', cookie)
                .timeout(6000);

            if (req.status === 200) {
                const list: ProxmoxSpamEntry[] = [];
                for (const item of req.body.data) {
                    const spamEntry = new ProxmoxSpamEntry();
                    spamEntry.envelope_sender = item.envelope_sender;
                    spamEntry.id = item.id;
                    spamEntry.from = item.from;
                    spamEntry.receiver = item.receiver;
                    spamEntry.time = item.time;
                    spamEntry.spamlevel = item.spamlevel;
                    spamEntry.subject = item.subject;
                    spamEntry.bytes = item.bytes;
                    list.push(spamEntry);
                }
                return list;
            } else if (req.status === 401) {
                await this.createTicket();
                if (retry) {
                    this.ticket = null;
                    return await this.getSpamQuarantaine(false);
                }
            }

            return [];
        } catch(e) {
            return [];
        }
    }

    static async getSpamQuarantaineByReceiver(receiver: string, retry: boolean = true): Promise<ProxmoxSpamEntry[]> {

        if (this.ticket == null) {
            await this.createTicket();
            if (retry) {
                return await this.getSpamQuarantaineByReceiver(receiver, false);
            }
        }

        try {

            const cookie = `PMGAuthCookie=${this.ticket};  Path=/; Expires=Sat, 04 May 2024 14:42:19 GMT;`;

            const req = await superagent
                .get(`${this.host}/api2/json/quarantine/spam?pmail=${receiver}`)
                .disableTLSCerts()
                .set('cookie', cookie)
                .timeout(6000);

            if (req.status === 200) {
                const list: ProxmoxSpamEntry[] = [];
                for (const item of req.body.data) {
                    const spamEntry = new ProxmoxSpamEntry();
                    spamEntry.envelope_sender = item.envelope_sender;
                    spamEntry.id = item.id;
                    spamEntry.from = item.from;
                    spamEntry.receiver = item.receiver;
                    spamEntry.time = item.time;
                    spamEntry.spamlevel = item.spamlevel;
                    spamEntry.subject = item.subject;
                    spamEntry.bytes = item.bytes;
                    list.push(spamEntry);
                }
                return list;
            } else if (req.status === 401) {
                await this.createTicket();
                if (retry) {
                    this.ticket = null;
                    return await this.getSpamQuarantaineByReceiver(receiver, false);
                }
            }

            return [];
        } catch(e) {
            console.log(e);
            return [];
        }
    }

    static async getMessageFromQuarantaineById(id: string, retry: boolean = true): Promise<string> {

        if (this.ticket == null) {
            await this.createTicket();
            if (retry) {
                return await this.getMessageFromQuarantaineById(id, false);
            }
        }

        try {

            const cookie = `PMGAuthCookie=${this.ticket};  Path=/; Expires=Sat, 04 May 2024 14:42:19 GMT;`;

            const req = await superagent
                .get(`${this.host}/api2/json/quarantine/download?mailid=${id}`)
                .disableTLSCerts()
                .set('cookie', cookie)
                .timeout(6000);

            if (req.status === 200) {
                return req.body;
            } else if (req.status === 401) {
                await this.createTicket();
                if (retry) {
                    this.ticket = null;
                    return await this.getMessageFromQuarantaineById(id, false);
                }
            }

            return null;
        } catch(e) {
            return null;
        }
    }

    static async executeQuarantaineActionById(id: string, action: QuarantaineAction, retry: boolean = true): Promise<boolean> {

        if (this.ticket == null) {
            await this.createTicket();
            if (retry) {
                return await this.executeQuarantaineActionById(id, action, false);
            }
        }

        try {

            const cookie = `PMGAuthCookie=${this.ticket};  Path=/; Expires=Sat, 04 May 2024 14:42:19 GMT;`;

            const req = await superagent
                .post(`${this.host}/api2/json/quarantine/content?id=${id}&action=${action}`)
                .disableTLSCerts()
                .set('cookie', cookie)
                .timeout(6000);

            if (req.status === 200) {
                return true;
            } else if (req.status === 401) {
                await this.createTicket();
                if (retry) {
                    this.ticket = null;
                    return await this.executeQuarantaineActionById(id, action, false);
                }
            }

            return false;
        } catch(e) {
            console.log(e);
            return false;
        }
    }

    static async getMailStats(retry: boolean = true): Promise<ProxmoxMailStatisticItem> {

        if (this.ticket == null) {
            await this.createTicket();
            if (retry) {
                return await this.getMailStats(false);
            }
        }

        try {

            const cookie = `PMGAuthCookie=${this.ticket};  Path=/; Expires=Sat, 04 May 2024 14:42:19 GMT;`;

            const req = await superagent
                .get(`${this.host}/api2/json/statistics/mail`)
                .disableTLSCerts()
                .set('cookie', cookie)
                .timeout(6000);

            if (req.status === 200) {
                return req.body;
            } else if (req.status === 401) {
                await this.createTicket();
                if (retry) {
                    this.ticket = null;
                    return await this.getMailStats(false);
                }
            }

            return null;
        } catch(e) {
            console.log(e);
            return null;
        }
    }

}

export enum QuarantaineAction {
    DELETE = 'delete',
    WHITE_LIST = 'whitelist',
    BLACK_LIST = 'blacklist',
    DELIVER = 'deliver',
}

export interface ProxmoxMailStatisticItem {
    data: {
        spamcount_out: number,
        count_in: number,
        count_out: number,
        glcount: number,
        viruscount_out: number,
        spfcount: number,
        spamcount_in: number,
        pregreet_rejects: number,
        viruscount_in: number,
        bounces_in: number,
        junk_out: number,
        rbl_rejects: number,
        count: number,
        junk_in: number,
        avptime: number,
        bounces_out: number,
        bytes_in: number,
        bytes_out: number
    }
}