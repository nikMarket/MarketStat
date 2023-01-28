import { useAuth } from "../../../lib/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/router";

export const SectionTop = () => {
    const { user, isUserLoaded } = useAuth();
    const router = useRouter();
    return (
        <>
            <div className="toggle-sidebar">
                <i className='bx bx-menu' />
                <div className="text">Рабочая панель </div>
                <div />
            </div>

            <div className="accaunt">
                <div className="textname"><div onClick={() => router.replace("/account").then(router.reload)}>{user ? `${user.first_name} ${user.second_name}` : ""}</div></div>
                <div className="profileico">
                    <img src="/img/profile.svg" height="40px" onClick={() => router.replace("/account").then(router.reload)} />
                </div>
            </div>
        </>
    )
}