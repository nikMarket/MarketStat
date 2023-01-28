import { useAuth } from "../../lib/hooks/useAuth";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";


export const Account = () => {
    const auth = useAuth();
    const router = useRouter();
    useEffect(() => {
        if (router.isReady && auth.isUserLoaded && !auth.isSigned && auth.authToken === "")
            router.replace("/account/login").then(router.reload);
    }, [auth.isSigned, auth.isUserLoaded, router.isReady]);

    const phoneRef = useRef(null);
    const companyNameRef = useRef(null);
    const INNRef = useRef(null);
    const paymentAccountRef = useRef(null);
    const bankIdRef = useRef(null);

    const [userData, setUserData] = useState({});
    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [email, setEmail] = useState("");
    const [defaultUserInfo, setDefaultUserInfo] = useState({});

    const safeUserInfo = useCallback(() => {
        const data = {
            phone_number: phoneRef.current.value,
            company_name: companyNameRef.current.value,
            INN: INNRef.current.value,
            payment_account: paymentAccountRef.current.value,
            bank_id: bankIdRef.current.value,
        };
        auth.setUserInfo(data);
        //setDefaultUserInfo(newInfo);
    }, [auth, phoneRef, companyNameRef, INNRef, paymentAccountRef, bankIdRef]);

    useEffect(() => {
        if (!auth.isSigned) return;
        setFirstName(auth.user.first_name);
        setSecondName(auth.user.second_name);
        setEmail(auth.user.email);
        auth.getUserInfo().then(info => {
            console.log(info)
            setDefaultUserInfo(info);
        })
    }, [auth.isSigned]);

    return (
        <section className="home">
            <div className="toggle-sidebar">

                <div></div>
            </div>

            <div className="logotipe" onClick={() => router.replace("/").then(router.reload)}>
                <img src="/img/MS Logo.png" alt="logotipe" height="50px" />
            </div>

            <div className="username">
                <div className="usernametext">Ваше имя</div>
                <input type="text" placeholder="Имя" defaultValue={firstName} disabled />
            </div>
            <div className="usersecondname">
                <div className="usersecondnametext">Ваша Фамилия</div>
                <input type="text" placeholder="Фамилия" defaultValue={secondName} disabled />
            </div>

            <div className="userphone">
                <div className="userphonetext">Номер телефона</div>
                <input type="text" placeholder="Телефон" defaultValue={defaultUserInfo.phone_number} ref={phoneRef} />
            </div>

            <div className="usermail">
                <div className="usermailtext">Электронная почта</div>
                <input type="text" placeholder="Электронная почта" defaultValue={email} disabled />
            </div>

            <div className="usercompany">
                <div className="usercompanytext">Наименование организации</div>
                <input type="text" placeholder="Наименование организации"
                    defaultValue={defaultUserInfo.company_name} ref={companyNameRef} />
            </div>

            <div className="userbank">
                <div className="userbanktext">Номер счета</div>
                <input type="text" placeholder="Номер счета"
                    defaultValue={defaultUserInfo.payment_account} ref={paymentAccountRef} />
            </div>

            <div className="userinn">
                <div className="userinntext">ИНН организации</div>
                <input type="text" placeholder="ИНН организации"
                    defaultValue={defaultUserInfo.INN} ref={INNRef} />
            </div>

            <div className="userbik">
                <div className="userbiktext">БИК Банка</div>
                <input type="text" placeholder="БИК Банка"
                    defaultValue={defaultUserInfo.bank_id} ref={bankIdRef} />
            </div>

            <div className="save" onClick={() => safeUserInfo()}></div>

            <div className="save">
                <div onClick={() => safeUserInfo()}><img src="/img/save card.svg" height="60px" /></div>
            </div>


            <div className="work">
                <div onClick={() => router.replace("/").then(router.reload)}><img src="/img/backwork.svg" height="60px" /></div>
            </div>



            <div className="accaunt">
                <div className="textname">{auth.user ? `${auth.user.first_name} ${auth.user.second_name}` : ""}</div>
                <div className="accauntimage">
                    <img src="/img/profile.svg" height="40px" />
                </div>
            </div>

        </section>

    )
}