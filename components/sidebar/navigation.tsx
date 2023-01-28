import { ReactElement } from "react";
import { FinancialProduct } from "../sections/financialProduct/FinancialProduct";
import { Barcodes } from "../sections/barcodes/Barcodes";
import { Unit } from "../sections/unit/Unit";
import { Nalog } from "../sections/nalog/Nalog";
import { Nalogusn } from "../sections/Nalogusn/Nalogusn"
import { Nalogosn } from "../sections/Nalogosn/Nalogosn";
import { Account } from "../account/Account";




export interface MenuElement {
    id: number,
    name: ReactElement,
    icon: ReactElement,
    content: ReactElement,
}

export const menuElements: Array<MenuElement> = [
    {
        id: 0,
        name: <div className="textuniteconomy">UNIT-Экономика</div>,
        icon: <div className="icouniteconomy"><img src="/img/Uniticon.svg" alt="icouniteconomy" height="40px" /></div>,
        content: <Unit />
    },
    {
        id: 1,
        name: <div className="textbarnalog">Расчет налогов (УСН 6%)</div>,
        icon: <div className="icobarnalog"><img src="/img/nalog6.svg" alt="icobarnalog" height="45px" /></div>,
        content: <Nalog />
    },
    {
        id: 2,
        name: <div className="textbarnalogusn">Расчет налогов (УСН 15%)</div>,
        icon: <div className="icobarnalogusn"><img src="/img/nalogusn.svg" alt="icobarnalog15" height="45px" /></div>,
        content: <Nalogusn />
    },
    {
        id: 3,
        name: <div className="textbarnalogosn">Расчет налогов (ОСН 20%)</div>,
        icon: <div className="icobarnalogosn"><img src="/img/nalog20.svg" alt="icobarnalog20" height="45px" /></div>,
        content: <Nalogosn />
    },
    {
        id: 4,
        name: <div className="textbarfin">Финансовые показатели</div>,
        icon: <div className="icobarfin"><img src="/img/fin.svg" alt="icobarfin" height="40px" /></div>,
        content: <FinancialProduct />
    },
    {
        id: 5,
        name: <div className="textbarcod">Маркировка товара</div>,
        icon: <div className="icobarcod"><img src="/img/barcod.svg" alt="icobarcod" height="40px" /></div>,
        content: <Barcodes />
    },
    {
        id: 6,
        name: <div className="textusercabinet">Личный кабинет</div>,
        icon: <div className="icousercabinet"><img src="/img/Profile.svg" alt="icousercabinet" height="40px" /></div>,
        content: <Account />
    },
    {
        id: 7,
        name: <div className="textlogout">Выйти из аккаунта</div>,
        icon: <div className="icologout"><img src="/img/logout.svg" alt="icologout" height="40px" /></div>,
        content: <></>
    },
];