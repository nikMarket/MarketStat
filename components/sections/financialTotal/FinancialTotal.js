import { SectionTop } from "../sectionTop/sectionTop";
import { useAuth } from "../../../lib/hooks/useAuth";
import { useSubjectsData } from "../../../lib/hooks/useSubjectsData";
import { useCallback, useEffect, useMemo, useState } from "react";

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
    allTotalDebet, setAllTotalDebet,
    allTotalMarg, setAllTotalMarg,
    allTotalEbida, setAllTotalEbida,
    allTotalRent, setAllTotalRent,
    allTotalSalesRent, setAllTotalSalesRent,
    allTotalProductRent, setAllTotalProductRent,
    allTotalActiveRent, setAllTotalActiveRent,
    allTotalRevenue, setAllTotalRevenue }) => {

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
        return Math.round((price - (subjectData.CostStorageBox * turnover) - logisticMarketplace - (commission * price / 100) - logistic - packaging - cost) / price * 100)
    }, [price, subjectData.CostStorageBox, turnover, logisticMarketplace, commission, logistic, packaging, cost]);

    const ebida = useMemo(() => {
        return (price - (subjectData.CostStorageBox * turnover) - logisticMarketplace - (commission * price / 100) - logistic - packaging - cost);
    }, [price, subjectData.CostStorageBox, turnover, logisticMarketplace, commission, price, logistic, packaging, cost]);

    const rent = useMemo(() => {
        return ebida / (logistic + packaging + cost);
    }, [ebida, count, logistic, packaging, cost]);

    const nalog = useMemo(() => {
        return ((price - (subjectData.CostStorageBox * turnover) - logisticMarketplace - (commission * price / 100)) / 100 * 6);
    }, [price, subjectData.CostStorageBox, turnover, logisticMarketplace, commission, price, count]);

    const salesRent = useMemo(() => {
        return (ebida - nalog) / (price - (+subjectData.CostStorageBox) * turnover - logisticMarketplace - commission * price / 100 - logistic - packaging - cost);
    }, [ebida, nalog, price, subjectData.CostStorageBox, turnover, logisticMarketplace, commission, price, logistic, packaging, cost]);

    const productRent = useMemo(() => {
        return price / ((+subjectData.CostStorageBox) * turnover - logisticMarketplace - commission * price / 100 - logistic - packaging - cost);
    }, [price, subjectData.CostStorageBox, turnover, logisticMarketplace, commission, price, logistic, packaging, cost]);

    const activeRent = useMemo(() => {
        return (ebida - nalog) / (packaging - cost);
    }, [ebida, nalog, packaging, cost]);

    const revenue = useMemo(() => {
        return Math.round(price - (subjectData.CostStorageBox * turnover) - logisticMarketplace - (commission * price / 100))
    }, [price, subjectData.CostStorageBox, turnover, logisticMarketplace, commission]);

    const [activeRentCopy, setActiveRentCopy] = useState(0);
    const [productRentCopy, setProductRentCopy] = useState(0);
    const [salesRentCopy, setSalesRentCopy] = useState(0);
    const [rentCopy, setRentCopy] = useState(0);
    const [ebidaCopy, setEbidaCopy] = useState(0);
    const [debet, setDebet] = useState(0);
    const [totalMarg, setTotalMarg] = useState(0);
    const [revenueCopy, setRevenueCopy] = useState(0);

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
        if (typeof revenue !== "number" || isNaN(revenue) || !isFinite(revenue)) return;
        setAllTotalRevenue(allTotalRevenue - revenueCopy + revenue);
        setRevenueCopy(revenue);
    }, [revenue]);


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
        if (typeof rent !== "number" || isNaN(rent) || !isFinite(rent)) return;
        setAllTotalRent(allTotalRent - rentCopy + rent);
        setRentCopy(rent);
    }, [rent]);

    useEffect(() => {
        if (typeof salesRent !== "number" || isNaN(salesRent) || !isFinite(salesRent)) return;
        setAllTotalSalesRent(allTotalSalesRent - salesRentCopy + salesRent);
        setSalesRentCopy(salesRent);
    }, [salesRent]);

    useEffect(() => {
        console.log(activeRent);
        if (typeof activeRent !== "number" || isNaN(activeRent) || !isFinite(activeRent)) return;
        setAllTotalActiveRent(allTotalActiveRent - activeRentCopy + activeRent);
        setActiveRentCopy(activeRent);
    }, [activeRent]);

    useEffect(() => {
        if (typeof productRent !== "number" || isNaN(productRent) || !isFinite(productRent)) return;
        setAllTotalProductRent(allTotalProductRent - productRentCopy + productRent);
        setProductRentCopy(productRent);
    }, [productRent]);

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
    </tr>
}


// console.log(data);

