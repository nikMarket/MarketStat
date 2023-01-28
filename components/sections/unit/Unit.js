import { SectionTop } from "../sectionTop/sectionTop";
import { useSubjectsData } from "../../../lib/hooks/useSubjectsData";
import { useCallback, useEffect, useState } from "react";
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


const CalcRow = ({ id, allCount, setAllCount, defStore = "", defCategory = "", defSubject = "",
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

    return isRemoved ? "" : <tr>
        <td>
            <input class="inputstores" list="stores" defaultValue={currentStore} onChange={async (evt) => {
                const store = evt.target.value;
                if (subjectsDataFunc.stores.indexOf(store) !== -1) {
                    setCurrentStore(store);
                }
            }} />
            <datalist id="stores">
                {
                    subjectsDataFunc.stores.map(store => {
                        return <option value={store} key={store} />
                    })
                }
            </datalist>
        </td>
        <td>
            <input class="inputcategory" list="category" defaultValue={currentCategory} onChange={async (evt) => {
                const category = evt.target.value;
                if (subjectsDataFunc.categories.indexOf(category) !== -1) {
                    setCurrentCategory(category);
                }
            }} />
            <datalist id="category">
                {
                    subjectsDataFunc.categories.map(c => {
                        return <option value={c} key={c} />
                    })
                }
            </datalist>
        </td>
        <td>
            <input class="inputproduct" list={"subjects" + id} defaultValue={currentSubject} onChange={async (evt) => {
                const subject = evt.target.value;
                if (listSubjects.indexOf(subject) !== -1) {
                    setCurrentSubject(subject);
                }
            }} />
            <datalist id={"subjects" + id}>
                {listSubjects.map((c, i) => {
                    return <option value={c} key={i} />
                })}
            </datalist>
        </td>
        <td><input type="text" class="inputname" defaultValue={name} onChange={(evt) => { setName(evt.target.value) }} /></td>
        <td><input type="text" class="inputbrand" defaultValue={brand} onChange={(evt) => { setBrand(evt.target.value) }} /></td>
        <td><input type="text" class="inputcolor" defaultValue={color} onChange={evt => { setColor(evt.target.value) }} /></td>
        <td><input type="text" class="inputsize" defaultValue={size} onChange={evt => { setSize(evt.target.value) }} /></td>
        <td><input type="number" class="inputcount" defaultValue={count} onChange={evt => {
            setCount(+evt.target.value);
        }} /></td>
        <td><input type="number" class="inputsebest" defaultValue={cost} onChange={evt => {
            setCost(+evt.target.value);
        }} /></td>
        <td>{parseFloat(packaging).toFixed(2)}&nbsp;&nbsp;₽</td>
        <td>{parseFloat(logistic).toFixed(2)}&nbsp;&nbsp;₽</td>
        <td>{commission}&nbsp;&nbsp;%</td>
        <td>{parseFloat((commission * price / 100).toFixed(2))}&nbsp;&nbsp;₽</td>
        <td>{logisticMarketplace}&nbsp;&nbsp;₽</td>
        <td>{subjectData.CostStorageBox}&nbsp;&nbsp;₽</td>
        <td>{parseFloat((subjectData.CostStorageBox * turnover).toFixed(2))}&nbsp;&nbsp;₽</td>
        <td>{turnover}&nbsp;&nbsp;дней</td>
        <td>{parseFloat((price - (subjectData.CostStorageBox * turnover) - logisticMarketplace - (commission * price / 100) - logistic - packaging - cost).toFixed(2))}&nbsp;&nbsp;₽</td>
        <td>{price}&nbsp;&nbsp;₽</td>
        <td>{Math.round((fullPrice - price) / fullPrice * 100) + '%'}</td>
        <td>{fullPrice}&nbsp;&nbsp;₽</td>
        <td><input type="text" class="inputbarcod" defaultValue={barcode} onChange={evt => { setBarcode(evt.target.value) }} /></td>
        <td><div className="buttonsave" onClick={onSave}>
            <img src="/img/save.svg" height="40px" />
        </div></td>
        <td><div className="buttondelete" onClick={onDelete}>
            <img src="/img/delete.svg" height="40px" />
        </div></td>
    </tr>
}
export const Unit = () => {
    const auth = useAuth();
    const subjectsDataFunc = useSubjectsData();
    const [sections, setSections] = useState([]);
    const [allCount, setAllCount] = useState(0);
    const [allMoney, setAllMoney] = useState(0);

    useEffect(() => {
        console.log(auth);
        if (!auth.user) return;
        subjectsDataFunc.getCalculations(auth.user.id).then(res => {
            console.log(res);
            let newAllCount = allCount;
            let newAllMoney = allMoney;
            const newSections = res.map(data => {
                newAllCount += (+data.Count);
                newAllMoney += data.Count * data.Cost;
                // console.log(data);
                return <CalcRow auth={auth} subjectsDataFunc={subjectsDataFunc} id={data.id}
                    defStore={data.Store} defCategory={data.Category} defSubject={data.Subject}
                    defName={data.Name} defBrand={data.Brand} defColor={data.Color}
                    defSize={data.Size} defCount={data.Count} defCost={data.Cost} defBarcode={data.Barcode}
                    key={makeId(8)} />

            });
            setAllCount(newAllCount);
            setAllMoney(newAllMoney);
            setSections(newSections);
        });
    }, [auth.user]);

    const addCalcRow = useCallback(() => {
        const newSections = [...sections];
        const newSection = <CalcRow auth={auth} subjectsDataFunc={subjectsDataFunc} id={-1} key={makeId(8)} />;

        newSections.push(newSection);
        console.log(newSection);
        console.log(sections.length);
        setSections(newSections);
    }, [sections, setSections]);

    return (
        <section className="home">
            <SectionTop />
            <div className="block">

                <div className="block_sku">
                    <div className="rectangle" />
                </div>

                <div className="textsku">Количество карточек</div>
                <div className="textskutwo">SKU</div>
                <div className="textskuthree">{sections.length}</div>

                <div className="iconsku">
                    <img src="/img/bxs-cabinet.svg" height="50px" width="50px" />
                </div>


                <div className="block_vp">
                    <div className="rectangle" />
                </div>

                <div className="textvp">Количество товаров</div>
                <div className="textvptwo">ШТ</div>
                <div className="textvpthree">{allCount}</div>

                <div className="iconsvp">
                    <img src="/img/bxs-basket.svg" height="50px" width="50px" />
                </div>


                <div className="block_vm">
                    <div className="rectangle"></div>
                </div>

                <div className="textvm">Денежные средства</div>
                <div className="textvmtwo">₽</div>
                <div className="textvmthree">{allMoney}</div>

                <div className="iconsvm">
                    <img src="/img/bxs-wallet.svg" height="50px" width="50px" />
                </div>


                <div className="companycard">
                    <a href="https://www.marketstat.app/bibliotecapp"><img src="/img/companycard.svg" height="150px" /></a>
                </div>

                <div className="videocard" >
                    <a href="https://www.marketstat.app/videoinstruction"><img src="/img/videocard.svg" height="150px" /></a>
                </div>

            </div>

            <div className="textoreview">
                Расчет ценообразования и затрат (UNIT-Экономика товара) &nbsp; &nbsp; &nbsp; &nbsp;
                <div className="button" onClick={addCalcRow}>
                    <img src="/img/butonplusunit.svg" alt="plusbutton" height="60px" />
                </div>
            </div>


            <div className="bordertable">
                <div className="rectangle"></div>
            </div>

            <div className="units-table">
                <div className="table">
                    <table>
                        <thead>
                            <tr>
                                <th>Cклад</th>
                                <th>Категория</th>
                                <th>Предмет</th>
                                <th>Наименование</th>
                                <th>Бренд</th>
                                <th>Цвет</th>
                                <th>Размер</th>
                                <th>Количество</th>
                                <th>Себестоимость</th>
                                <th>Упаковка</th>
                                <th>Логистика</th>
                                <th>Комиссия&nbsp;&nbsp;маркетплейса&nbsp;&nbsp;%</th>
                                <th>Комиссия&nbsp;&nbsp;маркетплейса</th>
                                <th>Логистика&nbsp;&nbsp;маркетплейса</th>
                                <th>Стоимость&nbsp;&nbsp;хранения&nbsp;&nbsp;в&nbsp;&nbsp;день</th>
                                <th>Стоимость&nbsp;&nbsp;хранения</th>
                                <th>Оборачиваемость</th>
                                <th>Наценка</th>
                                <th>Цена</th>
                                <th>Скидка</th>
                                <th>Цена&nbsp;&nbsp;до&nbsp;&nbsp;скидки</th>
                                <th>Баркод</th>
                                <th>Сохранить</th>
                                <th>Удалить</th>
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