"use client";

import { useAuth } from "@app/hooks/useAuth";
import Modal from "../Modal";
import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCharbons } from "@app/hooks/useCharbons";
import { Charbon } from "@lib/models/charbon";
import CharbonForm from "../sidebar/charbonForm/CharbonForm";

const EditCharbonModal = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const { isActionneur } = useAuth();
    const { fetchCharbonById } = useCharbons();

    const [charbon, setCharbon] = useState<Charbon | undefined>(undefined);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const charbonId = searchParams.get("charbon");

    useEffect(() => {
        if (!charbonId || !isActionneur) {
            router.replace(pathname);
            return;
        }

        const charbonIdInt = parseInt(charbonId);
        if (isNaN(charbonIdInt)) {
            router.replace(pathname);
            return;
        }

        fetchCharbonById(charbonIdInt).then((c) => {
            if (c) {
                setCharbon(c);
                setIsOpen(true);
            } else {
                router.replace(pathname);
            }
        });
    }, [isActionneur, fetchCharbonById]);

    return (
        charbon && (
            <Modal
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false);
                    router.replace(pathname);
                }}
            >
                <CharbonForm />
            </Modal>
        )
    );
};

export default EditCharbonModal;
