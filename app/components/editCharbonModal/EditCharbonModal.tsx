"use client";

import Modal from "../Modal";
import { useRouter, usePathname } from "next/navigation";
import CharbonForm from "../sidebar/charbonForm/CharbonForm";
import { useCharbonByIdQuery, useCharbonsQuery } from "@app/hooks/useCharbons";
import { useEffect } from "react";

const EditCharbonModal = ({
    charbonId,
    isOpen,
    onClose,
}: {
    charbonId: number;
    isOpen: boolean;
    onClose: () => void;
}) => {
    const [charbon, isLoading, error] = useCharbonByIdQuery(charbonId);

    useEffect(() => {
        if (!isLoading && !charbon) {
            onClose();
        }
    }, [isLoading, charbon, onClose]);

    console.log(isLoading);

    return (
        charbon && (
            <Modal isOpen={isOpen && !!charbon} onClose={onClose}>
                {!isLoading ? <CharbonForm /> : <div>Loading...</div>}
            </Modal>
        )
    );
};

export default EditCharbonModal;
