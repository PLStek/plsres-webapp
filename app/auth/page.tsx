"use client";

import { CircularProgress } from "@heroui/react";
import { useEffect, use } from "react";

const AuthContent = ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const code = use(searchParams).code;
    useEffect(() => {
        if (code) {
            window.opener.postMessage({ code }, window.location.origin);
            window.close();
        } else {
            //TODO: handle
            window.close();
        }
    }, [code]);

    return <CircularProgress />;
};

export default AuthContent;
