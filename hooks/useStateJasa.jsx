import React, { useEffect, useState } from "react";
import { usePath } from "@/components/PathContext";
import { db } from "@/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const useStateProduk = () => {
    const { currentPath } = usePath();
    const [services, setServices] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const servicesPerPage = 9;
    const isHomepage = currentPath === "/Beranda";
    const displayedServices = isHomepage ? services.slice(0, 3) : services;
    const totalPages = Math.ceil(displayedServices.length / servicesPerPage);

    const getCurrentJasa = () => {
        const startIndex = (activePage - 1) * servicesPerPage;
        const endIndex = startIndex + servicesPerPage;
        return displayedServices.slice(startIndex, endIndex);
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
        const fetchServices = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "jasa"));
                const servicesData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setServices(servicesData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    return {
        activePage,
        setActivePage,
        servicesPerPage,
        displayedServices,
        totalPages,
        getCurrentJasa,
        getItemProps,
        next,
        prev,
        services,
        setServices
    };
}

export default useStateProduk;