import {useCallback, useEffect, useState} from "react";

export function useSubjectsData(){
    const [stores, setStores] = useState<Array<string>>([]);
    const [categories, setCategories] = useState<Array<string>>([]);

    const loadStoresData = useCallback(async () => {
        const req = await fetch(`/api/calc/get_stores`);
        setStores(await req.json());
    }, [setStores, stores]);

    useEffect(() => {
        loadStoresData();
    }, []);



    const loadCategoriesData = useCallback(async () => {
        const req = await fetch(`/api/calc/get_categories`);
        setCategories(await req.json());
    }, [setCategories, categories])

    useEffect(() => {
        loadCategoriesData();
    }, []);



    const getSubjects = useCallback(async (store, category) => {
        const req = await fetch(`/api/calc/get_subjects?store=${store}&category=${category}`);
        return await req.json();
    }, [stores, categories]);

    const getTurnover = useCallback(async (category) : Promise<number> => {
        const req = await fetch(`/api/calc/get_turnover?category=${category}`);
        return (await req.json()).turnover;
    }, []);

    const getSubjectData = useCallback(async (store, category, subject) => {
        const req = await fetch(`/api/calc/get_subject_data?store=${store}&category=${category}&subject=${subject}`);
        return await req.json();
    }, []);

    const getPrices = useCallback(async (subject) => {
        const req = await fetch(`/api/calc/get_prices?subject=${subject}`);
        return await req.json();
    }, []);

    const addCalculation = useCallback(async (data) => {
        const req = await fetch(`/api/calc/add_calculation?` +
        `user_id=${data.user_id}&Store=${data.store}&Category=${data.category}&Subject=${data.subject}&Name=${data.name}` +
        `&Brand=${data.brand}&Color=${data.color}&Size=${data.size}&Count=${data.count}&Cost=${data.cost}&Barcode=${data.barcode}`);
        return await req.json();
    }, []);

    const getCalculations = useCallback(async (user_id) => {
        const req = await fetch(`/api/calc/get_calculations?user_id=${user_id}`);
        return await req.json();


    }, []);

    const updateCalculation = useCallback(async (id, data) => {
        const req = await fetch(`/api/calc/update_calculation?` +
            `id=${id}&user_id=${data.user_id}&Store=${data.store}&Category=${data.category}&Subject=${data.subject}&Name=${data.name}` +
            `&Brand=${data.brand}&Color=${data.color}&Size=${data.size}&Count=${data.count}&Cost=${data.cost}&Barcode=${data.barcode}`);
        return await req.json();
    }, []);

    const deleteCalculation = useCallback(async (id) => {
        const req = await fetch(`/api/calc/delete_calculation?id=${id}`);
    }, []);

    return {
        stores,
        loadStoresData,
        categories,
        loadCategoriesData,
        getSubjects,
        getTurnover,
        getPrices,
        getSubjectData,
        addCalculation,
        getCalculations,
        updateCalculation,
        deleteCalculation,
    }
}