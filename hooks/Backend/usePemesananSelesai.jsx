import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "@/lib/firebaseConfig";
import { toast } from "react-hot-toast";

const useUpdateStatusPemesanan = () => {
    const [isLoading, setIsLoading] = useState(false);

    const updateStatusPemesanan = async (ID_Pemesanan) => {
        setIsLoading(true);
        try {
            const pemesananRef = doc(firestore, "pemesanan", ID_Pemesanan);
            await updateDoc(pemesananRef, {
                Status_Pemesanan: "Selesai",
                Tanggal_Pemesanan_Selesai: new Date().toISOString(),
            });

            toast.success("Status pemesanan berhasil diperbarui menjadi Selesai.");
            setIsLoading(false);
            window.location.reload();
        } catch (error) {
            console.error("Gagal memperbarui status pemesanan:", error);
            toast.error("Gagal memperbarui status pemesanan.");
            setIsLoading(false);
        }
    };

    return { updateStatusPemesanan, isLoading };
};

export default useUpdateStatusPemesanan;
