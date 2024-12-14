import { useState, useEffect } from "react";
import { firestore } from "@/lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

function useVerifikasiLogin() {
    const [apakahSudahLogin, setApakahSudahLogin] = useState(false);
    const [userID, setUserID] = useState(null);
    const [detailPengguna, setDetailPengguna] = useState({
        Alamat: "",
        Alamat_Penerima: "",
        Email: "",
        Jenis_Kelamin: "",
        NIK: "",
        Nama_Lengkap: "",
        Nama_Lengkap_Penerima: "",
        No_Telepon: "",
        No_Telepon_Penerima: "",
        Tanggal_Lahir: "",
    });

    useEffect(() => {
        const fetchID = async () => {
            const id = localStorage.getItem("ID");

            if (id) {
                setUserID(id);
                setApakahSudahLogin(true);

                const docRef = doc(firestore, "pengguna", id);

                try {
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        setDetailPengguna((prevState) => ({
                            ...prevState,
                            ...docSnap.data(),
                        }));
                    } else {
                        setApakahSudahLogin(false);
                    }
                } catch (error) {
                    console.error("Gagal mengambil data pengguna:", error);
                    setApakahSudahLogin(false);
                }
            } else {
                console.log(
                    "Tidak ada ID di localStorage, set apakahSudahLogin ke false."
                );
                setApakahSudahLogin(false);
            }
        };

        fetchID();

        window.addEventListener("storage", fetchID);

        return () => {
            window.removeEventListener("storage", fetchID);
        };
    }, []);

    return { apakahSudahLogin, userID, detailPengguna };
}

export default useVerifikasiLogin;
