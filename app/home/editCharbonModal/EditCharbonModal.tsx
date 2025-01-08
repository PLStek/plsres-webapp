"use client";

import CharbonForm from "../sidebar/charbonForm/CharbonForm";
import { useCharbonByIdQuery } from "@app/hooks/useCharbons";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { memo, useEffect } from "react";

const EditCharbonModal = ({
    charbonId,
    isOpen,
    onOpenChange,
}: {
    charbonId: number;
    isOpen: boolean;
    onOpenChange: () => void;
}) => {
    const [charbon, isLoading] = useCharbonByIdQuery(charbonId);
    useEffect(() => {
        if (!isLoading && !charbon && isOpen) {
            onOpenChange();
        }
    }, [isLoading, charbon, isOpen, onOpenChange]);

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
            <ModalContent>
                {(onClose) => (
                    <div>
                        <ModalHeader>Modifier le charbon</ModalHeader>
                        <ModalBody className="p-4">
                            {!isLoading ? (
                                <CharbonForm
                                    defaultCharbon={charbon}
                                    onClose={onClose}
                                />
                            ) : (
                                <div>Loading...</div>
                            )}
                        </ModalBody>
                    </div>
                )}
            </ModalContent>
        </Modal>
    );
};

export default memo(EditCharbonModal);