export const FinancialTotal = () => {
    const auth = useAuth();
    const subjectsDataFunc = useSubjectsData();
    const [sections, setSections] = useState([]);
    const [allTotalDebet, setAllTotalDebet] = useState(0);
    const [allTotalMarg, setAllTotalMarg] = useState(0);
    const [allTotalEbida, setAllTotalEbida] = useState(0);
    const [allTotalRent, setAllTotalRent] = useState(0);
    const [allTotalSalesRent, setAllTotalSalesRent] = useState(0);
    const [allTotalProductRent, setAllTotalProductRent] = useState(0);
    const [allTotalActiveRent, setAllTotalActiveRent] = useState(0);
    const [allTotalRevenue, setAllTotalRevenue] = useState(0);

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
                    setAllTotalEbida={setAllTotalEbida} allTotalRent={allTotalRent} setAllTotalRent={setAllTotalRent}
                    allTotalSalesRent={allTotalSalesRent} setAllTotalSalesRent={setAllTotalSalesRent}
                    allTotalProductRent={allTotalProductRent} setAllTotalProductRent={setAllTotalProductRent}
                    allTotalActiveRent={allTotalActiveRent} setAllTotalActiveRent={setAllTotalActiveRent}
                    allTotalRevenue={allTotalRevenue} setAllTotalRevenue={setAllTotalRevenue} />
            });
            setSections(newSections);

        });
    }, [auth.user]);

    return (
        <section className="home">
            <SectionTop />
            <div className="block">
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


            <div className="textfin">Финансовые итоги проекта/магазина</div>
            <div className="textfintitles">Финансовые показатели и коэффициенты, которые помогу увидеть общую картину работы с маркетплейсом. Работа с этими показатлями позволит планировать будущую прибыль и сокращать издержки.</div>

            <div className="bordertablefinprod">
                <div className="rectangle" />
            </div>

            <div className="ftotal">

                <div className="rentabzatrat">
                    <div className="rectangle" />
                </div>

                <div className="textrentabzatrat">Рентабельность затрат</div>
                <div className="textrentabzatrattwo">{allTotalRent.toFixed(2)}</div>

                <div className="rentabprodazh">
                    <div className="rectangle" />
                </div>

                <div className="textrentabprodazh">Рентабельность продаж</div>
                <div className="textrentabprodazhtwo">{allTotalSalesRent.toFixed(2)}</div>


                <div className="rentabsalesprod">
                    <div className="rectangle" />
                </div>

                <div className="textrentabsalesprod">Рентабельность реализованных товаров</div>
                <div className="textrentabsalesprodtwo">{allTotalProductRent.toFixed(2)}</div>

                <div className="rentabclear">
                    <div className="rectangle" />
                </div>

                <div className="textrentabclear">Рентабельность продаж по чистой прибыли</div>
                <div className="textrentabcleartwo">{allTotalSalesRent.toFixed(2)}</div>

                <div className="rentabnooborotactiv">
                    <div className="rectangle" />
                </div>

                <div className="textrentabnooborotactiv">Рентабельность оборотных активов</div>
                <div className="textrentabnooborotactivtwo">{allTotalActiveRent.toFixed(2)}</div>

                <div className="kfrentab">
                    <div className="rectangle" />
                </div>

                <div className="textkfrentab">Коэффициент валовой рентабельности</div>
                <div className="textkfrentabtwo">55</div>


                <div className="ebitda">
                    <div className="rectangle" />
                </div>

                <div className="textebitda">EBITDA</div>
                <div className="textebitdatwo">{allTotalEbida.toFixed(2)}</div>

                <div className="roi">
                    <div className="rectangle" />
                </div>

                <div className="textroi">ROI</div>
                <div className="textroitwo">55</div>

                <div className="rentab">
                    <div className="rectangle" />
                </div>

                <div className="textrentab">Налоговые отчисления</div>
                <div className="textrentabtwo">55</div>

                <div className="marjin">
                    <div className="rectangle" />
                </div>

                <div className="textmarjin">Маржинальность</div>
                <div className="textmarjintwo">55</div>

                <div className="marjinprocent">
                    <div className="rectangle" />
                </div>

                <div className="textmarjinprocent">Маржинальность %</div>
                <div className="textmarjinprocenttwo">{(allTotalMarg / sections.length).toFixed(2)}</div>


                <div className="logistics">
                    <div className="rectangle" />
                </div>

                <div className="textlogistics">Логистические затраты</div>
                <div className="textlogisticstwo">55</div>


                <div className="upakovka">
                    <div className="rectangle" />
                </div>

                <div className="textupakovka">Затраты упаковка</div>
                <div className="textupakovkatwo">55</div>



                <div className="viruchka">
                    <div className="rectangle" />
                </div>

                <div className="textviruchka">Выручка</div>
                <div className="textviruchkatwo">{allTotalRevenue.toFixed(2)}</div>


                <div className="clearprofit">
                    <div className="rectangle" />
                </div>

                <div className="textclearprofit">Чистая прибыль</div>
                <div className="textclearprofittwo">55</div>

            </div>

            <div hidden>
                {sections}
            </div>
        </section>
    )
}