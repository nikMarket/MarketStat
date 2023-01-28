import { ReactElement, ReactNode, useCallback, useEffect, useState } from "react";
import useBoolean from "../../lib/hooks/useBoolean";
import { menuElements } from "./navigation";
import { useAuth } from "../../lib/hooks/useAuth";
import { useRouter } from "next/router";


const MenuElement = ({ id, isActive, setActive, ...props }) => {
    const { onLogout } = useAuth();
    const router = useRouter();
    return <li onClick={setActive} className={isActive ? "active" : ""}>
        <div className="title">
            <a href="#" className="link" onClick={() => {
                if (id === menuElements.length - 1) {
                    onLogout();
                    router.replace("/account/login").then(router.reload);
                }
                if (id === menuElements.length - 2) {
                    router.replace("/account").then(router.reload);
                }

            }
            }>
                {menuElements[id].icon}
                <span className="name">{menuElements[id].name}</span>
            </a>
        </div>
        <div className="submenu">
            <a href="#" className="link submenu-title">{menuElements[id].name}</a>
        </div>
    </li>
}

export const Sidebar = ({ activeMenuElementId, setActiveMenuElementId }) => {
    const isClose = useBoolean(true);
    const isFirstRender = useBoolean(true);


    useEffect(() => {
        isFirstRender.setFalse();
    }, [])

    const getSetActive = useCallback((id: number): () => void => {
        return () => {
            setActiveMenuElementId(id);
        };
    }, [setActiveMenuElementId]);

    const getIsActive = useCallback((id: number): boolean => {
        return activeMenuElementId === id;
    }, [activeMenuElementId]);

    return <div className={"sidebar " + (isClose.value ? "close" : "")}>
        <a href="#" className="logo-box" onClick={() => isClose.toggle()}>
            <div className="logotipe"><img src="/img/ms logo.png" height="50px"></img></div>
            <div className="logo-name">Market Stat</div>
        </a >
        <ul className="sidebar-list">
            {
                menuElements.map(info =>
                    <MenuElement
                        id={info.id}
                        isActive={getIsActive(info.id)}
                        setActive={getSetActive(info.id)}
                        key={info.id}
                    />
                )
            }
        </ul>
    </div >;
}