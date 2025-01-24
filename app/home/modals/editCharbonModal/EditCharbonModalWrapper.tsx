"use client";

import { useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useIsActionneur } from "@app/hooks/useAuth";
import { useEditCharbonModal } from "./EditCharbonModal";

const EditCharbonModalWrapper = () => {
    const { onOpen, setCharbonId } = useEditCharbonModal();
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [isActionneur] = useIsActionneur();

    const charbonId = searchParams.get("charbon");
    const charbonIdInt = charbonId ? parseInt(charbonId) : null;

    useEffect(() => {
        if (!charbonId) {
            return;
        }

        if (!isActionneur || !charbonIdInt || isNaN(charbonIdInt)) {
            router.replace(pathname);
            return;
        }

        setCharbonId(charbonIdInt);
        onOpen();
    }, [
        charbonId,
        isActionneur,
        charbonIdInt,
        pathname,
        router,
        onOpen,
        setCharbonId,
    ]);

    if (!charbonId || !charbonIdInt || isNaN(charbonIdInt)) {
        return null;
    }
};

export default EditCharbonModalWrapper;
