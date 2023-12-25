import {Response} from "../app/models/Response";

export const SystemResources = {
    ServerError: new Response(
        'general_server_error',
        'Es ist ein Server Fehler aufgetreten, bitte später erneut versuchen oder den Support kontaktieren.',
        'A server error has occurred, please try again later or contact support.',
        []
    ),
}
