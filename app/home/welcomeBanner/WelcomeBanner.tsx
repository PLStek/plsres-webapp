"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import charbonImage from "@images/charbon.svg";
import { useVerificationModal } from "../modals/VerificationModal";
import { useAdminDrawer } from "../modals/AdminDrawer";
import {
    useConnect,
    useDisconnect,
    useIsActionneurAuthentified,
    useIsAdmin,
    useIsVerified,
} from "@app/hooks/useAuth";
import { Button, Card } from "@heroui/react";
import { useActionneurConnectionModal } from "../modals/ActionneurConnectionModal";

const WelcomeBanner = () => {
    const [connect, authState] = useConnect();
    const [disconnect] = useDisconnect();
    const [isVerified] = useIsVerified();
    const [isAdmin] = useIsAdmin();
    const [isActionneurAuthentified] = useIsActionneurAuthentified();

    const { onOpen: onVerificationModalOpen, setDiscordId } = useVerificationModal();
    const { onOpen: onAdminDrawerOpen } = useAdminDrawer();
    const { onOpen: onActionneurConnectionModalOpen } =
        useActionneurConnectionModal();

    useEffect(() => {
        if (authState && !authState.isInGuild) {
            setDiscordId(authState.discordId);
            onVerificationModalOpen();
        }
    }, [setDiscordId, authState, onVerificationModalOpen]);

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
            <div>
                {!isVerified && (
                    <Button onPress={() => connect()}>Connexion</Button>
                )}
                {isVerified && (
                    <Button onPress={() => disconnect()}>Déconnexion</Button>
                )}
                {isAdmin && (
                    <Button
                        onPress={() => {
                            if (isActionneurAuthentified) {
                                onAdminDrawerOpen();
                            } else {
                                onActionneurConnectionModalOpen();
                            }
                        }}
                    >
                        Espace admin
                    </Button>
                )}
            </div>
        </Card>
    );
};

export default WelcomeBanner;
