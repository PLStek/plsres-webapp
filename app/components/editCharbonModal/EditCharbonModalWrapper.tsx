"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useIsActionneur } from "@app/hooks/useAuth";
import EditCharbonModal from "./EditCharbonModal";

const EditCharbonModalWrapper = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [isActionneur] = useIsActionneur();

    const charbonId = searchParams.get("charbon");
    const charbonIdInt = charbonId ? parseInt(charbonId) : null;

    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        if (!charbonId) {
            return;
        }

        if (!isActionneur || !charbonIdInt || isNaN(charbonIdInt)) {
            router.replace(pathname);
            return;
        }

        setIsOpen(true);
    }, [charbonId, isActionneur, charbonIdInt, pathname, router]);

    if (!charbonId || !charbonIdInt || isNaN(charbonIdInt)) {
        return null;
    }

    return (
        charbonIdInt && (
            <EditCharbonModal
                charbonId={charbonIdInt}
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false);
                    router.replace(pathname);
                }}
            />
        )
    );
};

export default EditCharbonModalWrapper;
