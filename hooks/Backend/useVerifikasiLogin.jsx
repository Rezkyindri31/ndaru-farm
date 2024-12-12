import { useState, useEffect } from "react";
import { auth } from "@/lib/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import toast from "react-hot-toast";

const useVerifyLogin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [pengguna, setPengguna] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setPengguna(currentUser);
                setIsLoggedIn(true);
            } else {
                setPengguna(null);
                setIsLoggedIn(false);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleVerifyLogin = async () => {
        if (!isLoggedIn) {
            toast.error("You are not logged in. Please log in first.");
            return;
        }
        try {
            toast.success("Selamat datang di Ndaru Farm!");
        } catch (err) {
            setError(err);
            toast.error("Error verifying login status.");
        }
    };

    return {
        isLoggedIn,
        loading,
        pengguna,
        error,
        handleVerifyLogin,
    };
};

export default useVerifyLogin;
