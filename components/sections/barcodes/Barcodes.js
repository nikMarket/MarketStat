import React, { useRef } from "react";
import { SectionTop } from "../sectionTop/sectionTop";
import { useEffect, useState } from "react";
import { useSubjectsData } from "../../../lib/hooks/useSubjectsData";
import { useAuth } from "../../../lib/hooks/useAuth";
import { render } from "react-dom"
import { useReactToPrint } from "react-to-print";
import Script from "next/script";




function makeId(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const Barcodes = () => {
    const auth = useAuth();
    const [tickets, setTickets] = useState([]);
    const subjectsDataFunc = useSubjectsData();


    useEffect(() => {
        console.log(auth);
        if (!auth.user) return;
        subjectsDataFunc.getCalculations(auth.user.id).then(res => {
            console.log(res);
            const newTickets = res.map((data, i) => {
                // console.log(data);
                return (
                    <div className={"ticket ticket" + i} key={makeId(8)}>
                        <div className="rectangle"></div>
                        <div className="name">{data.Name}</div>
                        <div className="brand">{data.Brand}</div>
                        <div className="barcodimage">{data.Barcode}</div>
                        <div className="color">Цвет:{data.Color}</div>
                        <div className="size">Размер:{data.Size}</div>
                    </div>
                );






            });
            setTickets(newTickets);
        });
    }, [auth.user]);

    return (
        <section class="home">
            <SectionTop />
            <div class="texttitlesbarcod">Маркировка товаров (стикеры)</div>

            <div class="bordertablebarcod">
                <div class="rectangle"></div>
            </div>

            {tickets}
        </section>
    )


}

