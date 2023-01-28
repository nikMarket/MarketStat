import { SectionTop } from "../sectionTop/sectionTop";
import { useSubjectsData } from "../../../lib/hooks/useSubjectsData";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "../../../lib/hooks/useAuth";

function makeId(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const CalcRow = ({ id, defStore = "", defCategory = "", defSubject = "",
    defName = "", defBrand = "", defColor = "",
    defSize = "", defCount = 0, defCost = 0, defBarcode = "",
    allTotalDebet, setAllTotalDebet, allTotalMarg, setAllTotalMarg, allTotalEbida, setAllTotalEbida }) => {

    const auth = useAuth();
    const subjectsDataFunc = useSubjectsData();

    const [currentId, setCurrentId] = useState(JSON.parse(JSON.stringify(id)));
    const [currentSubject, setCurrentSubject] = useState(JSON.parse(JSON.stringify(defSubject)));
    const [currentCategory, setCurrentCategory] = useState(JSON.parse(JSON.stringify(defCategory)));
    const [currentStore, setCurrentStore] = useState(JSON.parse(JSON.stringify(defStore)));
    const [listSubjects, setListSubjects] = useState([]);
    const [packaging, setPackaging] = useState(0);
    const [subjectData, setSubjectData] = useState({});
    const [logisticMarketplace, setLogisticMarketplace] = useState(0);
    const [logistic, setLogistic] = useState(0);
    const [commission, setCommission] = useState(0);
    const [price, setPrice] = useState(0);
    const [fullPrice, setFullPrice] = useState(0);
    const [turnover, setTurnover] = useState(0);
    const [cost, setCost] = useState(defCost);
    const [name, setName] = useState(JSON.parse(JSON.stringify(defName)));
    const [brand, setBrand] = useState(JSON.parse(JSON.stringify(defBrand)));
    const [color, setColor] = useState(JSON.parse(JSON.stringify(defColor)));
    const [size, setSize] = useState(JSON.parse(JSON.stringify(defSize)));
    const [count, setCount] = useState(JSON.parse(JSON.stringify(defCount)));
    const [barcode, setBarcode] = useState(JSON.parse(JSON.stringify(defBarcode)));

    const marg = useMemo(() => {
        return Math.round(price - ((subjectData.CostStorageBox * turnover) + logisticMarketplace + (commission * price / 100) + logistic + packaging + cost) - ((price - (subjectData.CostStorageBox * turnover) - logisticMarketplace - (commission * price / 100)) / 100 * 6))
    }, [price, subjectData.CostStorageBox, turnover, logisticMarketplace, commission, logistic, packaging, cost]);

    const ebida = useMemo(() => {
        return (price - (subjectData.CostStorageBox * turnover) - logisticMarketplace - (commission * price / 100) - logistic - packaging - cost);
    }, [price, subjectData.CostStorageBox, turnover, logisticMarketplace, commission, price, logistic, packaging, cost]);

    const [ebidaCopy, setEbidaCopy] = useState(0);
    const [debet, setDebet] = useState(0);
    const [totalMarg, setTotalMarg] = useState(0);

    useEffect(() => {
        let logistic_float = typeof logistic === "number" ? logistic : 0;
        logistic_float = isNaN(logistic_float) ? 0 : logistic_float;
        let packaging_float = typeof packaging === "number" ? packaging : 0;
        packaging_float = isNaN(packaging_float) ? 0 : packaging_float;
        let cost_float = typeof cost === "number" ? cost : 0;
        cost_float = isNaN(cost_float) ? 0 : cost_float;
        let new_debet = +(logistic_float + packaging_float + cost);

        if ([packaging_float, logistic_float, cost_float].indexOf(0) !== -1) return;

        setAllTotalDebet(allTotalDebet - debet + new_debet);
        setDebet(new_debet);


        // console.log(allTotalDebet);
    }, [logistic, packaging, cost]);

    useEffect(() => {
        if (typeof count !== "number" || isNaN(count) || !isFinite(count)) return;
        if (typeof marg !== "number" || isNaN(marg) || !isFinite(marg)) return;
        let new_total_marg = marg * (+count);
        setAllTotalMarg(allTotalMarg - totalMarg + new_total_marg);
        setTotalMarg(new_total_marg);
    }, [count, marg]);

    useEffect(() => {
        if (typeof ebida !== "number" || isNaN(ebida) || !isFinite(ebida)) return;
        setAllTotalEbida(allTotalEbida - ebidaCopy + ebida);
        setEbidaCopy(ebida);
    }, [ebida]);

    useEffect(() => {
        if (currentCategory === "" || currentStore === "" || currentSubject === "") return;
        subjectsDataFunc.getSubjectData(currentStore, currentCategory, currentSubject).then(res => {
            setSubjectData(res);
        })
    }, [currentSubject]);

    useEffect(() => {
        if (currentCategory === "" || currentStore === "" || currentSubject === "") return;
        setPackaging((+subjectData.CostLogisticsBox) * 0.25)
    }, [subjectData, currentSubject]);

    useEffect(() => {
        if (currentCategory === "" || currentStore === "" || currentSubject === "") return;
        setLogisticMarketplace(+subjectData.CostLogisticsBox)
    }, [subjectData, currentSubject]);

    useEffect(() => {
        setLogistic((+logisticMarketplace) * 0.35)
    }, [logisticMarketplace]);

    useEffect(() => {
        setCommission(+subjectData.CommissionPercentage);
    }, [subjectData, currentSubject])


    useEffect(() => {
        if (currentSubject === "") return;
        subjectsDataFunc.getPrices(currentSubject).then(res => setPrice(+res.price));
    }, [subjectData, currentSubject]);

    useEffect(() => {
        if (currentSubject === "") return;
        subjectsDataFunc.getPrices(currentSubject).then(res => setFullPrice(+res.fullPrice));
    }, [subjectData, currentSubject]);

    useEffect(() => {
        if (currentCategory === "") return;
        subjectsDataFunc.getTurnover(currentCategory).then(res => {
            setTurnover(+res)
        });
    }, [subjectData, currentCategory]);

    const updateListSubjects = useCallback(async () => {
        if (currentCategory !== "" && currentStore !== "") {
            const newList = await subjectsDataFunc.getSubjects(currentStore, currentCategory);
            setListSubjects(newList);
        }
    }, [currentStore, currentCategory, subjectsDataFunc, subjectsDataFunc.getSubjects, setListSubjects]);

    useEffect(() => {
        updateListSubjects();
    }, [currentStore, currentCategory, defStore, defCategory]);

    return <tr>
        <td><input type="text" class="inputbarcod" defaultValue={barcode} disabled /></td>
        <td><input type="text" class="inputname" defaultValue={name} disabled /></td>
        <td><input type="text" class="inputbrand" defaultValue={brand} disabled /></td>
        <td><input type="text" class="inputsize" defaultValue={size} disabled /></td>
        <td><input type="text" class="inputcolor" defaultValue={color} disabled /></td>
        <td><input type="number" class="inputcount" defaultValue={count} disabled /></td>
        <td><input type="number" class="inputsebest" defaultValue={cost} disabled /></td>
        <td>{price}&nbsp;&nbsp;₽</td>
        <td>{debet}&nbsp;&nbsp;₽</td>
        <td>{parseFloat((price - (subjectData.CostStorageBox * turnover) - logisticMarketplace - (commission * price / 100) - logistic - packaging - cost).toFixed(2))}&nbsp;&nbsp;₽</td>
        <td>{marg}&nbsp;&nbsp;%</td>
        <td>{parseFloat((price - (subjectData.CostStorageBox * turnover) - logisticMarketplace - (commission * price / 100) - logistic - packaging - cost).toFixed(2))}&nbsp;&nbsp;₽</td>
        <td>{Math.round(((price - (subjectData.CostStorageBox * turnover) - logisticMarketplace - (commission * price / 100)) / 100 * 6)).toFixed(2)}&nbsp;&nbsp;₽</td>
        <td>{parseFloat(((price - (subjectData.CostStorageBox * turnover) - logisticMarketplace - (commission * price / 100) - logistic - packaging - cost) / (debet)).toFixed(2))}&nbsp;&nbsp;₽</td>
        <td>{parseFloat((((price - (subjectData.CostStorageBox * turnover) - logisticMarketplace - (commission * price / 100) - logistic - packaging - cost) / (price - (subjectData.CostStorageBox * turnover) - logisticMarketplace - (commission * price / 100))) * 100).toFixed(2))}&nbsp;&nbsp;%</td>
        <td>{Math.round(price / ((subjectData.CostStorageBox * turnover) + logisticMarketplace + (commission * price / 100) + logistic + packaging + cost) * 100).toFixed(2)}&nbsp;&nbsp;%</td>
        <td>{parseFloat((price - ((subjectData.CostStorageBox * turnover) + logisticMarketplace + (commission * price / 100) + logistic + packaging + cost + ((price - ((subjectData.CostStorageBox * turnover) + logisticMarketplace + (commission * price / 100))) / 100 * 6))) / ((subjectData.CostStorageBox * turnover) + logisticMarketplace + (commission * price / 100) + logistic + packaging + cost) * 100).toFixed(2)}&nbsp;&nbsp;%</td>
        <td>{parseFloat((price - ((subjectData.CostStorageBox * turnover) + logisticMarketplace + (commission * price / 100) + logistic + packaging + cost + ((price - ((subjectData.CostStorageBox * turnover) + logisticMarketplace + (commission * price / 100))) / 100 * 6))) / (logistic + packaging + cost) * 100).toFixed(2)}&nbsp;&nbsp;%</td>
        <td>{parseFloat((price - ((subjectData.CostStorageBox * turnover) + logisticMarketplace + (commission * price / 100) + logistic + packaging + cost)) / (price - ((subjectData.CostStorageBox * turnover) + logisticMarketplace + (commission * price / 100))) * 100).toFixed(2)}&nbsp;&nbsp;%</td>
        <td>{parseFloat((price - ((subjectData.CostStorageBox * turnover) + logisticMarketplace + (commission * price / 100) + logistic + packaging + cost)) / ((subjectData.CostStorageBox * turnover) + logisticMarketplace + (commission * price / 100) + (logistic + packaging + cost)) * 100).toFixed(2)}&nbsp;&nbsp;%</td>
        <td>{parseFloat(price - ((subjectData.CostStorageBox * turnover) + logisticMarketplace + (commission * price / 100))).toFixed(2)}&nbsp;&nbsp;₽</td>
        <td>{parseFloat(price - ((subjectData.CostStorageBox * turnover) + logisticMarketplace + (commission * price / 100) + logistic + packaging + cost) - ((price - (subjectData.CostStorageBox * turnover) - logisticMarketplace - (commission * price / 100)) / 100 * 6)).toFixed(2)}&nbsp;&nbsp;₽</td>

    </tr>
}

export const FinancialProduct = () => {

    const auth = useAuth();
    const subjectsDataFunc = useSubjectsData();
    const [sections, setSections] = useState([]);
    const [allTotalDebet, setAllTotalDebet] = useState(0);
    const [allTotalMarg, setAllTotalMarg] = useState(0);
    const [allTotalEbida, setAllTotalEbida] = useState(0);
    useEffect(() => {
        console.log(allTotalDebet);
    }, [allTotalDebet]);

    useEffect(() => {
        console.log(auth);
        if (!auth.user) return;
        subjectsDataFunc.getCalculations(auth.user.id).then(res => {
            console.log(res);

            const newSections = res.map(data => {
                // console.log(data);
                return <CalcRow auth={auth} subjectsDataFunc={subjectsDataFunc} id={data.id}
                    defStore={data.Store} defCategory={data.Category} defSubject={data.Subject}
                    defName={data.Name} defBrand={data.Brand} defColor={data.Color}
                    defSize={data.Size} defCount={data.Count} defCost={data.Cost} defBarcode={data.Barcode}
                    key={makeId(8)} allTotalDebet={allTotalDebet} setAllTotalDebet={setAllTotalDebet}
                    allTotalMarg={allTotalMarg} setAllTotalMarg={setAllTotalMarg} allTotalEbida={allTotalEbida}
                    setAllTotalEbida={setAllTotalEbida} />
            });
            setSections(newSections);

        });
    }, [auth.user]);
    return (
        <section class="home">
            <SectionTop />
            <div class="block">
                <div className="financeframe1">
                    <a href="https://www.marketstat.app/bibliotecapp"><img src="/img/financeframe1.svg" height="150px" /></a>
                </div>

                <div className="financeframe2">
                    <a href="https://www.marketstat.app/bibliotecapp"><img src="/img/financeframe2.svg" height="150px" /></a>
                </div>

                <div className="financeframe3">
                    <a href="https://www.marketstat.app/bibliotecapp"><img src="/img/financeframe3.svg" height="150px" /></a>
                </div>
            </div>


            <div class="textfin">Финансовые показатели продуктовых позиций</div>
            <div class="textfintitles">Показатели EBITDA и маржинальности по каждой товарной позиции, оценка рентабельности по нескольким финансовым показателям продукта. А так же коэффициенты возврата вложенных средств и инвестиций.</div>

            <div class="bordertable">
                <div class="rectangle"></div>
            </div>



            <div class="units-table">
                <div class="table">
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
                                <th>Стоимость</th>
                                <th>Издержки</th>
                                <th>Маржинальность</th>
                                <th>Маржинальность&nbsp;&nbsp;%</th>
                                <th>EBITDA</th>
                                <th>Налог</th>
                                <th>Рентабельность&nbsp;затрат</th>
                                <th>Рентабельность&nbsp;продаж</th>
                                <th>Рентабельность реализованных&nbsp;товаров</th>
                                <th>Рентабельность&nbsp;реализованных товаров&nbsp;по&nbsp;чистой&nbsp;прибыли</th>
                                <th>Рентабельность оборотных&nbsp;активов</th>
                                <th>Коэффициент валовой&nbsp;рентабельности</th>
                                <th>ROI</th>
                                <th>Выручка</th>
                                <th>Чистая&nbsp;прибыль</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sections}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}



