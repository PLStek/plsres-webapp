"use client";

import { useAuth } from "@app/hooks/useAuth";
import Modal from "../Modal";
import { useEffect, useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
//TODO: revoir wording et style
const InvitationModal = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const invitationToken = searchParams.get("invitation");

    const { isVerified, isActionneur } = useAuth();
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
        invitationToken && (
            <Modal
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false);
                    router.replace(pathname);
                }}
            >
                {step === 1 && <Step1 />}
                {step === 2 && <Step2 invitationToken={invitationToken!} />}
                {step === 3 && <div>Step 3</div>}
            </Modal>
        )
    );
};

export default InvitationModal;
