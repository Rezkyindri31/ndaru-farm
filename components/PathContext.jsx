"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Loader from '@/components/Loader';
const PathContext = createContext();

export function PathProvider({ children }) {
    const [currentPath, setCurrentPath] = useState('');
    const [loading, setLoading] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCurrentPath(window.location.pathname);
        }
    }, []);

    useEffect(() => {
        if (pathname) {
            setLoading(true);
            const timer = setTimeout(() => {
                setCurrentPath(pathname);
                setLoading(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [pathname]);

    return (
        <PathContext.Provider value={{ currentPath, loading }}>
            {loading ? <Loader /> : children}
        </PathContext.Provider>
    );
}

export function usePath() {
    return useContext(PathContext);
}
