"use client";

import { useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEditCharbonDrawer } from "./EditCharbonDrawer";
import { useIsActionneur } from "@app/hooks/useAuth";

const EditCharbonDrawerWrapper = () => {
    const { onOpen } = useEditCharbonDrawer();
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const isActionneur = useIsActionneur();

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

        onOpen(charbonIdInt);
    }, [charbonId, isActionneur, charbonIdInt, pathname, router, onOpen]);

    if (!charbonId || !charbonIdInt || isNaN(charbonIdInt)) {
        return null;
    }
};

export default EditCharbonDrawerWrapper;
