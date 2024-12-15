import { useState } from "react";
import { firestore } from "@/lib/firebaseConfig";
import { toast } from "react-hot-toast";
import { doc, deleteDoc, getDoc } from "firebase/firestore";

const useHapusPemesanan = () => {
    const [memuatHapus, setMemuatHapus] = useState(false);
    const [errorHapus, setErrorHapus] = useState(null);

    const hapusPemesanan = async (ID_Pemesanan, ID_Transaksi) => {
        setMemuatHapus(true);
        setErrorHapus(null);

        try {
            const transaksiRef = doc(firestore, "transaksi", ID_Transaksi);
            const transaksiSnap = await getDoc(transaksiRef);

            if (!transaksiSnap.exists()) {
                throw new Error(`Transaksi dengan ID ${ID_Transaksi} tidak ditemukan.`);
            }
            await deleteDoc(transaksiRef);
            const pemesananRef = doc(firestore, "pemesanan", ID_Pemesanan);
            const pemesananSnap = await getDoc(pemesananRef);

            if (pemesananSnap.exists()) {
                await deleteDoc(pemesananRef);
                toast.success("Pemesanan berhasil dibatalkan.");
            } else {
                toast.warn("Pemesanan tidak ditemukan.");
            }

        } catch (error) {
            console.error("Gagal menghapus pemesanan dan transaksi:", error);
            setErrorHapus(error.message);
            toast.error("Gagal menghapus pemesanan dan transaksi.");
        } finally {
            setMemuatHapus(false);
        }
    };

    return {
        memuatHapus,
        errorHapus,
        hapusPemesanan,
    };
};

export default useHapusPemesanan;
