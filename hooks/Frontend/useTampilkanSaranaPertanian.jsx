import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/lib/firebaseConfig";
import { useRouter } from "next/router";

const useTampilanSaranaPertanian = () => {
    const [produkSaranaPertanian, setProdukSaranaPertanian] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activePage, setActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const productsPerPage = 6;

    useEffect(() => {
        const fetchInformasiSaranaPertanian = async () => {
            try {
                const saranaPertanianCollection = collection(firestore, "sarana_pertanian");
                const saranaPertanianSnapshot = await getDocs(saranaPertanianCollection);
                const saranaPertanianList = saranaPertanianSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProdukSaranaPertanian(saranaPertanianList);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchInformasiSaranaPertanian();
    }, []);

    useEffect(() => {
        setTotalPages(Math.ceil(produkSaranaPertanian.length / productsPerPage));
    }, [produkSaranaPertanian]);

    const getCurrentFasilitas = () => {
        const startIndex = (activePage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        return produkSaranaPertanian.slice(startIndex, endIndex);
    };

    const getItemProps = (index) => ({
        variant: activePage === index ? "filled" : "text",
        color: "gray",
        onClick: () => setActivePage(index),
        className: "rounded-full text-secondary",
    });

    const next = () => {
        if (activePage < totalPages) {
            setActivePage(activePage + 1);
        }
    };

    const prev = () => {
        if (activePage > 1) {
            setActivePage(activePage - 1);
        }
    };

    return {
        produkSaranaPertanian,
        loading,
        error,
        activePage,
        setActivePage,
        productsPerPage,
        totalPages,
        getCurrentFasilitas,
        getItemProps,
        next,
        prev,
    };
};

export default useTampilanSaranaPertanian;
