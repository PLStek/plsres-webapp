import { useAuth } from "@app/hooks/useAuth";
import Modal from "./Modal";

const VerificationModal = ({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) => {
    const { connect } = useAuth();

    const open = () => {
        const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
        const redirectUri = process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI;
        if (!clientId || !redirectUri) return;

        const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
            redirectUri
        )}&response_type=code&scope=identify%20guilds`;

        const authWindow = window.open(authUrl);

        const handleAuthMessage = async (event: MessageEvent) => {
            if (event.origin !== window.location.origin) return;

            const { code } = event.data;
            if (code) {
                window.removeEventListener("message", handleAuthMessage);
                authWindow?.close();
                await connect(code);
            }
        };

        window.addEventListener("message", handleAuthMessage);

        const checkPopupClosed = setInterval(() => {
            if (authWindow && authWindow.closed) {
                clearInterval(checkPopupClosed);
                window.removeEventListener("message", handleAuthMessage);
            }
        }, 1000);

        //TODO: case where the popup is never closed
    };

    return (
        //TODO: review html here
        <Modal isOpen={isOpen} onClose={onClose}>
            <div>
                <h4>Processus de vérification</h4>
                <br />
                <p>
                    <strong>Pourquoi devez-vous vous vérifier ?</strong>
                    <br />
                    Certaines ressources du site sont réservés aux étudiants de
                    l&aposUTBM pour des raisons de droits d&aposauteurs. Pour y
                    accéder, nous devons nous assurer que vous êtes bel et bien
                    un étudiant de l&aposUTBM en vérifiant que vous êtes présent
                    sur le pôle UTBM de discord.
                </p>
                <br />
                <p>
                    <strong>Etape 1: connexion au pôle UTBM</strong>
                    <br />
                    Dans un premier temps, rejoignez le pôle UTBM de discord en
                    utilisant{" "}
                    <a onClick={onClose} className="underline cursor-pointer">
                        cette invitation.
                    </a>
                    <br />
                    Vous aurez besoin de vérifier votre mail UTBM afin de
                    rejoindre le pôle.
                </p>
                <img src="assets/images/hub-verification.png" />
                <p>
                    <strong>Etape 2: liaison du compte discord au site</strong>
                    <br />
                    Ensuite, il vous faut lier votre compte discord au site afin
                    que nous puissions vérifier que vous êtes membr/e du pôle
                    UTBM.{" "}
                    <a
                        onClick={() => open()}
                        className="underline cursor-pointer"
                    >
                        Lier votre compte discord au site.
                    </a>
                    <br />
                </p>
            </div>
        </Modal>
    );
};

export default VerificationModal;
