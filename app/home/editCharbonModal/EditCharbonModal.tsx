"use client";

import Modal from "../Modal";
import CharbonForm from "../sidebar/charbonForm/CharbonForm";
import { useCharbonByIdQuery } from "@app/hooks/useCharbons";
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
    const [charbon, isLoading, ] = useCharbonByIdQuery(charbonId);
    useEffect(() => {
        if (!isLoading && !charbon) {
            onClose();
        }
    }, [isLoading, charbon, onClose]);

    return (
        charbon && (
            <Modal isOpen={isOpen && !!charbon} onClose={onClose}>
                {!isLoading ? (
                    <CharbonForm defaultCharbon={charbon} onClose={onClose} />
                ) : (
                    <div>Loading...</div>
                )}
            </Modal>
        )
    );
};

export default EditCharbonModal;
