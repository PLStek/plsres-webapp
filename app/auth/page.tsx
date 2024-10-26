"use client"

import { useEffect } from "react";

const Auth = () => {
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            window.opener.postMessage({ code }, window.location.origin);
            window.close();
        } else {
            //TODO: handle
            window.close();
        }
    }, []);
    
    return <div>coucou</div>;
};

export default Auth;
