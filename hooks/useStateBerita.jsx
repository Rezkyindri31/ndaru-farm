import React, { useEffect, useState } from "react";
import { usePath } from "@/components/PathContext";
import { db } from "@/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const useStateProduk = () => {
    const { currentPath } = usePath();
    const [news, setNews] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const newsPerPage = 9;
    const isHomepage = currentPath === "/Beranda";
    const displayedNews = isHomepage ? news.slice(0, 3) : news;
    const totalPages = Math.ceil(displayedNews.length / newsPerPage);

    const getCurrentNews = () => {
        const startIndex = (activePage - 1) * newsPerPage;
        const endIndex = startIndex + newsPerPage;
        return displayedNews.slice(startIndex, endIndex);
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
        const fetchNews = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "berita"));
                const newsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setNews(newsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    return {
        activePage,
        setActivePage,
        newsPerPage,
        displayedNews,
        totalPages,
        getCurrentNews,
        getItemProps,
        next,
        prev,
        news,
        setNews,
        isHomepage
    };
}

export default useStateProduk;