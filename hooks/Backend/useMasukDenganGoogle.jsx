import { auth, firestore } from "@/lib/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { doc, getDoc } from "firebase/firestore";

const useMasukDenganGoogle = () => {
    const pengarah = useRouter();
    const [sedangMemuatMasukDenganGoogle, setSedangMemuatMasukDenganGoogle] =
        useState(false);

    const masukDenganGoogle = async () => {
        const googleProvider = new GoogleAuthProvider();
        googleProvider.setCustomParameters({
            prompt: "select_account",
        });

        try {
            setSedangMemuatMasukDenganGoogle(true);
            const hasil = await signInWithPopup(auth, googleProvider);
            const pengguna = hasil.user;
            localStorage.setItem("ID", pengguna.uid);
            toast.success("Selamat datang di Ndaru Farm!");

            const id = pengguna.uid;
            const docRefPengguna = doc(firestore, "pengguna", id);
            const docSnap = await getDoc(docRefPengguna);

            if (docSnap.exists()) {
                pengarah.push("/Beranda");
            } else {
                pengarah.push("/FormBiodata");
            }
        } catch (error) {
            console.error("Login dengan Google gagal:", error);
            toast.error("Gagal masuk dengan Google. Silakan coba lagi.");
        } finally {
            setSedangMemuatMasukDenganGoogle(false);
        }
    };

    return {
        masukDenganGoogle,
        sedangMemuatMasukDenganGoogle,
    };
};

export default useMasukDenganGoogle;
