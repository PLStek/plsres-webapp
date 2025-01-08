"use client";

import React from "react";
import Image from "next/image";
import charbonImage from "@images/charbon.svg";
import VerificationModal from "../VerificationModal";
import AdminModal from "../AdminModal";
import { useDisconnect, useIsAdmin, useIsVerified } from "@app/hooks/useAuth";
import { Card, useDisclosure } from "@nextui-org/react";

const WelcomeBanner = () => {
    const [disconnect] = useDisconnect();
    const [isVerified] = useIsVerified();
    const [isAdmin] = useIsAdmin();

    const {
        isOpen: isVerificationModalOpen,
        onOpen: onVerificationModalOpen,
        onOpenChange: onVerificationModalOpenChange,
    } = useDisclosure();

    const {
        isOpen: isAdminModalOpen,
        onOpen: onAdminModalOpen,
        onOpenChange: onAdminModalOpenChange,
    } = useDisclosure();

    return (
        <Card className="relative p-12 min-h-[500px] bg-[#fbfbfb]" shadow="sm">
            <div className="flex-1">
                <h1 className="text-5xl flex justify-center font-bold text-gray-800 mb-12">
                    Bienvenue dans la mine du PL$tek
                </h1>
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                    Notre mission ? T’aider à réussir tes UE !
                </h2>
                <p className="text-gray-700 md:mr-[250px] lg:mr-[400px]">
                    L’équipe du PL$tek est ravie de t’accueillir sur son nouveau
                    site: la mine ! Ici, tu retrouveras tous nos charbons,
                    accompagnés de leurs rediffusions et de leurs ressources,
                    telles que les corrections et les notes des actionneurs.
                </p>
            </div>
            <div className="hidden md:block absolute bottom-0 right-0 w-[500px] h-[500px] mb-[-150px] mr-[-125px] lg:w-[600px] lg:h-[600px] lg:mb-[-170px] lg:mr-[-150px] rotate-[-40deg]">
                <Image
                    src={charbonImage}
                    alt="Charbon PL$tek"
                    fill
                    className="drop-shadow-[2px_2px_5px_rgba(0,0,0,0.3)]"
                />
            </div>
            {!isVerified && (
                <button onClick={onVerificationModalOpen}>
                    Connect
                </button>
            )}
            {isVerified && (
                <button onClick={() => disconnect()}>Disconnect</button>
            )}
            {isAdmin && <button onClick={onAdminModalOpen}>Admin</button>}

            <VerificationModal
                isOpen={isVerificationModalOpen}
                onOpenChange={onVerificationModalOpenChange}
            />
            <AdminModal
                isOpen={isAdminModalOpen}
                onOpenChange={onAdminModalOpenChange}
            />
        </Card>
    );
};

export default WelcomeBanner;
