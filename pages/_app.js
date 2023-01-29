import '../styles/globals.css'
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../lib/hooks/useAuth";

const isAccountRoute = (route) => {
    return route.split('/').indexOf("account") !== -1;
}

function MyApp({ Component, pageProps }) {
    const [styles, setStyles] = useState(<></>);
    const router = useRouter();

    useEffect(() => {
        if (isAccountRoute(router.route)) {
            setStyles(
                <style jsx global>
                    {`
              /* =========================================== REGISTRATION================================================*/

              * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                  font-family: 'Poppins', sans-serif;
              }
              
              body {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  min-height: 100vh;
                  background: var(--color_Dark1);
              }
              
              .container {
                  position: relative;
                  width: 70vw;
                  height: 80vh;
                  background: #fff;
                  border-radius: 15px;
                  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
                  overflow: hidden;
              }
              
              .container::before {
                  content: "";
                  position: absolute;
                  top: 0;
                  left: -50%;
                  width: 100%;
                  height: 100%;
                  background: linear-gradient(-45deg, #30353E, #30353E);
                  z-index: 6;
                  transform: translateX(100%);
                  transition: 1s ease-in-out;
              }
              
              .signin-signup {
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: space-around;
                  z-index: 5;
              }
              
              form {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  flex-direction: column;
                  width: 40%;
                  min-width: 238px;
                  padding: 0 10px;
              }
              
              form.sign-in-form {
                  opacity: 1;
                  transition: 0.5s ease-in-out;
                  transition-delay: 1s;
              }
              
              form.sign-up-form {
                  opacity: 0;
                  transition: 0.5s ease-in-out;
                  transition-delay: 1s;
              }
              
              .title {
                  font-size: 35px;
                  color: #30353E;
                  margin-bottom: 10px;
              }
              
              .input-field {
                  width: 100%;
                  height: 50px;
                  background: #e6e6e6;
                  margin: 10px 0;
                  border: 2px solid #CFC8FF;
                  border-radius: 50px;
                  display: flex;
                  align-items: center;
              }
              
              .input-field i {
                  flex: 1;
                  text-align: center;
                  color: #30353E;
                  font-size: 18px;
              }
              
              .input-field input {
                  flex: 5;
                  background: none;
                  border: none;
                  outline: none;
                  width: 100%;
                  font-size: 18px;
                  font-weight: 600;
                  color: #444;
              }
              
              .btn {
                  width: 150px;
                  height: 50px;
                  border: none;
                  border-radius: 50px;
                  background: #CFC8FF;
                  color: #30353E;
                  font-weight: 600;
                  margin: 10px 0;
                  text-transform: uppercase;
                  cursor: pointer;
              }
              
              .btn:hover {
                  background: #9D51CD;
              }
              
              .social-text {
                  margin: 10px 0;
                  font-size: 16px;
              }
              
              .social-media {
                  display: flex;
                  justify-content: center;
              }
              
              .social-icon {
                  height: 45px;
                  width: 45px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: #444;
                  border: 1px solid #444;
                  border-radius: 50px;
                  margin: 0 5px;
              }
              
              a {
                  text-decoration: none;
              }
              
              .social-icon:hover {
                  color: #df4adf;
                  border-color: #df4adf;
              }
              
              .panels-container {
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: space-around;
              }
              
              .panel {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: space-around;
                  width: 35%;
                  min-width: 238px;
                  padding: 0 10px;
                  text-align: center;
                  z-index: 6;
              }
              
              .left-panel {
                  pointer-events: none;
              }
              
              .content {
                  color: #ffffff;
                  transition: 1.1s ease-in-out;
                  transition-delay: 0.5s;
              }
              
              .panel h3 {
                  font-size: 24px;
                  font-weight: 600;
              }
              
              .panel p {
                  font-size: 15px;
                  padding: 10px 0;
              }
              
              .image {
                  width: 100%;
                  transition: 1.1s ease-in-out;
                  transition-delay: 0.4s;
              }
              
              .left-panel .image,
              .left-panel .content {
                  transform: translateX(-200%);
              }
              
              .right-panel .image,
              .right-panel .content {
                  transform: translateX(0);
              }
              
              .account-text {
                  display: none;
              }
              
              
              /*Animation*/
              
              .container.sign-up-mode::before {
                  transform: translateX(0);
              }
              
              .container.sign-up-mode .right-panel .image,
              .container.sign-up-mode .right-panel .content {
                  transform: translateX(200%);
              }
              
              .container.sign-up-mode .left-panel .image,
              .container.sign-up-mode .left-panel .content {
                  transform: translateX(0);
              }
              
              .container.sign-up-mode form.sign-in-form {
                  opacity: 0;
              }
              
              .container.sign-up-mode form.sign-up-form {
                  opacity: 1;
              }
              
              .container.sign-up-mode .right-panel {
                  pointer-events: none;
              }
              
              .container.sign-up-mode .left-panel {
                  pointer-events: all;
              }
              /* ================================================================================================================================== */
              /* =========================================== USER ================================================*/
              
              /* Google Fonts  */
              @import url('https://fonts.googleapis.com/css2?family=Alegreya+Sans+SC:wght@400;700&display=swap');
              
              /* Globals  */
              *{
                  font-family: 'Alegreya Sans SC', sans-serif;
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                  list-style: none;
                  text-decoration: none;
              }
              
              /* Variables  */
              :root{
                  --color_Lavande: #CFC8FF;
                  --color_Blue: #573B71;
                  --color_Dark1: #292C34;
                  --color_Dark2: #30353E;
                  --color_Light1: #dfdfdf;
                  --color_Light2: #c4c4c4;
              }
              
              
              
              /* =============== Home Section =============== */
              .home{
                  //position: relative;
                  background-color: var(--color_Dark1);
                  left: 0px;
                  width: 100%;
                  height: 100vh;
                  transition: all .5s ease;
              }
              
              .home input {
                  width: 100%;
                  height:50px;
                  background-color:#30353E;
                  padding-left: 10px;
                  color: white;
                  border: none;
              }

              .logotipe {
                  left: 50px;
                  top: 45px;
                  position: fixed;
                  cursor: pointer;
              }

              .logotipe :hover {
                transform: scale(1.3);
                -webkit-transform: scale(1.3);
                -ms-transform: scale(1.3);
              }
              
              
              
              .accaunt .textname {
                  position:fixed;
                  color: #c4c4c4;
                  font-size: 20px;
                  left: 1675px;
                  top: 60px;
                  font-weight: 400;
                  cursor: pointer;
              }
              .accauntimage {
                  position: fixed;
                  left: 1840px;
                  top: 50px;
                  cursor: pointer;
              }


              .accauntimage :hover {
                transform: scale(1.3);
                -webkit-transform: scale(1.3);
                -ms-transform: scale(1.3);
              }

             .accaunt .textname:after {
	            content: "";
                display: block;
                position: absolute;
                right: 0;
                bottom: -7px;
                width: 0;
                height: 5px; /* Высота линии */
                background-color: #CFC8FF; /* Цвет подчеркивания при исчезании линии*/
                transition: width 0.5s; /* Время эффекта */
              }

             .accaunt .textname:hover:after {
	            content: "";
                width: 100%;
                display: block;
                position: absolute;
                left: 0;
                bottom: -7px;
                height: 5px; /* Высота линии */
                background-color: #CFC8FF; /* Цвет подчеркивания при появлении линии*/
                transition: width 0.5s;  /* Время эффекта */
             }
              
              
              
              /* -----------------------------------------Имя пользователя--------------------------------------------------- */
              
              
              .username {
                  width: 350px;
                  height: 50px;
                  background: #30353E;
                  margin: 10px 0;
                  border-radius: 10px;
                  top: 250px;
                  left: 350px;
                  position: fixed;
              
              }
              
              .usernametext {
                  color: #c4c4c4;
                  text-align: left;
                  top: 230px;
                  left: 350px;
                  position: fixed;
              }
              
              
              /* -------------------------------------------------------------------------------------------- */
              
              
              /* -----------------------------------------Фамилия пользователя--------------------------------------------------- */
              
              
              .usersecondname {
                  width: 350px;
                  height: 50px;
                  background: #30353E;
                  margin: 10px 0;
                  border-radius: 10px;
                  top: 350px;
                  left: 350px;
                  position: fixed;
              
              }
              
              .usersecondnametext {
                  color: #c4c4c4;
                  text-align: left;
                  top: 330px;
                  left: 350px;
                  position: fixed;
              }
              
              
              /* -------------------------------------------------------------------------------------------- */
              
              /* -----------------------------------------Телефон пользователя--------------------------------------------------- */
              
              
              .userphone {
                  width: 350px;
                  height: 50px;
                  background: #30353E;
                  margin: 10px 0;
                  border-radius: 10px;
                  top: 450px;
                  left: 350px;
                  position: fixed;
              
              }
              
              .userphonetext {
                  color: #c4c4c4;
                  text-align: left;
                  top: 430px;
                  left: 350px;
                  position: fixed;
              }
              
              
              /* -------------------------------------------------------------------------------------------- */
              
              /* -----------------------------------------Почта пользователя--------------------------------------------------- */
              
              
              .usermail {
                  width: 350px;
                  height: 50px;
                  background: #30353E;
                  margin: 10px 0;
                  border-radius: 10px;
                  top: 550px;
                  left: 350px;
                  position: fixed;
              
              }
              
              .usermailtext {
                  color: #c4c4c4;
                  text-align: left;
                  top: 530px;
                  left: 350px;
                  position: fixed;
              }
              
              
              /* -------------------------------------------------------------------------------------------- */
              
              
              /* -----------------------------------------Наименование организации--------------------------------------------------- */
              
              
              .usercompany {
                  width: 350px;
                  height: 50px;
                  background: #30353E;
                  margin: 10px 0;
                  border-radius: 10px;
                  top: 250px;
                  left: 750px;
                  position: fixed;
              
              }
              
              .usercompanytext {
                  color: #c4c4c4;
                  text-align: left;
                  top: 230px;
                  left: 750px;
                  position: fixed;
              }
              
              
              /* -------------------------------------------------------------------------------------------- */
              
              /* -----------------------------------------Номер счета--------------------------------------------------- */
              
              
              .userbank {
                  width: 350px;
                  height: 50px;
                  background: #30353E;
                  margin: 10px 0;
                  border-radius: 10px;
                  top: 350px;
                  left: 750px;
                  position: fixed;
              
              }
              
              .userbanktext {
                  color: #c4c4c4;
                  text-align: left;
                  top: 330px;
                  left: 750px;
                  position: fixed;
              }
              
              
              /* -------------------------------------------------------------------------------------------- */
              
              /* -----------------------------------------ИНН компании--------------------------------------------------- */
              
              
              .userinn {
                  width: 350px;
                  height: 50px;
                  background: #30353E;
                  margin: 10px 0;
                  border-radius: 10px;
                  top: 450px;
                  left: 750px;
                  position: fixed;
              
              }
              
              .userinntext {
                  color: #c4c4c4;
                  text-align: left;
                  top: 430px;
                  left: 750px;
                  position: fixed;
              }
              
              
              /* -------------------------------------------------------------------------------------------- */
              
              /* -----------------------------------------БИК Банка--------------------------------------------------- */
              
              
              .userbik {
                  width: 350px;
                  height: 50px;
                  background: #30353E;
                  margin: 10px 0;
                  border-radius: 10px;
                  top: 550px;
                  left: 750px;
                  position: fixed;
              
              }
              
              .userbiktext {
                  color: #c4c4c4;
                  text-align: left;
                  top: 530px;
                  left: 750px;
                  position: fixed;
              }
              
              
              /* -------------------------------------------------------------------------------------------- */
              
              
            
              
              .saveimage {
                  top: 450px;
                  left: 1255px;
                  position: absolute;
                  background-color: #CFC8FF;
                  border-radius: 10px;
                  height: 40px;
                  width: 160px;
                  color: #292C34;
                  border-color: #CFC8FF;
                  user-select: none;
                  font-size: 20px;
              
              
              }
              .saveimage {
                  cursor: pointer;
                  outline: none;
              }
              
              
              .save {
                  top: 700px;
                  left: 810px;
                  position: absolute;
                  background-color: #CFC8FF;
                  border-radius: 10px;
                  height: 40px;
                  width: 160px;
                  color: #292C34;
                  border-color: #CFC8FF;
                  user-select: none;
                  font-size: 20px;
                  cursor: pointer;
              
              }

              .save :hover {
                transform: scale(1.05);
                -webkit-transform: scale(1.05);
                -ms-transform: scale(1.05);
              }
              
              
              .work {
                  position: absolute;
                  left: 400px;
                  top: 700px;
                  cursor: pointer;
              }
              

              .work :hover {
                transform: scale(1.05);
                -webkit-transform: scale(1.05);
                -ms-transform: scale(1.05);
              }

             
              
              /* ================================================================================================================================== */
              
              
              
              
              
              
              
              /*Responsive*/
              
              /* =========================================== REGISTRATION================================================*/
              
              @media (max-width:779px) {
                  .container {
                      width: 100vw;
                      height: 100vh;
                  }
              }
              
              @media (max-width:635px) {
                  .container::before {
                      display: none;
                  }
                  form {
                      width: 80%;
                  }
                  form.sign-up-form {
                      display: none;
                  }
                  .container.sign-up-mode2 form.sign-up-form {
                      display: flex;
                      opacity: 1;
                  }
                  .container.sign-up-mode2 form.sign-in-form {
                      display: none;
                  }
                  .panels-container {
                      display: none;
                  }
                  .account-text {
                      display: initial;
                      margin-top: 30px;
                  }
              }
              
              @media (max-width:320px) {
                  form {
                      width: 90%;
                  }
              }
              
              /* ================================================================================================================================== */
              
              
              /* =========================================== USER ================================================*/
              @media (max-width: 1080px){
              
              }
              
              /* For Medium Devices */
              @media (max-width: 774px){
              
              }
              @media (max-width: 560px){
              
              }
              
              /* For Small Devices */
              @media (max-width: 360px){
              
              }
              
            `}
                </style>
            );
        }
        else {
            setStyles(
                <style jsx global>
                    {`
            /* Google Fonts  */
            @import url('https://fonts.googleapis.com/css2?family=Alegreya+Sans+SC:wght@400;700&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=Libre+Barcode+EAN13+Text&display=swap');
            /* Globals  */
            *{
                font-family: 'Alegreya Sans SC', sans-serif;
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                list-style: none;
                text-decoration: none;
            }
            
            /* Variables  */
            :root{
                --color_Lavande: #CFC8FF;
                --color_Blue: #573B71;
                --color_Dark1: #292C34;
                --color_Dark2: #30353E;
                --color_Light1: #dfdfdf;
                --color_Light2: #c4c4c4;
            }
            
            /* =============== Sidebar =============== */



            .sidebar{
                position: fixed;
                top: 0;
                left: 0;
                height: 100%;
                width: 350px;
                background-color: #1D1F23;
                transition: all .5s ease;
                z-index: 100;
            }
            .sidebar.close{
                width: 80px;
            }
            
            /* --------- Logo ------------ */
            .logo-box{
                height: 140px;
                width: 100%;
                display: flex;
                align-items: center;
                color: var(--color_Lavande);
                transition: all .5s ease;
            }
            .logo-box:hover{
                color: var(--color_Lavande);
            }
            .logo-box i{
                font-size: 30px;
                height: 50px;
                min-width: 90px;
                text-align: center;
                line-height: 50px;
                transition: all .5s ease;
            }
            .sidebar.close .logo-box i{
                transform: rotate(360deg);
            }
            .logo-name{
                position: fixed;
                font-size: 30px;
                font-weight: 600;
                left: 80px;
            }

            .logotipe{
                position: fixed;
                left: 15px;
            }

            


            
            /* ---------- Sidebar List ---------- */
            .sidebar-list{
                height: 100%;
                padding: 30px 0 150px 0;
                overflow: auto;
            }
            .sidebar-list::-webkit-scrollbar{
                display: none;
            }
            .sidebar-list li{
                transition: all .5s ease;
            }
            .sidebar-list li:hover{
                background-color: var(--color_Dark2);
                border-radius: 10px;
            }
            .sidebar-list li .title{
                display: flex;
                justify-content: space-between;
                align-items: center;
                transition: all .5s ease;
                cursor: pointer;
            }
            .sidebar-list li.active .title{
                background-color: var(--color_Blue);
                border-radius: 10px;
            }
            .sidebar-list li.active .bxs-chevron-down{
                transition: all .5s ease;
                transform: rotate(180deg);
            }
            .sidebar-list li .title .link{
                display: flex;
                align-items: center;
            }
            .sidebar-list li .title i{
                height: 50px;
                min-width: 80px;
                text-align: center;
                line-height: 50px;
                color: var(--color_Light1);
                font-size: 20px;
            }
            .sidebar-list li .title .name{
                position: fixed;
                font-size: 20px;
                font-weight: 400;
                color: var(--color_Light1);
                left: 50px;
                padding: 20px 25px;
            }



            /*--------------------PROFILE BAR----------------*/
            .texteducationbar {
                position: fixed;
                font-size: 20px;
                font-weight: 400;
                color: var(--color_Light1);
                left: 80px;
                top: 610px;
            }

            .icoeducationbar {
                position: fixed;
                left: 15px;
                top: 600px;
            }

            .icoeducationbar:hover {
                transform: scale(1.3);
                -webkit-transform: scale(1.3);
                -ms-transform: scale(1.3);
            }

            .texteducationbar:after {
	            content: "";
                display: block;
                position: absolute;
                right: 0;
                bottom: -7px;
                width: 0;
                height: 5px; /* Высота линии */
                background-color: #CFC8FF; /* Цвет подчеркивания при исчезании линии*/
                transition: width 0.5s; /* Время эффекта */
            }

            .texteducationbar:hover:after {
	            content: "";
                width: 100%;
                display: block;
                position: absolute;
                left: 0;
                bottom: -7px;
                height: 5px; /* Высота линии */
                background-color: #CFC8FF; /* Цвет подчеркивания при появлении линии*/
                transition: width 0.5s;  /* Время эффекта */
            }






            /*--------------------PROFILE BAR----------------*/
            .textusercabinet {
                position: fixed;
                font-size: 20px;
                font-weight: 400;
                color: var(--color_Light1);
                left: 80px;
                top: 800px;
            }

            .icousercabinet {
                position: fixed;
                left: 15px;
                top: 790px;
            }

            .icousercabinet :hover {
                transform: scale(1.3);
                -webkit-transform: scale(1.3);
                -ms-transform: scale(1.3);
            }

            .textusercabinet:after {
	            content: "";
                display: block;
                position: absolute;
                right: 0;
                bottom: -7px;
                width: 0;
                height: 5px; /* Высота линии */
                background-color: #CFC8FF; /* Цвет подчеркивания при исчезании линии*/
                transition: width 0.5s; /* Время эффекта */
            }

            .textusercabinet:hover:after {
	            content: "";
                width: 100%;
                display: block;
                position: absolute;
                left: 0;
                bottom: -7px;
                height: 5px; /* Высота линии */
                background-color: #CFC8FF; /* Цвет подчеркивания при появлении линии*/
                transition: width 0.5s;  /* Время эффекта */
            }



            /*--------------------LOGOUT----------------*/
            .textlogout {
                position: fixed;
                font-size: 20px;
                font-weight: 400;
                color: var(--color_Light1);
                left: 80px;
                top: 860px;
            }

            .icologout {
                position: fixed;
                left: 15px;
                top: 850px;
            }

            .icologout :hover {
                transform: scale(1.3);
                -webkit-transform: scale(1.3);
                -ms-transform: scale(1.3);
            }

            .textlogout:after {
	            content: "";
                display: block;
                position: absolute;
                right: 0;
                bottom: -7px;
                width: 0;
                height: 5px; /* Высота линии */
                background-color: #FF196E; /* Цвет подчеркивания при исчезании линии*/
                transition: width 0.5s; /* Время эффекта */
            }

            .textlogout:hover:after {
	            content: "";
                width: 100%;
                display: block;
                position: absolute;
                left: 0;
                bottom: -7px;
                height: 5px; /* Высота линии */
                background-color: #FF196E; /* Цвет подчеркивания при появлении линии*/
                transition: width 0.5s;  /* Время эффекта */
            }

            /*------------------------------------------*/

            /*--------------------BARCOD BAR----------------*/
            .textbarcod {
                position: fixed;
                font-size: 20px;
                font-weight: 400;
                color: var(--color_Light1);
                left: 80px;
                top: 490px;
            }

            .icobarcod {
                position: fixed;
                left: 15px;
                top: 480px;
            }

            .icobarcod :hover {
                transform: scale(1.3);
                -webkit-transform: scale(1.3);
                -ms-transform: scale(1.3);
            }

            .textbarcod:after {
	            content: "";
                display: block;
                position: absolute;
                right: 0;
                bottom: -7px;
                width: 0;
                height: 5px; /* Высота линии */
                background-color: #CFC8FF; /* Цвет подчеркивания при исчезании линии*/
                transition: width 0.5s; /* Время эффекта */
            }

            .textbarcod:hover:after {
	            content: "";
                width: 100%;
                display: block;
                position: absolute;
                left: 0;
                bottom: -7px;
                height: 5px; /* Высота линии */
                background-color: #CFC8FF; /* Цвет подчеркивания при появлении линии*/
                transition: width 0.5s;  /* Время эффекта */
            }

            /*------------------------------------------*/

            /*--------------------FIN TOTAL BAR----------------*/
            .textfintotal {
                position: fixed;
                font-size: 20px;
                font-weight: 400;
                color: var(--color_Light1);
                left: 80px;
                top: 690px;
            }

            .icofintotal {
                position: fixed;
                left: 15px;
                top: 680px;
            }

            .icofintotal :hover {
                transform: scale(1.3);
                -webkit-transform: scale(1.3);
                -ms-transform: scale(1.3);
            }

            .textfintotal:after {
	            content: "";
                display: block;
                position: absolute;
                right: 0;
                bottom: -7px;
                width: 0;
                height: 5px; /* Высота линии */
                background-color: #CFC8FF; /* Цвет подчеркивания при исчезании линии*/
                transition: width 0.5s; /* Время эффекта */
            }

            .textfintotal:hover:after {
	            content: "";
                width: 100%;
                display: block;
                position: absolute;
                left: 0;
                bottom: -7px;
                height: 5px; /* Высота линии */
                background-color: #CFC8FF; /* Цвет подчеркивания при появлении линии*/
                transition: width 0.5s;  /* Время эффекта */
            }

            /*------------------------------------------*/

            /*--------------------FIN BAR----------------*/
            .textbarfin {
                position: fixed;
                font-size: 20px;
                font-weight: 400;
                color: var(--color_Light1);
                left: 80px;
                top: 430px;
            }

            .icobarfin {
                position: fixed;
                left: 15px;
                top: 420px;
            }

            .icobarfin :hover {
                transform: scale(1.3);
                -webkit-transform: scale(1.3);
                -ms-transform: scale(1.3);
            }

            .textbarfin:after {
	            content: "";
                display: block;
                position: absolute;
                right: 0;
                bottom: -7px;
                width: 0;
                height: 5px; /* Высота линии */
                background-color: #CFC8FF; /* Цвет подчеркивания при исчезании линии*/
                transition: width 0.5s; /* Время эффекта */
            }

            .textbarfin:hover:after {
	            content: "";
                width: 100%;
                display: block;
                position: absolute;
                left: 0;
                bottom: -7px;
                height: 5px; /* Высота линии */
                background-color: #CFC8FF; /* Цвет подчеркивания при появлении линии*/
                transition: width 0.5s;  /* Время эффекта */
            }

            /*------------------------------------------*/

            /*--------------------NALOG BAR 6----------------*/
            .textbarnalog {
                position: fixed;
                font-size: 20px;
                font-weight: 400;
                color: var(--color_Light1);
                left: 80px;
                top: 250px;
            }

            .icobarnalog {
                position: fixed;
                left: 15px;
                top: 240px;
            }

            .icobarnalog :hover {
                transform: scale(1.3);
                -webkit-transform: scale(1.3);
                -ms-transform: scale(1.3);
            }

            .textbarnalog:after {
	            content: "";
                display: block;
                position: absolute;
                right: 0;
                bottom: -7px;
                width: 0;
                height: 5px; /* Высота линии */
                background-color: #CFC8FF; /* Цвет подчеркивания при исчезании линии*/
                transition: width 0.5s; /* Время эффекта */
            }

            .textbarnalog:hover:after {
	            content: "";
                width: 100%;
                display: block;
                position: absolute;
                left: 0;
                bottom: -7px;
                height: 5px; /* Высота линии */
                background-color: #CFC8FF; /* Цвет подчеркивания при появлении линии*/
                transition: width 0.5s;  /* Время эффекта */
            }

            /*--------------------NALOG BAR 15----------------*/
            .textbarnalogusn {
                position: fixed;
                font-size: 20px;
                font-weight: 400;
                color: var(--color_Light1);
                left: 80px;
                top: 310px;
            }

            .icobarnalogusn {
                position: fixed;
                left: 15px;
                top: 300px;
            }

            .icobarnalogusn :hover {
                transform: scale(1.3);
                -webkit-transform: scale(1.3);
                -ms-transform: scale(1.3);
            }

            .textbarnalogusn:after {
	            content: "";
                display: block;
                position: absolute;
                right: 0;
                bottom: -7px;
                width: 0;
                height: 5px; /* Высота линии */
                background-color: #CFC8FF; /* Цвет подчеркивания при исчезании линии*/
                transition: width 0.5s; /* Время эффекта */
            }

            .textbarnalogusn:hover:after {
	            content: "";
                width: 100%;
                display: block;
                position: absolute;
                left: 0;
                bottom: -7px;
                height: 5px; /* Высота линии */
                background-color: #CFC8FF; /* Цвет подчеркивания при появлении линии*/
                transition: width 0.5s;  /* Время эффекта */
            }



            /*--------------------NALOG BAR 20----------------*/
            .textbarnalogosn {
                position: fixed;
                font-size: 20px;
                font-weight: 400;
                color: var(--color_Light1);
                left: 80px;
                top: 370px;
            }

            .icobarnalogosn {
                position: fixed;
                left: 15px;
                top: 360px;
            }

            .icobarnalogosn :hover {
                transform: scale(1.3);
                -webkit-transform: scale(1.3);
                -ms-transform: scale(1.3);
            }

            .textbarnalogosn:after {
	            content: "";
                display: block;
                position: absolute;
                right: 0;
                bottom: -7px;
                width: 0;
                height: 5px; /* Высота линии */
                background-color: #CFC8FF; /* Цвет подчеркивания при исчезании линии*/
                transition: width 0.5s; /* Время эффекта */
            }

            .textbarnalogosn:hover:after {
	            content: "";
                width: 100%;
                display: block;
                position: absolute;
                left: 0;
                bottom: -7px;
                height: 5px; /* Высота линии */
                background-color: #CFC8FF; /* Цвет подчеркивания при появлении линии*/
                transition: width 0.5s;  /* Время эффекта */
            }

            /*------------------------------------------*/

            /*--------------------CHINA CARGO BAR----------------*/
            .textchinacargo {
                position: fixed;
                font-size: 20px;
                font-weight: 400;
                color: var(--color_Light1);
                left: 80px;
                top: 250px;
            }

            .icochinacargo {
                position: fixed;
                left: 15px;
                top: 240px;
            }

            .icochinacargo :hover {
                transform: scale(1.3);
                -webkit-transform: scale(1.3);
                -ms-transform: scale(1.3);
            }

            .textchinacargo:after {
	            content: "";
                display: block;
                position: absolute;
                right: 0;
                bottom: -7px;
                width: 0;
                height: 5px; /* Высота линии */
                background-color: #CFC8FF; /* Цвет подчеркивания при исчезании линии*/
                transition: width 0.5s; /* Время эффекта */
            }

            .textchinacargo:hover:after {
	            content: "";
                width: 100%;
                display: block;
                position: absolute;
                left: 0;
                bottom: -7px;
                height: 5px; /* Высота линии */
                background-color: #CFC8FF; /* Цвет подчеркивания при появлении линии*/
                transition: width 0.5s;  /* Время эффекта */
            }

            /*------------------------------------------*/

            /*--------------------CHINA BAR----------------*/
            .textbarchina {
                position: fixed;
                font-size: 20px;
                font-weight: 400;
                color: var(--color_Light1);
                left: 80px;
                top: 250px;
            }

            .icobarchina {
                position: fixed;
                left: 15px;
                top: 240px;
            }

            .icobarchina :hover {
                transform: scale(1.3);
                -webkit-transform: scale(1.3);
                -ms-transform: scale(1.3);
            }
            
            .textbarchina:after {
	            content: "";
                display: block;
                position: absolute;
                right: 0;
                bottom: -7px;
                width: 0;
                height: 5px; /* Высота линии */
                background-color: #CFC8FF; /* Цвет подчеркивания при исчезании линии*/
                transition: width 0.5s; /* Время эффекта */
            }

            .textbarchina:hover:after {
	            content: "";
                width: 100%;
                display: block;
                position: absolute;
                left: 0;
                bottom: -7px;
                height: 5px; /* Высота линии */
                background-color: #CFC8FF; /* Цвет подчеркивания при появлении линии*/
                transition: width 0.5s;  /* Время эффекта */
            }

            /*------------------------------------------*/
            /*--------------------UNIT ECONOMY BAR----------------*/
            .textuniteconomy {
                position: fixed;
                font-size: 20px;
                font-weight: 400;
                color: var(--color_Light1);
                left: 80px;
                top: 190px;
            }

            .icouniteconomy {
                position: fixed;
                left: 15px;
                top: 180px;
            }

            .icouniteconomy :hover {
                transform: scale(1.3);
                -webkit-transform: scale(1.3);
                -ms-transform: scale(1.3);
            }

            
            .textuniteconomy:after {
	            content: "";
                display: block;
                position: absolute;
                right: 0;
                bottom: -7px;
                width: 0;
                height: 5px; /* Высота линии */
                background-color: #CFC8FF; /* Цвет подчеркивания при исчезании линии*/
                transition: width 0.5s; /* Время эффекта */
            }

            .textuniteconomy:hover:after {
	            content: "";
                width: 100%;
                display: block;
                position: absolute;
                left: 0;
                bottom: -7px;
                height: 5px; /* Высота линии */
                background-color: #CFC8FF; /* Цвет подчеркивания при появлении линии*/
                transition: width 0.5s;  /* Время эффекта */
            }

            .sidebar.close .logo-name,
            .sidebar.close .title .name,
            .sidebar.close .title .bxs-chevron-down
            {
                display: none;
            }
            
            .sidebar.close .sidebar-list{
                overflow: visible;
            }
            .sidebar.close .textuniteconomy{
                position: relative;
            }
            .sidebar.close .textuniteconomy .submenu{
                display: flex;
                flex-direction: column;
                position: absolute;
                left: 100%;
                top: 50px;
                margin-top: 0;
                padding: 11px 20px;
                border-radius: 0 10px 10px 0;
                height: max-content;
                width: max-content;
                opacity: 0;
                transition: all .5s ease;
                pointer-events: none;
            }
            .sidebar.close .textuniteconomy:hover .submenu{
                opacity: 1;
                top: 0;
                pointer-events: initial;
                background-color: var(--color_Lavande);
            }
            .sidebar.close .submenu-title{
                display: block;
                font-size: 20px;
                color: var(--color_Dark1);
                font-weight: 800;
            }
            






            /*------------------------------------------*/
            
            
            /* ---------------- Submenu ------------- */
            .sidebar-list li .submenu{
                width: 0;
                height: 0;
                opacity: 0;
                transition: all .5s ease;
            }
            .sidebar-list li.dropdown.active .submenu{
                width: unset;
                height: unset;
                opacity: 1;
                display: flex;
                flex-direction: column;
                padding: 6px 6px 14px 80px;
                background-color: var(--color_Dark2);
            }
            .submenu .link{
                color: var(--color_Light2);
                font-size: 15px;
                padding: 5px 0;
                transition: all .5s ease;
            }
            .submenu .link:hover{
                color: #fff;
                margin-left: 5px;
            }
            .submenu-title{
                display: none;
            }
            
            /* ---------------- Submenu Close ------------- */

            /*-------Лежит в свойствах текста Юнит экономики----------*/

            /* =============== Home Section =============== */
            
          
            .home{
                position: relative;
                background-color: var(--color_Dark1);
                left: 260px;
                width: calc(100% - 260px);
                min-height: 100vh;
                transition: all .5s ease;
            }
            .sidebar.close ~ .home{
                left: 20px;
                width: calc(100% - 20px);
            }
            .home .toggle-sidebar{
                height: 140px;
                display: flex;
                align-items: center;
                width: fit-content;
                cursor: pointer;
            }
            .home .toggle-sidebar i{
                font-size: 35px;
                color: var(--color_Light2);
                margin-left: 120px;
            }
            .home .toggle-sidebar .text{
                font-size: 30px;
                color: var(--color_Light2);
                font-weight: 600;
            }
            

            
            /* ----------------------------text barcod----------------------- */
            
            .texttitlesbarcod {
                position:absolute;
                color: #c4c4c4;
                font-size: 24px;
                left: 130px;
                top: 160px;
                font-weight: 800;
                width: 500px;
            
            }
            
            /* ---------------------------------------------------------------- */
            
            .textoreview {
                position: absolute;
                color: #c4c4c4;
                font-size: 24px;
                left: 130px;
                top: 340px;
                width: 700px;
                text-align: left;
            }
            
            /* ----------------------------   ACCAUNT   ----------------------- */
            
            
            
            .accaunt .textname {
                position:fixed;
                color: #c4c4c4;
                font-size: 20px;
                text-align: left;
                left: 1675px;
                top: 60px;
                font-weight: 400;
                cursor: pointer;
            }
            .accauntimage {
                position: fixed;
                left: 1840px;
                top: 45px;
                cursor: pointer;
            }

            .accaunt .textname:after {
	            content: "";
                display: block;
                position: absolute;
                right: 0;
                bottom: -7px;
                width: 0;
                height: 5px; /* Высота линии */
                background-color: #CFC8FF; /* Цвет подчеркивания при исчезании линии*/
                transition: width 0.5s; /* Время эффекта */
            }

            .accaunt .textname:hover:after {
	            content: "";
                width: 100%;
                display: block;
                position: absolute;
                left: 0;
                bottom: -7px;
                height: 5px; /* Высота линии */
                background-color: #CFC8FF; /* Цвет подчеркивания при появлении линии*/
                transition: width 0.5s;  /* Время эффекта */
            }


            
            /* ---------------------------------------------------------------- */
            
            /*=================== UNIT-ECONOMY =============*/

            .profileico {
                position: fixed;
                left: 1830px;
                top: 50px;
                cursor: pointer;
            }

            .profileico :hover {
                transform: scale(1.3);
                -webkit-transform: scale(1.3);
                -ms-transform: scale(1.3);
            }
            
        
            



            /* ---------------------------------SKU-------------------- */
            .block_sku .rectangle {
                position: absolute;
                width: 350px;
                height: 150px;
                left: 130px;
                top: 160px;
                background: #30353E;
                border-radius: 20px;
            }
            
            .block .textsku {
                position: absolute;
                color: #c4c4c4;
                font-size: 24px;
                left: 235px;
                top: 200px;
            }
            .block .textskutwo {
                position: absolute;
                color: #CFC8FF;
                font-size: 36px;
                left: 235px;
                top: 225px;
            }
            .block .textskuthree {
                position: absolute;
                color: #CFC8FF;
                font-size: 42px;
                left: 300px;
                top: 217px;
            }
            .block .iconsku {
                position: absolute;
                left: 150px;
                top: 210px;
            
            }
            
            
            /* -------------------------------------------Volume product-------------------------- */
            
            .block_vp .rectangle {
                position: absolute;
                width: 350px;
                height: 150px;
                left: 500px;
                top: 160px;
            
                background: #30353E;
                border-radius: 20px;
            
            }
            .block .textvp {
                position: absolute;
                color: #c4c4c4;
                font-size: 24px;
                left: 610px;
                top: 200px;
            }
            .block .textvptwo {
                position: absolute;
                color: #CFC8FF;
                font-size: 36px;
                left: 610px;
                top: 225px;
            }
            .block .textvpthree {
                position: absolute;
                color: #CFC8FF;
                font-size: 42px;
                left: 665px;
                top: 217px;
            }
            .block .iconsvp {
                position: absolute;
                left: 525px;
                top: 210px;
            
            }
            
            
            
            /* -------------------------------------------Volume money-------------------------- */
            
            .block_vm .rectangle {
                position: absolute;
                width: 350px;
                height: 150px;
                left: 870px;
                top: 160px;
            
                background: #30353E;
                border-radius: 20px;
            
            }
            .block .textvm {
                position: absolute;
                color: #c4c4c4;
                font-size: 24px;
                left: 990px;
                top: 200px;
            }
            .block .textvmtwo {
                position: absolute;
                color: #CFC8FF;
                font-size: 50px;
                left: 990px;
                top: 215px;
            }
            .block .textvmthree {
                position: absolute;
                color: #CFC8FF;
                font-size: 42px;
                left: 1030px;
                top: 220px;
            }
            .block .iconsvm {
                position: absolute;
                left: 900px;
                top: 210px;
            
            }
            
            /* -------------------------------------------Video tutorial-------------------------- */
            
            .block .videocard {
                position: absolute;
                left: 1239px;
                top: 160px;
            }
            .block .videocard :hover {
                transform: scale(1.1);
                -webkit-transform: scale(1.1);
                -ms-transform: scale(1.1);
            }
            
            /* -------------------------------------------Company card-------------------------- */
            
            .block .companycard {
                position: absolute;
                left: 1610px;
                top: 160px;
            }
            .block .companycard :hover {
                transform: scale(1.1);
                -webkit-transform: scale(1.1);
                -ms-transform: scale(1.1);
            }


            /* --------------------------------TABLE STYLE-------------------------- */
            .button {
                position: absolute;
                left: 650px;
                top: -15px;
                cursor: pointer;
            }

            .button :hover {
                transform: scale(1.1);
                -webkit-transform: scale(1.1);
                -ms-transform: scale(1.1);
            }

            .buttonsave {
                cursor: pointer;
            }

            .buttonsave :hover {
                transform: scale(1.3);
                -webkit-transform: scale(1.3);
                -ms-transform: scale(1.3);
            }


            .buttondelete {
                cursor: pointer;
            }

            .buttondelete :hover {
                transform: scale(1.3);
                -webkit-transform: scale(1.3);
                -ms-transform: scale(1.3);
            }



            /* --------------------------------TABLE STYLE-------------------------- */
            .bordertable {
                position: absolute;
                width: 1750px;
                height: 550px;
                left: 130px;
                top: 400px;
                border-radius: 20px;
                border: 2px solid #30353E
            
            }
            
            .table {
                width: 1700px;
                height: 520px;
                color: #fff;
                text-align: center;
                font-family: 'Alegreya Sans SC', sans-serif;
                font-weight: 200;
                padding-left: 0px;
                padding-top: 0px;
                overflow-x: scroll;
                overflow-y: scroll;
                position: absolute;
            }
            
            .tr, td {
                border: 1px solid #30353E;
                background-color: #30353E;
                border-radius: 5px;            
            }
            
            th, td:first-child {
                padding: 10px 50px;
            }
            
            .units-table {
                left: 165px;
                top: 420px;
                position: absolute;
            }
            
            .colortable {
                background-color: #CFC8FF;
                color: #CFC8FF;
                background: #CFC8FF;
            }

            /* Стили для скролла */
             ::-webkit-scrollbar {
	            width: 20px;
                height: 20px;
            } 
             ::-webkit-scrollbar-track {
                background-color: #292C34; 
            } 
             ::-webkit-scrollbar-thumb {
                background-color: #CFC8FF;
                border-radius: 5px; 
            }




            /*----------------------------------------input----------------------*/
            .inputbarcod {
                background-color: #30353E;
                color: #fff;
                padding-left: 0px;
                padding-top: 0px;
                border: 0px solid #30353E;
                border-radius: 0px;
                padding: 15px 60px;
                font-size: 16px;
                text-align: center;
                font-family: 'Alegreya Sans SC', sans-serif;
            }

            .inputsebest {
                background-color: #30353E;
                color: #fff;
                padding-left: 0px;
                padding-top: 0px;
                border: 0px solid #30353E;
                border-radius: 0px;
                padding: 15px 30px;
                text-align: center;
                font-family: font-family: 'Alegreya Sans SC', sans-serif;
                font-size: 18px;
            }

            .inputcount {
                background-color: #30353E;
                color: #fff;
                padding-left: 0px;
                padding-top: 0px;
                border: 0px solid #30353E;
                border-radius: 0px;
                padding: 15px 40px;
                text-align: center;
                font-family: font-family: 'Alegreya Sans SC', sans-serif;
                font-size: 18px;
            }

            .inputsize {
                background-color: #30353E;
                color: #fff;
                padding-left: 0px;
                padding-top: 0px;
                border: 0px solid #30353E;
                border-radius: 0px;
                padding: 15px 40px;
                text-align: center;
                font-family: font-family: 'Alegreya Sans SC', sans-serif;
                font-size: 18px;
            }

            .inputcolor {
                background-color: #30353E;
                color: #fff;
                padding-left: 0px;
                padding-top: 0px;
                border: 0px solid #30353E;
                border-radius: 0px;
                padding: 15px 40px;
                text-align: center;
                font-family: font-family: 'Alegreya Sans SC', sans-serif;
                font-size: 18px;
            }

            .inputbrand {
                background-color: #30353E;
                color: #fff;
                padding-left: 0px;
                padding-top: 0px;
                border: 0px solid #30353E;
                border-radius: 0px;
                padding: 15px 40px;
                text-align: center;
                font-family: font-family: 'Alegreya Sans SC', sans-serif;
                font-size: 18px;
            }

            .inputname {
                background-color: #30353E;
                color: #fff;
                padding-left: 0px;
                padding-top: 0px;
                border: 0px solid #30353E;
                border-radius: 0px;
                padding: 15px 40px;
                text-align: center;
                font-family: 'Alegreya Sans SC', sans-serif;
                font-size: 18px;
            }

            .inputproduct {
                background-color: #30353E;
                color: #fff;
                padding-left: 0px;
                padding-top: 0px;
                border: 0px solid #30353E;
                border-radius: 0px;
                padding: 15px 40px;
                text-align: center;
                font-family: 'Alegreya Sans SC', sans-serif;
                font-size: 18px;
            }

            .inputcategory {
                background-color: #30353E;
                color: #fff;
                padding-left: 0px;
                padding-top: 0px;
                border: 0px solid #30353E;
                border-radius: 0px;
                padding: 15px 40px;
                text-align: center;
                font-family: 'Alegreya Sans SC', sans-serif;
                font-size: 18px;
            }

            .inputstores {
                background-color: #30353E;
                color: #fff;
                padding-left: 0px;
                padding-top: 0px;
                border: 0px solid #30353E;
                border-radius: 0px;
                padding: 5px 5px;
                text-align: center;
                font-family: 'Alegreya Sans SC', sans-serif;
                font-size: 18px;
            }





            
            /* ============================================================================================================================================================ */
            
            
            /*=================== CHINA =============*/
            .textoreviewchina {
                position: absolute;
                color: #c4c4c4;
                font-size: 24px;
                left: 130px;
                top: 340px;
                width: 700px;
                text-align: left;
            }
            
            
            
            /*=================== FINANCIAL PRODUCT =============*/
            
            
            .block_margin .rectangle {
                position: absolute;
                width: 350px;
                height: 150px;
                left: 550px;
                top: 160px;
                background: #30353E;
                border-radius: 20px;
                border-style: solid;
                border-width: 2px;
                border-color: #CFC8FF;
            }
            
            .block .textmargin {
                position: absolute;
                color: #c4c4c4;
                font-size: 24px;
                left: 570px;
                top: 180px;
                width: 300px;
                text-align: center;
            }
            .block .textmargintwo {
                position: absolute;
                color: #CFC8FF;
                font-size: 34px;
                left: 720px;
                top: 250px;
                text-align: center;
            }
            
            /* ---------------------------------------------------- */
            
            
            
            .block_rentab .rectangle {
                position: absolute;
                width: 350px;
                height: 150px;
                left: 930px;
                top: 160px;
                background: #30353E;
                border-radius: 20px;
                border-style: solid;
                border-width: 2px;
                border-color: #CFC8FF;
            
            }
            .block .textrentab {
                position: absolute;
                color: #c4c4c4;
                font-size: 24px;
                left: 950px;
                top: 180px;
                width: 300px;
                text-align: center;
            }
            .block .textrentabtwo {
                position: absolute;
                color: #CFC8FF;
                font-size: 34px;
                left: 1090px;
                top: 250px;
                text-align: center;
            }
            
            /* -------------------------------------------------------------------------------- */
            
            
            
            
            .block_ebitda .rectangle {
                position: absolute;
                width: 350px;
                height: 150px;
                left: 1310px;
                top: 160px;
                border-style: solid;
                border-width: 2px;
                border-color: #CFC8FF;
                background: #30353E;
                border-radius: 20px;
            
            }
            .block .textebitda {
                position: absolute;
                color: #c4c4c4;
                font-size: 24px;
                left: 1335px;
                top: 180px;
                width: 300px;
                text-align: center;
            }
            .block .textebitdatwo {
                position: absolute;
                color: #CFC8FF;
                font-size: 34px;
                left: 1390px;
                top: 220px;
                width: 200px;
                text-align: center;
            }
            
            /* ---------------------------------------------------------------------- */
            
            
            .textfin {
                position:absolute;
                color: #c4c4c4;
                font-size: 24px;
                left: 130px;
                top: 190px;
                font-weight: 800;
                width: 500px;
            
            }
            
            
            .textfintitles {
                position:absolute;
                color: #c4c4c4;
                font-size: 16px;
                left: 130px;
                top: 250px;
                font-weight: 400;
                width: 500px;
            
            }
            
            /* -------------------------------------------------------------------------------- */
            .bordertablefinprod {
                position: absolute;
                width: 1750px;
                height: 550px;
                left: 130px;
                top: 400px;
                border-radius: 20px;
                border: 2px solid #30353E
            
            }

            
            
            /* ========================================================================================================== */
            
            
            
            
            
            
            /* ==============================Financial TOTAL=============================================== */


            .financeframe1 {
                position: absolute;
                left: 650px;
                top: 190px;
            }
            .financeframe1 :hover {
                transform: scale(1.1);
                -webkit-transform: scale(1.1);
                -ms-transform: scale(1.1);
            }


            .financeframe2 {
                position: absolute;
                left: 1030px;
                top: 190px;
            }
            .financeframe2 :hover {
                transform: scale(1.1);
                -webkit-transform: scale(1.1);
                -ms-transform: scale(1.1);
            }


            .financeframe3 {
                position: absolute;
                left: 1410px;
                top: 190px;
            }
            .financeframe3 :hover {
                transform: scale(1.1);
                -webkit-transform: scale(1.1);
                -ms-transform: scale(1.1);
            }



            
            .bordertablefintotal {
                position: absolute;
                width: 1750px;
                height: 550px;
                left: 130px;
                top: 400px;
                border-radius: 20px;
                border: 2px solid #30353E
            
            }
            
            
            
            
            /*=================== Рентабельность затрат=============*/
            
            .rentabzatrat .rectangle {
                position: absolute;
                width: 300px;
                height: 150px;
                left: 150px;
                top: 420px;
                background: #30353E;
                border-radius: 20px;
                box-shadow: 5px 5px 5px #15161A;
            
            
            }
            .ftotal .textrentabzatrat {
                position: absolute;
                color: #c4c4c4;
                font-size: 24px;
                left: 150px;
                top: 460px;
                width: 300px;
                text-align: center;
            }
            .ftotal .textrentabzatrattwo {
                position: absolute;
                color: #CFC8FF;
                font-size: 34px;
                left: 190px;
                top: 500px;
                width: 200px;
                text-align: center;
            }
            
            
            /*========================= Рентабельность продаж============================*/
            
            
            .rentabprodazh .rectangle {
                position: absolute;
                width: 300px;
                height: 150px;
                left: 500px;
                top: 420px;
                background: #30353E;
                border-radius: 20px;
                box-shadow: 5px 5px 5px #15161A;
            
            }
            .ftotal .textrentabprodazh {
                position: absolute;
                color: #c4c4c4;
                font-size: 24px;
                left: 500px;
                top: 460px;
                width: 300px;
                text-align: center;
            }
            .ftotal .textrentabprodazhtwo {
                position: absolute;
                color: #CFC8FF;
                font-size: 34px;
                left: 540px;
                top: 500px;
                width: 200px;
                text-align: center;
            }
            
            
            /*======================== Рентабельность реализованных товаров=============================*/
            .rentabsalesprod .rectangle {
                position: absolute;
                width: 300px;
                height: 150px;
                left: 850px;
                top: 420px;
                background: #30353E;
                border-radius: 20px;
                box-shadow: 5px 5px 5px #15161A;
            
            }
            .ftotal .textrentabsalesprod {
                position: absolute;
                color: #c4c4c4;
                font-size: 24px;
                left: 850px;
                top: 440px;
                width: 300px;
                text-align: center;
            }
            .ftotal .textrentabsalesprodtwo {
                position: absolute;
                color: #CFC8FF;
                font-size: 34px;
                left: 890px;
                top: 500px;
                width: 200px;
                text-align: center;
            }
            
            
            /*========================= Рентабельность продаж по чистой прибыли============================*/
            
            .rentabclear .rectangle {
                position: absolute;
                width: 300px;
                height: 150px;
                left: 1200px;
                top: 420px;
                background: #30353E;
                border-radius: 20px;
                box-shadow: 5px 5px 5px #15161A;
            
            }
            .ftotal .textrentabclear {
                position: absolute;
                color: #c4c4c4;
                font-size: 24px;
                left: 1225px;
                top: 440px;
                width: 250px;
                text-align: center;
            }
            .ftotal .textrentabcleartwo {
                position: absolute;
                color: #CFC8FF;
                font-size: 34px;
                left: 1240px;
                top: 500px;
                width: 200px;
                text-align: center;
            }
            
            /*======================== Рентабельность оборотных активов =============================*/
            .rentabnooborotactiv .rectangle {
                position: absolute;
                width: 300px;
                height: 150px;
                left: 1550px;
                top: 420px;
                background: #30353E;
                border-radius: 20px;
                box-shadow: 5px 5px 5px #15161A;
            
            }
            .ftotal .textrentabnooborotactiv {
                position: absolute;
                color: #c4c4c4;
                font-size: 24px;
                left: 1575px;
                top: 440px;
                width: 250px;
                text-align: center;
            }
            .ftotal .textrentabnooborotactivtwo {
                position: absolute;
                color: #CFC8FF;
                font-size: 34px;
                left: 1590px;
                top: 500px;
                width: 200px;
                text-align: center;
            }
            
            
            /*========================= Коэффициент валовой рентабельности ============================*/
            
            .kfrentab .rectangle {
                position: absolute;
                width: 300px;
                height: 150px;
                left: 150px;
                top: 600px;
                background: #30353E;
                border-radius: 20px;
                box-shadow: 5px 5px 5px #15161A;
            
            }
            .ftotal .textkfrentab {
                position: absolute;
                color: #c4c4c4;
                font-size: 24px;
                left: 150px;
                top: 620px;
                width: 300px;
                text-align: center;
            }
            .ftotal .textkfrentabtwo {
                position: absolute;
                color: #CFC8FF;
                font-size: 34px;
                left: 200px;
                top: 680px;
                width: 200px;
                text-align: center;
            }
            
            /*=========================== EBITDA ==========================*/
            
            .ebitda .rectangle {
                position: absolute;
                width: 300px;
                height: 150px;
                left: 500px;
                top: 600px;
                background: #30353E;
                border-radius: 20px;
                box-shadow: 5px 5px 5px #15161A;
            
            }
            .ftotal .textebitda {
                position: absolute;
                color: #c4c4c4;
                font-size: 24px;
                left: 500px;
                top: 640px;
                width: 300px;
                text-align: center;
            }
            .ftotal .textebitdatwo {
                position: absolute;
                color: #CFC8FF;
                font-size: 34px;
                left: 550px;
                top: 670px;
                width: 200px;
                text-align: center;
            }
            /*========================= ROI ============================*/
            .roi .rectangle {
                position: absolute;
                width: 300px;
                height: 150px;
                left: 850px;
                top: 600px;
                background: #30353E;
                border-radius: 20px;
                box-shadow: 5px 5px 5px #15161A;
            
            }
            .ftotal .textroi {
                position: absolute;
                color: #c4c4c4;
                font-size: 24px;
                left: 850px;
                top: 640px;
                width: 300px;
                text-align: center;
            }
            .ftotal .textroitwo {
                position: absolute;
                color: #CFC8FF;
                font-size: 34px;
                left: 900px;
                top: 670px;
                width: 200px;
                text-align: center;
            }
            
            /*======================== Рентабельность =============================*/
            .rentab .rectangle {
                position: absolute;
                width: 300px;
                height: 150px;
                left: 1200px;
                top: 600px;
                background: #30353E;
                border-radius: 20px;
                box-shadow: 5px 5px 5px #15161A;
            
            }
            .ftotal .textrentab {
                position: absolute;
                color: #c4c4c4;
                font-size: 24px;
                left: 1200px;
                top: 640px;
                width: 300px;
                text-align: center;
            }
            .ftotal .textrentabtwo {
                position: absolute;
                color: #CFC8FF;
                font-size: 34px;
                left: 1250px;
                top: 670px;
                width: 200px;
                text-align: center;
            }
            
            /*========================== Маржинальность ===========================*/
            .marjin .rectangle {
                position: absolute;
                width: 300px;
                height: 150px;
                left: 1550px;
                top: 600px;
                background: #30353E;
                border-radius: 20px;
                box-shadow: 5px 5px 5px #15161A;
            
            }
            .ftotal .textmarjin {
                position: absolute;
                color: #c4c4c4;
                font-size: 24px;
                left: 1550px;
                top: 640px;
                width: 300px;
                text-align: center;
            }
            .ftotal .textmarjintwo {
                position: absolute;
                color: #CFC8FF;
                font-size: 34px;
                left: 1600px;
                top: 670px;
                width: 200px;
                text-align: center;
            }
            
            /*========================== Маржинальность % ===========================*/
            .marjinprocent .rectangle {
                position: absolute;
                width: 300px;
                height: 150px;
                left: 150px;
                top: 780px;
                background: #30353E;
                border-radius: 20px;
                box-shadow: 5px 5px 5px #15161A;
            }
            .ftotal .textmarjinprocent {
                position: absolute;
                color: #c4c4c4;
                font-size: 24px;
                left: 150px;
                top: 820px;
                width: 300px;
                text-align: center;
            }
            .ftotal .textmarjinprocenttwo {
                position: absolute;
                color: #CFC8FF;
                font-size: 34px;
                left: 200px;
                top: 850px;
                width: 200px;
                text-align: center;
            }
            
            /*========================= Логистические затраты ============================*/
            .logistics .rectangle {
                position: absolute;
                width: 300px;
                height: 150px;
                left: 500px;
                top: 780px;
                background: #30353E;
                border-radius: 20px;
                box-shadow: 5px 5px 5px #15161A;
            
            }
            .ftotal .textlogistics {
                position: absolute;
                color: #c4c4c4;
                font-size: 24px;
                left: 500px;
                top: 820px;
                width: 300px;
                text-align: center;
            }
            .ftotal .textlogisticstwo {
                position: absolute;
                color: #CFC8FF;
                font-size: 34px;
                left: 550px;
                top: 850px;
                width: 200px;
                text-align: center;
            }
            /*========================== Затраты упаковка ===========================*/
            .upakovka .rectangle {
                position: absolute;
                width: 300px;
                height: 150px;
                left: 850px;
                top: 780px;
                background: #30353E;
                border-radius: 20px;
                box-shadow: 5px 5px 5px #15161A;
            
            }
            .ftotal .textupakovka {
                position: absolute;
                color: #c4c4c4;
                font-size: 24px;
                left: 850px;
                top: 820px;
                width: 300px;
                text-align: center;
            }
            .ftotal .textupakovkatwo {
                position: absolute;
                color: #CFC8FF;
                font-size: 34px;
                left: 900px;
                top: 850px;
                width: 200px;
                text-align: center;
            }
            
            
            
            /*========================== Выручка ===========================*/
            .viruchka .rectangle {
                position: absolute;
                width: 300px;
                height: 150px;
                left: 1200px;
                top: 780px;
                background: #30353E;
                border-radius: 20px;
                box-shadow: 5px 5px 5px #15161A;
            
            }
            .ftotal .textviruchka {
                position: absolute;
                color: #c4c4c4;
                font-size: 24px;
                left: 1200px;
                top: 820px;
                width: 300px;
                text-align: center;
            }
            .ftotal .textviruchkatwo {
                position: absolute;
                color: #CFC8FF;
                font-size: 34px;
                left: 1250px;
                top: 850px;
                width: 200px;
                text-align: center;
            }
            
            
            /*========================== Чистая прибыль ===========================*/
            .clearprofit .rectangle {
                position: absolute;
                width: 300px;
                height: 150px;
                left: 1550px;
                top: 780px;
                background: #30353E;
                border-radius: 20px;
                box-shadow: 5px 5px 5px #15161A;
            
            }
            .ftotal .textclearprofit {
                position: absolute;
                color: #c4c4c4;
                font-size: 24px;
                left: 1550px;
                top: 820px;
                width: 300px;
                text-align: center;
            }
            .ftotal .textclearprofittwo {
                position: absolute;
                color: #CFC8FF;
                font-size: 34px;
                left: 1600px;
                top: 850px;
                width: 200px;
                text-align: center;
            }
            
            
            /*=====================================================*/
            
            /* ===========================================NALOG========================================== */
            
            
            .bordertablenalog {
                position: absolute;
                width: 1750px;
                height: 550px;
                left: 130px;
                top: 400px;
                border-radius: 20px;
                border: 2px solid #30353E
            
            }
            
            /* ------------------------------------------------------------------------------------------------ */
            .block_nalog__active .rectangle{
                border-style: solid;
                border-width: 2px;
                border-color: #CFC8FF;
            }
            .block_nalog6 .rectangle {
                position: absolute;
                width: 350px;
                height: 150px;
                left: 550px;
                top: 160px;
                background: #30353E;
                border-radius: 20px;
            }
            
            .block .textnalog6 {
                position: absolute;
                color: #c4c4c4;
                font-size: 24px;
                left: 570px;
                top: 180px;
                width: 300px;
                text-align: center;
            }
            .block .textnalog6two {
                position: absolute;
                color: #CFC8FF;
                font-size: 24px;
                left: 660px;
                top: 250px;
                text-align: center;
            }
            
            
            /* ============================================NALOG 15======================================================== */
            
            
            .block_nalog15 .rectangle {
                position: absolute;
                width: 350px;
                height: 150px;
                left: 550px;
                top: 160px;
                background: #30353E;
                border-radius: 20px;
            
            }
            .block .textnalog15 {
                position: absolute;
                color: #c4c4c4;
                font-size: 24px;
                left: 570px;
                top: 180px;
                width: 300px;
                text-align: center;
            }
            .block .textnalog15two {
                position: absolute;
                color: #CFC8FF;
                font-size: 24px;
                left: 610px;
                top: 250px;
                text-align: center;
            }
            
            .banerusn15 {
                position: absolute;
                left: 930px;
                top: 160px;
            }

            .banerusn15 :hover {
                transform: scale(1.1);
                -webkit-transform: scale(1.1);
                -ms-transform: scale(1.1);
            }
            
            /* -------------------------------------------NALOG 20---------------------------------------------- */
            
            
            
            .block_nalog20 .rectangle {
                position: absolute;
                width: 350px;
                height: 150px;
                left: 550px;
                top: 160px;
                background: #30353E;
                border-radius: 20px;
            
            
            }
            .block .textnalog20 {
                position: absolute;
                color: #c4c4c4;
                font-size: 24px;
                left: 570px;
                top: 180px;
                width: 300px;
                text-align: center;
            }
            .block .textnalog20two {
                position: absolute;
                color: #CFC8FF;
                font-size: 24px;
                left: 580px;
                top: 250px;
                text-align: center;
            }
            .banerusn20 {
                position: absolute;
                left: 930px;
                top: 160px;
            }

            .banerusn20 :hover {
                transform: scale(1.1);
                -webkit-transform: scale(1.1);
                -ms-transform: scale(1.1);
            }
            
            
            /* ------------------------------------------------NALOG 6-------------------------------------------------- */
            .textnalog {
                position:absolute;
                color: #c4c4c4;
                font-size: 24px;
                left: 130px;
                top: 170px;
                width: 350px;
                font-weight: 800;
            
            }
            
            .textnalogname {
                position:absolute;
                color: #c4c4c4;
                font-size: 24px;

                left: 130px;
                top: 160px;
                font-weight: 800;
            
            }
            
            .textnalogtitles {
                position:absolute;
                color: #c4c4c4;
                font-size: 16px;
                left: 130px;
                top: 230px;
                font-weight: 400;
                width: 400px;
            
            }
            .banerusn6 {
                position: absolute;
                left: 930px;
                top: 160px;
            }
            
            .banerusn6 :hover {
                transform: scale(1.1);
                -webkit-transform: scale(1.1);
                -ms-transform: scale(1.1);
            }
            
            
            /*=================== BARCODES =============*/
    
            .bordertablebarcod {
                position: absolute;
                width: 1750px;
                height: 720px;
                left: 130px;
                top: 220px;
                border-radius: 20px;
                border: 2px solid #30353E
            
            }

            
            .ticket .rectangle {
                position: absolute;
                width: 220px;
                height: 230px;
                left: 150px;
                top: 240px;
                background: #ffffff;
                border-radius: 20px;
            
            }

            .ticket .name {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 110px;
                top: 260px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            

            .ticket .brand {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 110px;
                top: 280px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            .ticket .barcodimage {
                position: absolute;
                color: #000000;
                font-size: 120px;
                left: 110px;
                top: 300px;
                width: 300px;
                text-align: center;
                /*font-weight: 400;*/
                font-family: 'Libre Barcode EAN13 Text', cursive;
            }
            
            .ticket .color {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 110px;
                top: 420px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            .ticket .size {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 110px;
                top: 440px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            .ticket .saveticket {
                position: absolute;
                left: 180px;
                top: 485px;
                cursor: pointer;
            }

             .ticket .saveticket :hover {
                transform: scale(1.1);
                -webkit-transform: scale(1.1);
                -ms-transform: scale(1.1);
            }

            /*=====================================================*/
            
            
            .ticket1 .rectangle {
                position: absolute;
                width: 220px;
                height: 230px;
                left: 400px;
                top: 240px;
                background: #ffffff;
                border-radius: 20px;
            
            }
            
            .ticket1 .name {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 360px;
                top: 260px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            
            .ticket1 .brand {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 360px;
                top: 280px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            .ticket1 .barcodimage {
                position: absolute;
                color: #000000;
                font-size: 120px;
                left: 360px;
                top: 300px;
                width: 300px;
                text-align: center;
                /*font-weight: 400;*/
                font-family: 'Libre Barcode EAN13 Text', cursive;
            }
            
            .ticket1 .color {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 360px;
                top: 420px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            .ticket1 .size {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 360px;
                top: 440px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            /*=====================================================*/
            
            .ticket2 .rectangle {
                position: absolute;
                width: 220px;
                height: 230px;
                left: 650px;
                top: 240px;
                background: #ffffff;
                border-radius: 20px;
            
            }
            
            .ticket2 .name {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 610px;
                top: 260px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            
            .ticket2 .brand {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 610px;
                top: 280px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            .ticket2 .barcodimage {
                position: absolute;
                color: #000000;
                font-size: 120px;
                left: 610px;
                top: 300px;
                width: 300px;
                text-align: center;
                /*font-weight: 400;*/
                font-family: 'Libre Barcode EAN13 Text', cursive;
            }
            
            .ticket2 .color {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 610px;
                top: 420px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            .ticket2 .size {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 610px;
                top: 440px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            /*=====================================================*/
            
            .ticket3 .rectangle {
                position: absolute;
                width: 220px;
                height: 230px;
                left: 900px;
                top: 240px;
                background: #ffffff;
                border-radius: 20px;
            
            }
            
            .ticket3 .name {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 860px;
                top: 260px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            
            .ticket3 .brand {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 860px;
                top: 280px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            .ticket3 .barcodimage {
                position: absolute;
                color: #000000;
                font-size: 120px;
                left: 860px;
                top: 300px;
                width: 300px;
                text-align: center;
                /*font-weight: 400;*/
                font-family: 'Libre Barcode EAN13 Text', cursive;
            }
            
            .ticket3 .color {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 860px;
                top: 420px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            .ticket3 .size {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 860px;
                top: 440px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            /*=====================================================*/
            .ticket4 .rectangle {
                position: absolute;
                width: 220px;
                height: 230px;
                left: 1150px;
                top: 240px;
                background: #ffffff;
                border-radius: 20px;
            
            }
            
            .ticket4 .name {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 1110px;
                top: 260px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            
            .ticket4 .brand {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 1110px;
                top: 280px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            .ticket4 .barcodimage {
                position: absolute;
                color: #000000;
                font-size: 120px;
                left: 1110px;
                top: 300px;
                width: 300px;
                text-align: center;
                /*font-weight: 400;*/
                font-family: 'Libre Barcode EAN13 Text', cursive;
            }
            
            .ticket4 .color {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 1110px;
                top: 420px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            .ticket4 .size {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 1110px;
                top: 440px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            /*=====================================================*/
            .ticket5 .rectangle {
                position: absolute;
                width: 220px;
                height: 230px;
                left: 1400px;
                top: 240px;
                background: #ffffff;
                border-radius: 20px;
            
            }
            
            .ticket5 .name {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 1360px;
                top: 260px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            
            .ticket5 .brand {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 1360px;
                top: 280px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            .ticket5 .barcodimage {
                position: absolute;
                color: #000000;
                font-size: 120px;
                left: 1360px;
                top: 300px;
                width: 300px;
                text-align: center;
                /*font-weight: 400;*/
                font-family: 'Libre Barcode EAN13 Text', cursive;
            }
            
            .ticket5 .color {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 1360px;
                top: 420px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            .ticket5 .size {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 1360px;
                top: 440px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            /*=====================================================*/

            .ticket6 .rectangle {
                position: absolute;
                width: 220px;
                height: 230px;
                left: 1650px;
                top: 240px;
                background: #ffffff;
                border-radius: 20px;
            
            }
            
            .ticket6 .name {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 1610px;
                top: 260px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            
            .ticket6 .brand {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 1610px;
                top: 280px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            .ticket6 .barcodimage {
                position: absolute;
                color: #000000;
                font-size: 120px;
                left: 1610px;
                top: 300px;
                width: 300px;
                text-align: center;
                /*font-weight: 400;*/
                font-family: 'Libre Barcode EAN13 Text', cursive;
            }
            
            .ticket6 .color {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 1610px;
                top: 420px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            .ticket6 .size {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 1610px;
                top: 440px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            /*=====================================================*/
            .ticket7 .rectangle {
                position: absolute;
                width: 220px;
                height: 230px;
                left: 150px;
                top: 500px;
                background: #ffffff;
                border-radius: 20px;
            
            }
            
            .ticket7 .name {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 110px;
                top: 520px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            
            .ticket7 .brand {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 110px;
                top: 540px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            .ticket7 .barcodimage {
                position: absolute;
                color: #000000;
                font-size: 120px;
                left: 110px;
                top: 560px;
                width: 300px;
                text-align: center;
                /*font-weight: 400;*/
                font-family: 'Libre Barcode EAN13 Text', cursive;
            }
            
            .ticket7 .color {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 110px;
                top: 680px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            .ticket7 .size {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 110px;
                top: 700px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            /*=====================================================*/

            .ticket8 .rectangle {
                position: absolute;
                width: 220px;
                height: 230px;
                left: 400px;
                top: 500px;
                background: #ffffff;
                border-radius: 20px;
            
            }
            
            .ticket8 .name {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 360px;
                top: 520px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            
            .ticket8 .brand {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 360px;
                top: 540px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            .ticket8 .barcodimage {
                position: absolute;
                color: #000000;
                font-size: 120px;
                left: 360px;
                top: 560px;
                width: 300px;
                text-align: center;
                /*font-weight: 400;*/
                font-family: 'Libre Barcode EAN13 Text', cursive;
            }
            
            .ticket8 .color {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 360px;
                top: 680px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            .ticket8 .size {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 360px;
                top: 700px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            /*=====================================================*/
            
            .ticket9 .rectangle {
                position: absolute;
                width: 220px;
                height: 230px;
                left: 650px;
                top: 500px;
                background: #ffffff;
                border-radius: 20px;
            
            }
            
            .ticket9 .name {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 610px;
                top: 520px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            
            .ticket9 .brand {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 610px;
                top: 540px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            .ticket9 .barcodimage {
                position: absolute;
                color: #000000;
                font-size: 120px;
                left: 610px;
                top: 560px;
                width: 300px;
                text-align: center;
                /*font-weight: 400;*/
                font-family: 'Libre Barcode EAN13 Text', cursive;
            }
            
            .ticket9 .color {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 610px;
                top: 680px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            .ticket9 .size {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 610px;
                top: 700px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            /*=====================================================*/
            
            .ticket10 .rectangle {
                position: absolute;
                width: 220px;
                height: 230px;
                left: 900px;
                top: 500px;
                background: #ffffff;
                border-radius: 20px;
            
            }
            
            .ticket10 .name {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 860px;
                top: 520px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            
            .ticket10 .brand {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 860px;
                top: 540px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            .ticket10 .barcodimage {
                position: absolute;
                color: #000000;
                font-size: 120px;
                left: 860px;
                top: 560px;
                width: 300px;
                text-align: center;
                /*font-weight: 400;*/
                font-family: 'Libre Barcode EAN13 Text', cursive;
            }
            
            .ticket10 .color {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 860px;
                top: 680px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            .ticket10 .size {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 860px;
                top: 700px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            /*=====================================================*/
            .ticket11 .rectangle {
                position: absolute;
                width: 220px;
                height: 230px;
                left: 1150px;
                top: 500px;
                background: #ffffff;
                border-radius: 20px;
            
            }
            
            .ticket11 .name {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 1110px;
                top: 520px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            
            .ticket11 .brand {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 1110px;
                top: 540px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            .ticket11 .barcodimage {
                position: absolute;
                color: #000000;
                font-size: 120px;
                left: 1110px;
                top: 560px;
                width: 300px;
                text-align: center;
                /*font-weight: 400;*/
                font-family: 'Libre Barcode EAN13 Text', cursive;
            }
            
            .ticket11 .color {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 1110px;
                top: 680px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            .ticket11 .size {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 1110px;
                top: 700px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            /*=====================================================*/
            .ticket12 .rectangle {
                position: absolute;
                width: 220px;
                height: 230px;
                left: 1400px;
                top: 500px;
                background: #ffffff;
                border-radius: 20px;
            
            }
            
            .ticket12 .name {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 1360px;
                top: 520px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            
            .ticket12 .brand {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 1360px;
                top: 540px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            .ticket12 .barcodimage {
                position: absolute;
                color: #000000;
                font-size: 120px;
                left: 1360px;
                top: 560px;
                width: 300px;
                text-align: center;
                /*font-weight: 400;*/
                font-family: 'Libre Barcode EAN13 Text', cursive;
            }
            
            .ticket12 .color {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 1360px;
                top: 680px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            .ticket12 .size {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 1360px;
                top: 700px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            /*=====================================================*/

            .ticket13 .rectangle {
                position: absolute;
                width: 220px;
                height: 230px;
                left: 1650px;
                top: 500px;
                background: #ffffff;
                border-radius: 20px;
            
            }
            
            .ticket13 .name {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 1610px;
                top: 520px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            
            .ticket13 .brand {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 1610px;
                top: 540px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            .ticket13 .barcodimage {
                position: absolute;
                color: #000000;
                font-size: 120px;
                left: 1610px;
                top: 560px;
                width: 300px;
                text-align: center;
                /*font-weight: 400;*/
                font-family: 'Libre Barcode EAN13 Text', cursive;
            }
            
            .ticket13 .color {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 1610px;
                top: 680px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            .ticket13 .size {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 1610px;
                top: 700px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            /*=====================================================*/
            .ticket14 .rectangle {
                position: absolute;
                width: 220px;
                height: 230px;
                left: 150px;
                top: 760px;
                background: #ffffff;
                border-radius: 20px;
            
            }
            
            .ticket14 .name {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 110px;
                top: 780px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            
            .ticket14 .brand {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 110px;
                top: 800px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            .ticket14 .barcodimage {
                position: absolute;
                color: #000000;
                font-size: 120px;
                left: 110px;
                top: 820px;
                width: 300px;
                text-align: center;
                /*font-weight: 400;*/
                font-family: 'Libre Barcode EAN13 Text', cursive;
            }
            
            .ticket14 .color {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 110px;
                top: 940px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            .ticket14 .size {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 110px;
                top: 960px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            /*=====================================================*/
            
            .ticket15 .rectangle {
                position: absolute;
                width: 220px;
                height: 230px;
                left: 400px;
                top: 760px;
                background: #ffffff;
                border-radius: 20px;
            
            }
            
            .ticket15 .name {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 360px;
                top: 780px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            
            .ticket15 .brand {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 360px;
                top: 800px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            .ticket15 .barcodimage {
                position: absolute;
                color: #000000;
                font-size: 120px;
                left: 360px;
                top: 820px;
                width: 300px;
                text-align: center;
                /*font-weight: 400;*/
                font-family: 'Libre Barcode EAN13 Text', cursive;
            }
            
            .ticket15 .color {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 360px;
                top: 940px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            .ticket15 .size {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 360px;
                top: 960px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            /*=====================================================*/
            
            .ticket16 .rectangle {
                position: absolute;
                width: 220px;
                height: 230px;
                left: 650px;
                top: 760px;
                background: #ffffff;
                border-radius: 20px;
            
            }
            
            .ticket16 .name {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 610px;
                top: 780px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            
            .ticket16 .brand {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 610px;
                top: 800px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            .ticket16 .barcodimage {
                position: absolute;
                color: #000000;
                font-size: 120px;
                left: 610px;
                top: 820px;
                width: 300px;
                text-align: center;
                /*font-weight: 400;*/
                font-family: 'Libre Barcode EAN13 Text', cursive;
            }
            
            .ticket16 .color {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 610px;
                top: 940px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            .ticket16 .size {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 610px;
                top: 960px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            /*=====================================================*/
            .ticket17 .rectangle {
                position: absolute;
                width: 220px;
                height: 230px;
                left: 900px;
                top: 760px;
                background: #ffffff;
                border-radius: 20px;
            
            }
            
            .ticket17 .name {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 860px;
                top: 780px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            
            .ticket17 .brand {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 860px;
                top: 800px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            .ticket17 .barcodimage {
                position: absolute;
                color: #000000;
                font-size: 120px;
                left: 860px;
                top: 820px;
                width: 300px;
                text-align: center;
                /*font-weight: 400;*/
                font-family: 'Libre Barcode EAN13 Text', cursive;
            }
            
            .ticket17 .color {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 860px;
                top: 940px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            .ticket17 .size {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 860px;
                top: 960px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            /*=====================================================*/
            .ticket18 .rectangle {
                position: absolute;
                width: 220px;
                height: 230px;
                left: 1150px;
                top: 760px;
                background: #ffffff;
                border-radius: 20px;
            
            }
            
            .ticket18 .name {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 1110px;
                top: 780px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            
            .ticket18 .brand {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 1110px;
                top: 800px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            .ticket18 .barcodimage {
                position: absolute;
                color: #000000;
                font-size: 120px;
                left: 1110px;
                top: 820px;
                width: 300px;
                text-align: center;
                /*font-weight: 400;*/
                font-family: 'Libre Barcode EAN13 Text', cursive;
            }
            
            .ticket18 .color {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 1110px;
                top: 940px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            .ticket18 .size {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 1110px;
                top: 960px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            /*=====================================================*/

            .ticket19 .rectangle {
                position: absolute;
                width: 220px;
                height: 230px;
                left: 1400px;
                top: 760px;
                background: #ffffff;
                border-radius: 20px;
            
            }
            
            .ticket19 .name {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 1360px;
                top: 780px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            
            .ticket19 .brand {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 1360px;
                top: 800px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            .ticket19 .barcodimage {
                position: absolute;
                color: #000000;
                font-size: 120px;
                left: 1360px;
                top: 820px;
                width: 300px;
                text-align: center;
                /*font-weight: 400;*/
                font-family: 'Libre Barcode EAN13 Text', cursive;
            }
            
            .ticket19 .color {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 1360px;
                top: 940px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            .ticket19 .size {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 1360px;
                top: 960px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            /*=====================================================*/
            .ticket20 .rectangle {
                position: absolute;
                width: 220px;
                height: 230px;
                left: 1650px;
                top: 760px;
                background: #ffffff;
                border-radius: 20px;
            }
            
            .ticket20 .name {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 1610px;
                top: 780px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            
            .ticket20 .brand {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 1610px;
                top: 800px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            .ticket20 .barcodimage {
                position: absolute;
                color: #000000;
                font-size: 120px;
                left: 1610px;
                top: 820px;
                width: 300px;
                text-align: center;
                /*font-weight: 400;*/
                font-family: 'Libre Barcode EAN13 Text', cursive;
            }
            
            .ticket20 .color {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 1610px;
                top: 940px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            .ticket20 .size {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 1610px;
                top: 960px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            /*=====================================================*/
            

            .ticket21 .rectangle {
                position: absolute;
                width: 220px;
                height: 230px;
                left: 150px;
                top: 1020px;
                background: #ffffff;
                border-radius: 20px;
            
            }
            
            .ticket21 .name {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 110px;
                top: 1040px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            
            .ticket21 .brand {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 110px;
                top: 1060px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            .ticket21 .barcodimage {
                position: absolute;
                color: #000000;
                font-size: 120px;
                left: 110px;
                top: 1080px;
                width: 300px;
                text-align: center;
                /*font-weight: 400;*/
                font-family: 'Libre Barcode EAN13 Text', cursive;
            }
            
            .ticket21 .color {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 110px;
                top: 1200px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            .ticket21 .size {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 110px;
                top: 1220px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            /*=====================================================*/
            
            .ticket22 .rectangle {
                position: absolute;
                width: 220px;
                height: 230px;
                left: 400px;
                top: 1020px;
                background: #ffffff;
                border-radius: 20px;
            
            }
            
            .ticket22 .name {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 360px;
                top: 1040px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            
            .ticket22 .brand {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 360px;
                top: 1060px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            .ticket22 .barcodimage {
                position: absolute;
                color: #000000;
                font-size: 120px;
                left: 360px;
                top: 1080px;
                width: 300px;
                text-align: center;
                /*font-weight: 400;*/
                font-family: 'Libre Barcode EAN13 Text', cursive;
            }
            
            .ticket22 .color {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 360px;
                top: 1200px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            .ticket22 .size {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 360px;
                top: 1220px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            /*=====================================================*/
             
            .ticket23 .rectangle {
                position: absolute;
                width: 220px;
                height: 230px;
                left: 650px;
                top: 1020px;
                background: #ffffff;
                border-radius: 20px;
            
            }
            
            .ticket23 .name {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 610px;
                top: 1040px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            
            .ticket23 .brand {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 610px;
                top: 1060px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            .ticket23 .barcodimage {
                position: absolute;
                color: #000000;
                font-size: 120px;
                left: 610px;
                top: 1080px;
                width: 300px;
                text-align: center;
                /*font-weight: 400;*/
                font-family: 'Libre Barcode EAN13 Text', cursive;
            }
            
            .ticket23 .color {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 610px;
                top: 1200px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            .ticket23 .size {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 610px;
                top: 1220px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
           

            /*=====================================================*/

              
            .ticket24 .rectangle {
                position: absolute;
                width: 220px;
                height: 230px;
                left: 900px;
                top: 1020px;
                background: #ffffff;
                border-radius: 20px;
            
            }
            
            .ticket24 .name {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 860px;
                top: 1040px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            
            .ticket24 .brand {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 860px;
                top: 1060px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            .ticket24 .barcodimage {
                position: absolute;
                color: #000000;
                font-size: 120px;
                left: 860px;
                top: 1080px;
                width: 300px;
                text-align: center;
                /*font-weight: 400;*/
                font-family: 'Libre Barcode EAN13 Text', cursive;
            }
            
            .ticket24 .color {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 860px;
                top: 1200px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            .ticket24 .size {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 860px;
                top: 1220px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
           

            /*=====================================================*/

            
              
            .ticket25 .rectangle {
                position: absolute;
                width: 220px;
                height: 230px;
                left: 1150px;
                top: 1020px;
                background: #ffffff;
                border-radius: 20px;
            
            }
            
            .ticket25 .name {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 1110px;
                top: 1040px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            
            .ticket25 .brand {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 1110px;
                top: 1060px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            .ticket25 .barcodimage {
                position: absolute;
                color: #000000;
                font-size: 120px;
                left: 1110px;
                top: 1080px;
                width: 300px;
                text-align: center;
                /*font-weight: 400;*/
                font-family: 'Libre Barcode EAN13 Text', cursive;
            }
            
            .ticket25 .color {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 1110px;
                top: 1200px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            .ticket25 .size {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 1110px;
                top: 1220px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
           

            /*=====================================================*/

               
            .ticket26 .rectangle {
                position: absolute;
                width: 220px;
                height: 230px;
                left: 1400px;
                top: 1020px;
                background: #ffffff;
                border-radius: 20px;
            
            }
            
            .ticket26 .name {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 1360px;
                top: 1040px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            
            .ticket26 .brand {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 1360px;
                top: 1060px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            .ticket26 .barcodimage {
                position: absolute;
                color: #000000;
                font-size: 120px;
                left: 1360px;
                top: 1080px;
                width: 300px;
                text-align: center;
                /*font-weight: 400;*/
                font-family: 'Libre Barcode EAN13 Text', cursive;
            }
            
            .ticket26 .color {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 1360px;
                top: 1200px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            .ticket26 .size {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 1360px;
                top: 1220px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
           

            /*=====================================================*/

            
            /*=====================================================*/

               
            .ticket27 .rectangle {
                position: absolute;
                width: 220px;
                height: 230px;
                left: 1650px;
                top: 1020px;
                background: #ffffff;
                border-radius: 20px;
            
            }
            
            .ticket27 .name {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 1610px;
                top: 1040px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            
            .ticket27 .brand {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 1610px;
                top: 1060px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }

            .ticket27 .barcodimage {
                position: absolute;
                color: #000000;
                font-size: 120px;
                left: 1610px;
                top: 1080px;
                width: 300px;
                text-align: center;
                /*font-weight: 400;*/
                font-family: 'Libre Barcode EAN13 Text', cursive;
            }
            
            .ticket27 .color {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 1610px;
                top: 1200px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
            .ticket27 .size {
                position: absolute;
                color: #000000;
                font-size: 16px;
                left: 1610px;
                top: 1220px;
                width: 300px;
                text-align: center;
                font-weight: 800;
            }
           

            /*=====================================================*/
           
            
            
            /* ==================================================================================================================================================== */
            
            /* ============ Responsive / Breakpoints ========== */
            @media (max-width: 1080px){
            
            }
            
            /* For Medium Devices */
            @media (max-width: 774px){
            
            }
            @media (max-width: 560px){
            
            }
            
            /* For Small Devices */
            @media (max-width: 360px){
            
            }
          `}
                </style>
            )
        }
    }, [router.isReady])


    return <>
        {styles}
        <Component {...pageProps} />
    </>
}

export default MyApp
