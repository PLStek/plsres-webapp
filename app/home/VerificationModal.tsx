import { useConnect } from "@app/hooks/useAuth";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";

const VerificationModal = ({
    isOpen,
    onOpenChange,
}: {
    isOpen: boolean;
    onOpenChange: () => void;
}) => {
    const [connect, ,] = useConnect();

    return (
        //TODO: review html here
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <div>
                        <ModalHeader>Verification</ModalHeader>
                        <ModalBody>
                            <p>
                                <strong>
                                    Pourquoi devez-vous vous vérifier ?
                                </strong>
                                <br />
                                Certaines ressources du site sont réservés aux
                                étudiants de l{"'"}UTBM pour des raisons de
                                droits d{"'"}auteurs. Pour y accéder, nous
                                devons nous assurer que vous êtes bel et bien un
                                étudiant de l{"'"}UTBM en vérifiant que vous
                                êtes présent sur le pôle UTBM de discord.
                            </p>
                            <br />
                            <p>
                                <strong>Etape 1: connexion au pôle UTBM</strong>
                                <br />
                                Dans un premier temps, rejoignez le pôle UTBM de
                                discord en utilisant{" "}
                                <a
                                    onClick={onClose}
                                    className="underline cursor-pointer"
                                >
                                    cette invitation.
                                </a>
                                <br />
                                Vous aurez besoin de vérifier votre mail UTBM
                                afin de rejoindre le pôle.
                            </p>
                            <img src="assets/images/hub-verification.png" />
                            <p>
                                <strong>
                                    Etape 2: liaison du compte discord au site
                                </strong>
                                <br />
                                Ensuite, il vous faut lier votre compte discord
                                au site afin que nous puissions vérifier que
                                vous êtes membr/e du pôle UTBM.{" "}
                                <a
                                    onClick={() => connect(onClose)}
                                    className="underline cursor-pointer"
                                >
                                    Lier votre compte discord au site.
                                </a>
                                <br />
                            </p>
                        </ModalBody>
                    </div>
                )}
            </ModalContent>
        </Modal>
    );
};

export default VerificationModal;
