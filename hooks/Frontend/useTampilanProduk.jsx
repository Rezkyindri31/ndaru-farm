import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/lib/firebaseConfig";
import { useRouter } from "next/router";

const useTampilanInformasiSayuran = () => {
    const [produkSayuran, setProdukSayuran] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activePage, setActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const productsPerPage = 6;

    useEffect(() => {
        const fetchInformasiProduk = async () => {
            try {
                const sayuranCollection = collection(firestore, "sayuran");
                const sayuranSnapshot = await getDocs(sayuranCollection);
                const sayuranList = sayuranSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProdukSayuran(sayuranList);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchInformasiProduk();
    }, []);

    useEffect(() => {
        setTotalPages(Math.ceil(produkSayuran.length / productsPerPage));
    }, [produkSayuran]);

    const getCurrentProducts = () => {
        const startIndex = (activePage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        return produkSayuran.slice(startIndex, endIndex);
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
        produkSayuran,
        loading,
        error,
        activePage,
        setActivePage,
        productsPerPage,
        totalPages,
        getCurrentProducts,
        getItemProps,
        next,
        prev,
    };
};

export default useTampilanInformasiSayuran;
