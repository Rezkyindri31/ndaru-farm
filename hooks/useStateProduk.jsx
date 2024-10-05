import React, { useEffect, useState } from "react";
import { usePath } from "@/components/PathContext";
import { db } from "@/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const useStateProduk = () => {
    const { currentPath } = usePath();
    const [products, setProducts] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const productsPerPage = 9;
    const isHomepage = currentPath === "/Beranda";
    const displayedProducts = isHomepage ? products.slice(0, 3) : products;
    const totalPages = Math.ceil(displayedProducts.length / productsPerPage);

    const getCurrentProducts = () => {
        const startIndex = (activePage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        return displayedProducts.slice(startIndex, endIndex);
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
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "sayuran"));
                const productsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProducts(productsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return {
        activePage,
        setActivePage,
        productsPerPage,
        displayedProducts,
        totalPages,
        getCurrentProducts,
        getItemProps,
        next,
        prev,
        products,
        setProducts
    };
}

export default useStateProduk;