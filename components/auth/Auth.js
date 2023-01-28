import { useCallback, useEffect, useRef } from "react";
import { useAuth } from "../../lib/hooks/useAuth";
import { useRouter } from "next/router";

export const Auth = () => {

    const loginBtnRef = useRef(null);
    const signupBtnRef = useRef(null);

    const loginEmailRef = useRef(null);
    const loginPasswordRef = useRef(null);

    const signupEmailRef = useRef(null);
    const signupFirstNameRef = useRef(null);
    const signupPasswordRef = useRef(null);
    const signupSecondNameRef = useRef(null);

    useEffect(() => {
        const sign_in_btn = document.querySelector("#sign-in-btn");
        const sign_up_btn = document.querySelector("#sign-up-btn");
        const container = document.querySelector(".container");
        const sign_in_btn2 = document.querySelector("#sign-in-btn2");
        const sign_up_btn2 = document.querySelector("#sign-up-btn2");

        sign_up_btn.addEventListener("click", () => {
            container.classList.add("sign-up-mode");
        });

        sign_in_btn.addEventListener("click", () => {
            container.classList.remove("sign-up-mode");
        });

        sign_up_btn2.addEventListener("click", () => {
            container.classList.add("sign-up-mode2");
        });
        sign_in_btn2.addEventListener("click", () => {
            container.classList.remove("sign-up-mode2");
        });
    });

    const auth = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (auth.isSigned && router.isReady) {
            router.replace("/").then(router.reload);
        }
    }, [auth.isSigned, router.isReady, auth.authToken])

    const onLoginBtnClick = useCallback(async () => {
        const email = loginEmailRef.current.value;
        const password = loginPasswordRef.current.value;
        await auth.onLogin(email, password)
    }, []);

    const onSignupBtnClick = useCallback(async () => {
        const email = signupEmailRef.current.value;
        const password = signupPasswordRef.current.value;
        const firstName = signupFirstNameRef.current.value;
        const secondName = signupSecondNameRef.current.value;
        await auth.onSignup(firstName, secondName, email, password);
    }, [])

    return (
        <div className="container">
            <div className="signin-signup">
                <form action="" className="sign-in-form">
                    <h2 className="title">Вход в приложение</h2>
                    <div className="input-field">
                        <i className="fas fa-user" />
                        <input type="text" placeholder="Email" ref={loginEmailRef} />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-lock" />
                        <input type="password" placeholder="Пароль" ref={loginPasswordRef} />
                    </div>
                    <input type="button" value="Войти" className="btn" ref={loginBtnRef} onClick={async () => { await onLoginBtnClick(); }} />
                    <p className="social-text" />
                    <div className="social-media" />
                    <p className="account-text">Dont have an account? <a href="#" id="sign-up-btn2">Sign up</a></p>
                </form>
                <form action="" className="sign-up-form">
                    <h2 className="title">Быстрая регистрация</h2>
                    <div className="input-field">
                        <i className="fas fa-user" />
                        <input type="text" placeholder="Имя" ref={signupFirstNameRef} />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-user" />
                        <input type="text" placeholder="Фамилия" ref={signupSecondNameRef} />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-envelope" />
                        <input type="text" placeholder="Email" ref={signupEmailRef} />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-lock" />
                        <input type="password" placeholder="Пароль" ref={signupPasswordRef} />
                    </div>
                    <input type="button" value="Регистрация" className="btn" ref={signupBtnRef} onClick={async () => { await onSignupBtnClick(); }} />
                    <p className="social-text" />
                    <div className="social-media">
                    </div>
                    <p className="account-text">Already have an account? <a href="#" id="sign-in-btn2">Sign in</a></p>
                </form>
            </div>
            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>Уже есть аккаунт?</h3>
                        <p>Мы рады, что Вы уже с нами. Желаем Вам приятной работы!</p>
                        <button className="btn" id="sign-in-btn">Войти</button>
                    </div>
                    <img src="/img/login.png" alt="" className="image" />
                </div>
                <div className="panel right-panel">
                    <div className="content">
                        <h3>Еще нет аккаунта?</h3>
                        <p>Мгновенная регистрация и быстрый доступ ко всем функциям приложения всего за 15 секунд</p>
                        <button className="btn" id="sign-up-btn">Регистрация</button>
                    </div>
                    <img src="/img/registration.png" alt="" className="image" />
                </div>
            </div>
        </div>
    )
}