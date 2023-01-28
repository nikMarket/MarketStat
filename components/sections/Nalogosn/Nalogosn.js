import { useCallback, useEffect, useState } from "react";
import { SectionTop } from "../sectionTop/sectionTop";
import { useAuth } from "../../../lib/hooks/useAuth";
import { useSubjectsData } from "../../../lib/hooks/useSubjectsData";



function makeId(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const CalcRow = ({ id, activeNalogosn, defStore = "", defCategory = "", defSubject = "",
    defName = "", defBrand = "", defColor = "",
    defSize = "", defCount = 0, defCost = 0, defBarcode = "" }) => {
    const auth = useAuth();
    const subjectsDataFunc = useSubjectsData();

    const [currentId, setCurrentId] = useState(JSON.parse(JSON.stringify(id)));
    const [currentSubject, setCurrentSubject] = useState(JSON.parse(JSON.stringify(defSubject)));
    const [currentCategory, setCurrentCategory] = useState(JSON.parse(JSON.stringify(defCategory)));
    const [currentStore, setCurrentStore] = useState(JSON.parse(JSON.stringify(defStore)));
    const [listSubjects, setListSubjects] = useState([]);
    const [packaging, setPackaging] = useState("");
    const [subjectData, setSubjectData] = useState({});
    const [logisticMarketplace, setLogisticMarketplace] = useState("");
    const [logistic, setLogistic] = useState("");
    const [commission, setCommission] = useState("");
    const [price, setPrice] = useState("");
    const [fullPrice, setFullPrice] = useState("");
    const [turnover, setTurnover] = useState("");
    const [cost, setCost] = useState(JSON.parse(JSON.stringify(defCost)));
    const [name, setName] = useState(JSON.parse(JSON.stringify(defName)));
    const [brand, setBrand] = useState(JSON.parse(JSON.stringify(defBrand)));
    const [color, setColor] = useState(JSON.parse(JSON.stringify(defColor)));
    const [size, setSize] = useState(JSON.parse(JSON.stringify(defSize)));
    const [count, setCount] = useState(JSON.parse(JSON.stringify(defCount)));
    const [barcode, setBarcode] = useState(JSON.parse(JSON.stringify(defBarcode)));

    const [isRemoved, setIsRemoved] = useState(false);

    useEffect(() => {
        if (currentCategory === "" || currentStore === "" || currentSubject === "") return;
        subjectsDataFunc.getSubjectData(currentStore, currentCategory, currentSubject).then(res => {
            setSubjectData(res);
        })
    }, [currentSubject]);

    useEffect(() => {
        if (currentCategory === "" || currentStore === "" || currentSubject === "") return;
        setPackaging(subjectData.CostLogisticsBox * 0.25)
    }, [subjectData, currentSubject]);

    useEffect(() => {
        if (currentCategory === "" || currentStore === "" || currentSubject === "") return;
        setLogisticMarketplace(subjectData.CostLogisticsBox)
    }, [subjectData, currentSubject]);

    useEffect(() => {
        setLogistic(logisticMarketplace * 0.35)
    }, [logisticMarketplace]);

    useEffect(() => {
        setCommission(subjectData.CommissionPercentage);
    }, [subjectData, currentSubject])


    useEffect(() => {
        if (currentSubject === "") return;
        subjectsDataFunc.getPrices(currentSubject).then(res => setPrice(res.price));
    }, [subjectData, currentSubject]);

    useEffect(() => {
        if (currentSubject === "") return;
        subjectsDataFunc.getPrices(currentSubject).then(res => setFullPrice(res.fullPrice));
    }, [subjectData, currentSubject]);

    useEffect(() => {
        if (currentCategory === "") return;
        subjectsDataFunc.getTurnover(currentCategory).then(res => {
            setTurnover(res)
        });
    }, [subjectData, currentCategory]);

    const onSave = useCallback(async () => {
        console.log(currentStore);
        console.log(currentCategory);
        console.log(currentSubject);
        console.log(name);
        console.log(brand);
        console.log(color);
        console.log(size);
        console.log(count);
        console.log(cost);
        console.log(barcode);

        if (!auth.user) return;

        if (currentId === -1) {
            let newId = await subjectsDataFunc.addCalculation({
                user_id: auth.user.id,
                store: currentStore,
                category: currentCategory,
                subject: currentSubject,
                name: name,
                brand: brand,
                color: color,
                size: size,
                count: count,
                cost: cost,
                barcode: barcode,
            }).id;
            newId = parseInt(newId);
            setCurrentId(newId);
        }
        else {
            await subjectsDataFunc.updateCalculation(currentId, {
                user_id: auth.user.id,
                store: currentStore,
                category: currentCategory,
                subject: currentSubject,
                name: name,
                brand: brand,
                color: color,
                size: size,
                count: count,
                cost: cost,
                barcode: barcode,
            });
        }
    }, [currentStore, currentCategory, currentSubject, currentId, name, brand, color, size, count, cost, barcode]);

    const updateListSubjects = useCallback(async () => {
        if (currentCategory !== "" && currentStore !== "") {
            const newList = await subjectsDataFunc.getSubjects(currentStore, currentCategory);
            setListSubjects(newList);
        }
    }, [currentStore, currentCategory, subjectsDataFunc, subjectsDataFunc.getSubjects, setListSubjects]);

    const onDelete = useCallback(async () => {
        setIsRemoved(true);
        if (currentId !== -1)
            await subjectsDataFunc.deleteCalculation(currentId);
    }, [currentId, subjectsDataFunc, subjectsDataFunc.deleteCalculation, setIsRemoved]);

    useEffect(() => {
        updateListSubjects();
    }, [currentStore, currentCategory, defStore, defCategory]);





    return isRemoved ? "" :
        <tr>
            <td><input type="text" class="inputbarcod" defaultValue={barcode} disabled /></td>
            <td><input type="text" class="inputname" defaultValue={name} disabled /></td>
            <td><input type="text" class="inputbrand" defaultValue={brand} disabled /></td>
            <td><input type="text" class="inputsize" defaultValue={size} disabled /></td>
            <td><input type="text" class="inputcolor" defaultValue={color} disabled /></td>
            <td><input type="number" class="inputcount" defaultValue={count} disabled /></td>
            <td><input type="number" class="inputsebest" defaultValue={cost} disabled /></td>
            <td>{(price)}&nbsp;&nbsp;₽</td>
            <td>{parseFloat(logistic + packaging + cost).toFixed(2)}&nbsp;&nbsp;₽</td>
            <td>{parseFloat(((price - (subjectData.CostStorageBox * turnover) - logisticMarketplace - (commission * price / 100) - logistic - packaging - cost) / 100 * 20).toFixed(2))}&nbsp;&nbsp;₽</td>
            <td>{parseFloat((((price - (subjectData.CostStorageBox * turnover) - logisticMarketplace - (commission * price / 100) - logistic - packaging - cost) / 100 * 20) * count).toFixed(2))}&nbsp;&nbsp;₽</td>
            <td>{parseFloat(((price - (subjectData.CostStorageBox * turnover) - logisticMarketplace - (commission * price / 100) - logistic - packaging - cost) / 100 * 20).toFixed(2))}&nbsp;&nbsp;₽</td>
            <td>{parseFloat((((price - (subjectData.CostStorageBox * turnover) - logisticMarketplace - (commission * price / 100) - logistic - packaging - cost) / 100 * 20) * count).toFixed(2))}&nbsp;&nbsp;₽</td>

        </tr>
}



export const Nalogosn = () => {
    const [activeNalogosn, setActiveNalogosn] = useState(0);
    const auth = useAuth();
    const subjectsDataFunc = useSubjectsData();
    const [sections, setSections] = useState([]);
    useEffect(() => {
        console.log(auth);
        if (!auth.user) return;
        subjectsDataFunc.getCalculations(auth.user.id).then(res => {
            console.log(res);
            const newSections = res.map(data => {
                // console.log(data);
                return <CalcRow auth={auth} subjectsDataFunc={subjectsDataFunc} id={data.id} activeNalogosn={activeNalogosn}
                    defStore={data.Store} defCategory={data.Category} defSubject={data.Subject}
                    defName={data.Name} defBrand={data.Brand} defColor={data.Color}
                    defSize={data.Size} defCount={data.Count} defCost={data.Cost} defBarcode={data.Barcode}
                    key={makeId(8)} />
            });
            setSections(newSections);

        });
    }, [auth.user]);



    return (

        <section className="home">
            <SectionTop />
            <div className="block">

                <div className="block_nalog20">
                    <div className="rectangle"></div>
                </div>

                <div className="textnalog20">Общая система налогооблажения</div>
                <div className="textnalog20two">Доходы-Расходы 20% +НДС</div>

                <div className="banerusn15">
                    <a href="https://www.marketstat.app/nalog20"><img src="/img/Banerusn20.svg" height="150px" /></a>
                </div>

            </div>


            <div className="textnalog">Выберите режим налогооблажения</div>
            <div className="textnalogname"></div>
            <div className="textnalogtitles">Совокупность сборов, которые взимаются с организации или индивидуального предпринимателя в установленном законодательством порядке, называют системой налогообложения.</div>

            <div className="bordertable">
                <div className="rectangle"></div>
            </div>


            <div className="units-table">
                <div className="table">
                    <table>
                        <thead>
                            <tr>
                                <th>Баркод</th>
                                <th>Наименование</th>
                                <th>Бренд</th>
                                <th>Размер</th>
                                <th>Цвет</th>
                                <th>Количество</th>
                                <th>Себестоимость</th>
                                <th>Цена</th>
                                <th>Издержки</th>
                                <th>Налог</th>
                                <th>Налог&nbsp;&nbsp;общий</th>
                                <th>НДС</th>
                                <th>НДС&nbsp;&nbsp;общий</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sections}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}