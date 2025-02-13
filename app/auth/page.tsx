"use client";

import { CircularProgress } from "@heroui/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Auth = () => {
    const searchParams = useSearchParams();

    //TODO: voir si on peut enlever le useEffect
    useEffect(() => {
        const code = searchParams.get("code");

        if (code) {
            window.opener.postMessage({ code }, window.location.origin);
            window.close();
        } else {
            //TODO: handle
            window.close();
        }
    }, []);

    return <CircularProgress />;
};

export default Auth;
