"use client";

import React, { useState } from "react";
import Image from "next/image";
import charbonImage from "@images/charbon.svg";
import styles from "./WelcomeBanner.module.css";
import VerificationModal from "../VerificationModal";
import AdminModal from "../AdminModal";
import { useDisconnect, useIsAdmin, useIsVerified } from "@app/hooks/useAuth";

const WelcomeBanner = () => {
    const [disconnect] = useDisconnect();
    const [isVerified] = useIsVerified();
    const [isAdmin] = useIsAdmin();

    const [isVerificationModalOpen, setIsVerificationModalOpen] =
        useState(false);
    const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);



    return (
        <div className={styles.wrapper}>
            <div className="flex-1">
                <h1 className="text-5xl flex justify-center font-bold text-gray-800 mb-12">
                    Bienvenue dans la mine du PL$tek
                </h1>
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                    Notre mission ? T’aider à réussir tes UE !
                </h2>
                <p className="text-gray-700">
                    L’équipe du PL$tek est ravie de t’accueillir sur son nouveau
                    site: la mine ! Ici, tu retrouveras tous nos charbons,
                    accompagnés de leurs rediffusions et de leurs ressources,
                    telles que les corrections et les notes des actionneurs.
                </p>
            </div>
            <div className={styles.charbonImage}>
                <Image
                    src={charbonImage}
                    alt="Charbon PL$tek"
                    layout="responsive"
                    width={300}
                    height={300}
                    className="rounded-lg"
                />
            </div>
            {!isVerified && (
                <button onClick={() => setIsVerificationModalOpen(true)}>
                    Connect
                </button>
            )}
            {isVerified && (
                <button onClick={() => disconnect()}>Disconnect</button>
            )}
            {isAdmin && (
                <button onClick={() => setIsAdminModalOpen(true)}>Admin</button>
            )}

            <VerificationModal
                isOpen={isVerificationModalOpen}
                onClose={() => setIsVerificationModalOpen(false)}
            />
            <AdminModal
                isOpen={isAdminModalOpen}
                onClose={() => setIsAdminModalOpen(false)}
            />
        </div>
    );
};

export default WelcomeBanner;
