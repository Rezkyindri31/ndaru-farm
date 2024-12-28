import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "@/lib/firebaseConfig";
import { toast } from "react-hot-toast";

const updateStatusPemesanan = async (ID_Pemesanan) => {
    try {
        const pemesananRef = doc(firestore, "pemesanan", ID_Pemesanan);
        await updateDoc(pemesananRef, {
            Status_Pemesanan: "Selesai",
            Tanggal_Pemesanan_Selesai: new Date().toISOString(),
        });

        toast.success("Status pemesanan berhasil diperbarui menjadi Selesai.");
        window.location.reload();
    } catch (error) {
        console.error("Gagal memperbarui status pemesanan:", error);
        toast.error("Gagal memperbarui status pemesanan.");
    }
};

export default updateStatusPemesanan;
