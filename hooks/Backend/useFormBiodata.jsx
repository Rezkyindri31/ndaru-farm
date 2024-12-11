import { useState } from "react";
import { firestore } from "@/lib/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import toast from "react-hot-toast";

const useSubmitBiodata = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const submitBiodata = async (penggunaID, formDataPengguna) => {
        setIsLoading(true);
        setError(null);

        try {
            const auth = getAuth();
            const user = auth.currentUser;

            if (!user) {
                throw new Error("User is not authenticated");
            }

            const email = user.email;

            const userRef = doc(firestore, "pengguna", penggunaID);
            await setDoc(userRef, {
                ...formDataPengguna,
                Kelengkapan_Data_Profile: true,
                Pembuatan_Akun: new Date(),
                Email: email,
            });

            toast.success("Selamat datang di Aplikasi Ndaru Farm.");
        } catch (err) {
            setError(err);
            toast.error("Gagal menyimpan biodata. Silakan coba lagi.");
            console.error("Error saving biodata:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        submitBiodata,
        isLoading,
        error,
    };
};

export default useSubmitBiodata;
