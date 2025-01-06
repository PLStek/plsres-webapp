"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Modal = ({
    children,
    isOpen,
    className = "",
    onClose,
}: {
    children: React.ReactNode;
    isOpen: boolean;
    className?: string;
    onClose: () => void;
}) => {
    const [showContent, setShowContent] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [isMouseDownInside, setIsMouseDownInside] = useState(false);

    const handleClose = useCallback(() => {
        setShowContent(false);
        setTimeout(onClose, 200);
    }, [onClose]);

    useEffect(() => {
        setIsMounted(true);

        if (isOpen) {
            setShowContent(true);
        } else {
            setShowContent(false);
        }
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                handleClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, handleClose]);

    if (!isMounted || (!isOpen && !showContent)) return null;

    return createPortal(
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-xs transition-opacity duration-200 ${
                showContent ? "opacity-100" : "opacity-0"
            }`}
            onMouseDown={() => setIsMouseDownInside(false)}
            onMouseUp={() => {
                if (!isMouseDownInside) handleClose();
            }}
        >
            <div
                className={
                    className +
                    ` relative w-full max-w-lg p-4  rounded-lg shadow-lg transform transition-all duration-200 ${
                        showContent
                            ? "scale-100 opacity-100"
                            : "scale-95 opacity-0"
                    } ` 
                }
                onMouseDown={(e) => {
                    e.stopPropagation();
                    setIsMouseDownInside(true);
                }}
                onMouseUp={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                    onClick={handleClose}
                >
                    ×
                </button>
                {children}
            </div>
        </div>,
        document.body
    );
};

export default Modal;
