import { useState } from "react";
import { toast } from "react-hot-toast";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { firestore } from "@/lib/firebaseConfig";

function useKirimMasukan() {
    const [pesan, setPesan] = useState("");
    const [loading, setLoading] = useState(false);

    const kirimMasukan = async ({ Nama, Email, pesan }) => {
        setLoading(true);
        try {
            const masukanCollection = collection(firestore, "masukan");
            await addDoc(masukanCollection, {
                Nama,
                Email,
                pesan,
                Waktu_Masukan: Timestamp.now(),
            });
            toast.success("Masukan berhasil dikirim!");
            window.location.reload();
        } catch (error) {
            console.error("Error mengirim masukan: ", error);
            toast.error("Gagal mengirim masukan. Silakan coba lagi.");
        } finally {
            setLoading(false);
        }
    };

    return { kirimMasukan, loading, pesan, setPesan };
}

export default useKirimMasukan;
