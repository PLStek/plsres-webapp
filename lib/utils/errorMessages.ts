export enum ErrorMessages {
    DiscordUserNotInGuild = "Vous n'êtes pas dans le serveur requis",
    DiscordUserNotFound = "Cet utilisateur n'existe pas",

    NotConnected = "Vous n'êtes pas vérifié",
    ActionneurNotConnected = "Vous n'êtes pas connecté en tant qu'actionneur",
    UserNotActionneur = "Vous n'êtes pas un actionneur",
    UserNotAdmin = "Vous n'êtes pas un administrateur",
    InvalidToken = "Token d'authentification invalide", //TODO: mettre un message plus user friendly
    NoConnectionInitiated = "Aucune connexion n'a été initiée",
    DiscordConnectionExpired = "La connexion discord a expirée",

    InvalidInvite = "Invitation invalide",
    ExpiredInvite = "Invitation expirée",
    DuplicateInvite = "Invitation déjà existante",

    InvalidCode = "Code invalide",

    UnknownError = "Une erreur inconnue est survenue",
}
