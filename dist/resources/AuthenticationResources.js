"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationResources = void 0;
const Response_1 = require("../app/models/Response");
exports.AuthenticationResources = {
    BadCredentials: new Response_1.Response('bad_login_credentials', 'Die Zugangsdaten sind fehlerhaft.', 'The access data is incorrect.', ['login', 'password']),
    BadOtp: new Response_1.Response('bad_otp_token', 'Die Zwei-Faktor-Authentifizierung ist fehlgeschalgen, bitte den OTP überprüfen.', 'The two-factor authentication has failed, please check the OTP.', ['token']),
    FailedPasswordReset: new Response_1.Response('failed_password_reset', 'Das neue Passwort konnte nicht zurückgesezt werden.', 'The new password could not be reset.', []),
    RegistrationDisabled: new Response_1.Response('disabled_register', 'Die Registrierung ist deaktiviert.', 'Registration is disabled.', []),
    PermissionDenied: new Response_1.Response('permission_denied', 'Die Berechtigungen dieses Accounts reichen für diese Aktion nicht aus.', 'The permissions of this account are not sufficient for this action.', []),
    AuthorizationCredentialsNotProvided: new Response_1.Response('authorization_credentials_not_provided', 'Die Zugangsdaten wurden nicht übermittelt.', 'The access data was not transmitted.', []),
    AuthorizationCredentialsInvalid: new Response_1.Response('authorization_credentials_invalid', 'Die Zugangsdaten sind ungültig.', 'The access data is invalid.', []),
};
//# sourceMappingURL=AuthenticationResources.js.map