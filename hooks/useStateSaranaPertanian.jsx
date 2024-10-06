import React, { useEffect, useState } from "react";
import { usePath } from "@/components/PathContext";
import { db } from "@/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const useStateProduk = () => {
    const { currentPath } = usePath();
    const [facilities, setFacilities] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const facilitiesPerPage = 9;
    const isHomepage = currentPath === "/Beranda";
    const displayedFacilities = isHomepage ? facilities.slice(0, 3) : facilities;
    const totalPages = Math.ceil(displayedFacilities.length / facilitiesPerPage);

    const getCurrentFacilites = () => {
        const startIndex = (activePage - 1) * facilitiesPerPage;
        const endIndex = startIndex + facilitiesPerPage;
        return displayedFacilities.slice(startIndex, endIndex);
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
        const fetchFacilities = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "sarana_pertanian"));
                const facilitiesData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setFacilities(facilitiesData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFacilities();
    }, []);

    return {
        activePage,
        setActivePage,
        facilitiesPerPage,
        displayedFacilities,
        totalPages,
        getCurrentFacilites,
        getItemProps,
        next,
        prev,
        facilities,
        setFacilities
    };
}

export default useStateProduk;