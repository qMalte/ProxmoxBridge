import {Response} from "../app/models/Response";

export const ValidationResources = {
    EmptyLogin: new Response(
        'validation_failed_login',
        'Die Validierung des Logins ist fehlgeschalgen, es wird ein gültiger Benutzername oder eine E-Mail benötigt.',
        'Login validation failed, a valid username or email is required.',
        ['login']
    ),
    EmptyPassword: new Response(
        'validation_failed_password',
        'Die Validierung des Passworts für den Login ist fehlgeschalgen, es wird ein gültiges Passwort benötigt.',
        'The validation of the password for the login failed, a valid password is required.',
        ['password']
    ),
    MissingOtpToken: new Response(
        'validation_otp',
        'Die Validierung des OTP ist fehlgeschalgen.',
        'The validation of the OTP has failed.',
        ['token']
    ),
    MissingMailToResetPassword: new Response(
        'missing_mail_reset_password',
        'Zum Passwort-Reset wird eine gültige mit dem Account verknüpfte Mail benötigt.',
        'A valid mail associated with the account is required for password reset.',
        ['email']
    ),
    MissingUserWithGivenMail: new Response(
        'missing_user_reset_password',
        'Es wurde kein Account mit dieser E-Mail im System gefunden.',
        'No account with this email was found in the system.',
        []
    ),
    MissingDataPasswordReset: new Response(
        'missing_data_reset_password',
        'Es wurden nicht alle erforderlichen Daten übermittelt, um das neue Passwort zu setzen.',
        'Not all the required data has been submitted to set the new password.',
        ['email', 'code', 'passsword']
    ),
    MailFormat: new Response(
        'bad_mail_format',
        'Das Format der E-Mail konnte nicht validiert werden.',
        'The format of the email could not be validated.',
        ['email']
    ),
    MultipleMailFormat: new Response(
        'multiple_mail_use',
        'Die E-Mail wird bereits verwendet.',
        'The email is already in use.',
        ['email']
    ),
    UsernameFormat: new Response(
        'bad_username_format',
        'Das Format des Benutzernamens konnte nicht validiert werden.',
        'The format of the username could not be validated.',
        ['username']
    ),
    MultipleUsernameFormat: new Response(
        'multiple_username_use',
        'Der Benutzername wird bereits verwendet.',
        'The username is already in use.',
        ['username']
    ),
    SecurityCode: new Response(
        'bad_securityCode_format',
        'Das Format des Sicherheitscodes konnte nicht validiert werden.',
        'The format of the security code could not be validated.',
        ['code']
    ),
    RegisterData: new Response(
        'register_validation_failed',
        'Für die Registrierung werden die folgenden Parameter benötigt.',
        'The following parameters are required for registration.',
        ['email', 'username', 'password']
    ),
    OtpCodeFormat: new Response(
        'otp_code_format',
        'Das Format des OTP-Codes ist fehlerhaft.',
        'The format of the OTP code is incorrect.',
        ['otpCode']
    ),
    OtpEnableParams: new Response(
        'otp_enable_params',
        'Um die Zwei-Faktor-Authentifizierung zu aktivieren, wird das aktuelle Passwort und der aktuelle OTP benötigt.',
        'To enable two-factor authentication, the current password and OTP are required.',
        ['otpCode', 'password']
    ),
    GameServerControllerMissingServerId: new Response(
        'validation_error_serverId',
        'Um die Informationen eines bestimmten Servers zu erhalten, wird die eindeutige Server ID benötigt.',
        'To get the information of a particular server, the unique server ID is needed.',
        ['id']
    ),
    MissingDomainCreationInformation: new Response(
        'validation_error_domain_creation',
        'Um eine neue Domain anzulegen, wird ein gültiger Domainname und eine Serveradresse für einen SMTP-Server benötigt.',
        'To create a new domain, a valid domain name and server address for an SMTP server is required.',
        ['domain', 'smtpHost']
    ),
    DomainAlreadyExists: new Response(
        'validation_error_domain_already_exists',
        'Die Domain ist berets im System hinterlegt.',
        'The domain is already stored in the system.',
        []
    ),
    MailAddressNotProvided: new Response(
        'validation_error_mail_address_not_provided',
        'Um einen Authentifizierung-Schlüssel zu erstellen, wird eine gültige E-Mail-Adresse benötigt.',
        'To create an authentication key, a valid email address is required.',
        ['email']
    ),
    MailAddressInvalidFormat: new Response(
        'validation_error_mail_address_invalid_format',
        'Das Format der E-Mail-Adresse ist ungültig.',
        'The format of the email address is invalid.',
        ['email']
    ),
    MailAddressNotManaged: new Response(
        'validation_error_mail_address_not_managed',
        'Die E-Mail-Adresse wird nicht von diesem System verwaltet.',
        'The email address is not managed by this system.',
        ['email']
    ),
    MailIdNotProvided: new Response(
        'validation_error_mail_id_not_provided',
        'Um eine E-Mail zu erhalten, wird eine gültige Mail-ID benötigt.',
        'To receive an email, a valid mail ID is required.',
        ['email']
    ),
}
