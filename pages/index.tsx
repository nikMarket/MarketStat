import {Sidebar} from "../components/sidebar/Sidebar";
import {useEffect, useState} from "react";
import {menuElements} from "../components/sidebar/navigation";
import {useRouter} from "next/router";
import {useAuth} from "../lib/hooks/useAuth";

export default function Home() {
    const auth = useAuth();
    const router = useRouter();
    useEffect(() => {
        if (router.isReady && auth.isUserLoaded && !auth.isSigned && auth.authToken === "") router.replace("/account/login").then(router.reload);
    }, [auth.isSigned, auth.isUserLoaded, router.isReady]);
    const [activeMenuElementId, setActiveMenuElementId] = useState<number>(0);
    return (
        <>
            <Sidebar activeMenuElementId={activeMenuElementId} setActiveMenuElementId={setActiveMenuElementId}/>
            {menuElements[activeMenuElementId].content}
        </>
    )
}
