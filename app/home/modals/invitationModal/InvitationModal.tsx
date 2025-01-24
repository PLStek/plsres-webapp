"use client";

import { useIsVerified, useIsActionneur } from "@app/hooks/useAuth";
import { useEffect, useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
//TODO: revoir wording et style
const InvitationModal = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const invitationToken = searchParams.get("invitation");

    const [isVerified] = useIsVerified();
    const [isActionneur] = useIsActionneur();
    const [isOpen, setIsOpen] = useState<boolean>(!!invitationToken);
    const [step, setStep] = useState<1 | 2 | 3>(isVerified ? 2 : 1);

    useEffect(() => {
        if (isActionneur) {
            setStep(3);
        }
        if (isVerified && step === 1) {
            setStep(2);
        }
    }, [isVerified, isActionneur, step]);

    return (
        //TODO: review html here
        <Modal
            isOpen={isOpen}
            onClose={() => {
                setIsOpen(false);
                router.replace(pathname);
            }}
        >
            <ModalContent>
                <ModalHeader>Création du compte actionneur</ModalHeader>
                <ModalBody>
                    {step === 1 && <Step1 />}
                    {step === 2 && <Step2 invitationToken={invitationToken!} />}
                    {step === 3 && <div>Step 3</div>}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default InvitationModal;
