"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestController = void 0;
const RSAService_1 = require("../services/RSAService");
class TestController {
    testDecryption(req, res) {
        if (req.body.test != null) {
            const output = RSAService_1.RSAService.decrypt(req.body.test);
            if (output !== null) {
                res.status(200).send({
                    encryptedValue: output
                });
                return;
            }
        }
        res.status(400).end();
    }
    testEncryptionPost(req, res) {
        const pubKey = req.body.ClientPubKey;
        if (pubKey == null) {
            return res.status(400).end();
        }
        const decryptedString = "Dies ist ein Klartext!";
        const encrypt = RSAService_1.RSAService.encrypt(decryptedString, pubKey);
        res.status(200).send(encrypt);
    }
}
exports.TestController = TestController;
//# sourceMappingURL=TestController.js.map