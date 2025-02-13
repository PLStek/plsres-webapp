import { Tooltip } from "@heroui/react";
import { MouseEventHandler, ReactNode } from "react";

type IconProps = {
    onClick?: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    tooltipContent?: string;
    children: ReactNode;
};

const Icon = ({
    onClick,
    disabled = false,
    tooltipContent,
    children,
}: IconProps) => {
    return (
        <Tooltip content={tooltipContent} isDisabled={!tooltipContent} closeDelay={0}>
            <button
                type="button"
                className={
                    "h-5 w-5 text-gray-500 transition-transform duration-100 ease-in-out enabled:hover:scale-110 enabled:hover:text-gray-600 disabled:text-gray-400"
                }
                onClick={onClick}
                tabIndex={-1}
                disabled={disabled}
            >
                {children}
            </button>
        </Tooltip>
    );
};

export default Icon;
