import express from "express";
import {RSAService} from "../services/RSAService";

export class TestController {

    testDecryption(req: express.Request, res: express.Response) {
        if (req.body.test != null) {
            const output = RSAService.decrypt(req.body.test);
            if (output !== null) {
                res.status(200).send({
                    encryptedValue: output
                });
                return;
            }
        }
        res.status(400).end();
    }

    testEncryptionPost(req: express.Request, res: express.Response) {

        const pubKey = req.body.ClientPubKey;

        if (pubKey == null) {
            return res.status(400).end();
        }

        const decryptedString = "Dies ist ein Klartext!";

        const encrypt = RSAService.encrypt(decryptedString, pubKey);

        res.status(200).send(encrypt);
    }

}
