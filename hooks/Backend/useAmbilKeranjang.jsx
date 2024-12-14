import { useState, useEffect } from "react";
import { firestore } from "@/lib/firebaseConfig";
import { toast } from "react-hot-toast";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Script from "next/script";

const useAmbilKeranjang = () => {
    const [keranjang, setKeranjang] = useState(null);
    const [memuat, setMemuat] = useState(false);
    const ambilKeranjang = async () => {
        setMemuat(true);
        try {
            const penggunaSaatIni = localStorage.getItem("ID");
            if (!penggunaSaatIni) {
                toast.error("Anda harus masuk untuk melihat keranjang.");
                setMemuat(false);
                return;
            }
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const keranjangRef = doc(firestore, "keranjang", penggunaSaatIni);
            const keranjangSnap = await getDoc(keranjangRef);

            if (keranjangSnap.exists()) {
                const keranjangData = keranjangSnap.data();
                const subtotalSayuran = keranjangData.Sayuran
                    ? keranjangData.Sayuran.reduce((acc, item) => acc + item.Total_Harga, 0)
                    : 0;
                const subtotalSarana = keranjangData.Sarana_Pertanian
                    ? keranjangData.Sarana_Pertanian.reduce((acc, item) => acc + item.Total_Harga, 0)
                    : 0;

                const Sub_Total = subtotalSayuran + subtotalSarana;
                const Biaya_Pengiriman = 100000;
                const Total = Sub_Total + Biaya_Pengiriman;
                await updateDoc(keranjangRef, {
                    Sub_Total,
                    Biaya_Pengiriman,
                    Total,
                });
                setKeranjang({
                    ...keranjangData,
                    Sub_Total,
                    Biaya_Pengiriman,
                    Total,
                });
            } else {
            }
        } catch (error) {
            console.error("Gagal mengambil keranjang:", error);
            toast.error("Gagal memuat keranjang.");
        } finally {
            setMemuat(false);
        }
    };

    const hapusItemKeranjang = async (index) => {
        try {
            const penggunaSaatIni = localStorage.getItem("ID");
            if (!penggunaSaatIni) {
                toast.error("Anda harus masuk untuk menghapus item.");
                return;
            }

            if (
                !keranjang ||
                (!Array.isArray(keranjang.Sayuran) && !Array.isArray(keranjang.Sarana_Pertanian))
            ) {
                toast.error("Keranjang tidak ditemukan atau data keranjang tidak valid.");
                return;
            }

            const totalItems =
                (Array.isArray(keranjang.Sayuran) ? keranjang.Sayuran.length : 0) +
                (Array.isArray(keranjang.Sarana_Pertanian) ? keranjang.Sarana_Pertanian.length : 0);

            if (index < 0 || index >= totalItems) {
                toast.error("Item tidak ditemukan di keranjang.");
                return;
            }

            const updatedSayuran = Array.isArray(keranjang.Sayuran)
                ? [...keranjang.Sayuran]
                : [];
            const updatedSarana_Pertanian = Array.isArray(keranjang.Sarana_Pertanian)
                ? [...keranjang.Sarana_Pertanian]
                : [];

            if (index < updatedSayuran.length) {
                updatedSayuran.splice(index, 1);
            } else {
                const Sarana_PertanianIndex = index - updatedSayuran.length;
                updatedSarana_Pertanian.splice(Sarana_PertanianIndex, 1);
            }

            const keranjangRef = doc(firestore, "keranjang", penggunaSaatIni);
            await updateDoc(keranjangRef, {
                Sayuran: updatedSayuran,
                Sarana_Pertanian: updatedSarana_Pertanian,
            });

            const subtotalSayuran = updatedSayuran.reduce((acc, item) => acc + item.Total_Harga, 0);
            const subtotalSarana = updatedSarana_Pertanian.reduce((acc, item) => acc + item.Total_Harga, 0);
            const Sub_Total = subtotalSayuran + subtotalSarana;
            const Biaya_Pengiriman = 100000;
            const Total = Sub_Total + Biaya_Pengiriman;

            await updateDoc(keranjangRef, {
                Sub_Total,
                Biaya_Pengiriman,
                Total,
            });

            setKeranjang({
                Sayuran: updatedSayuran,
                Sarana_Pertanian: updatedSarana_Pertanian,
                Sub_Total,
                Biaya_Pengiriman,
                Total,
            });

            toast.success("Item berhasil dihapus dari keranjang.");
        } catch (error) {
            console.error("Gagal menghapus item dari keranjang:", error);
            toast.error("Gagal menghapus item dari keranjang.");
        }
    };

    const updateKuantitasKeranjang = async (index, kuantitasBaru, harga) => {
        try {
            const penggunaSaatIni = localStorage.getItem("ID");
            if (!penggunaSaatIni) {
                toast.error("Anda harus masuk untuk memperbarui kuantitas.");
                return;
            }

            if (
                !keranjang ||
                (!Array.isArray(keranjang.Sayuran) && !Array.isArray(keranjang.Sarana_Pertanian))
            ) {
                toast.error("Keranjang tidak ditemukan atau data keranjang tidak valid.");
                return;
            }

            const totalItems =
                (Array.isArray(keranjang.Sayuran) ? keranjang.Sayuran.length : 0) +
                (Array.isArray(keranjang.Sarana_Pertanian) ? keranjang.Sarana_Pertanian.length : 0);

            if (index < 0 || index >= totalItems) {
                toast.error("Item tidak ditemukan di keranjang.");
                return;
            }

            const updatedSayuran = Array.isArray(keranjang.Sayuran)
                ? [...keranjang.Sayuran]
                : [];
            const updatedSarana_Pertanian = Array.isArray(keranjang.Sarana_Pertanian)
                ? [...keranjang.Sarana_Pertanian]
                : [];

            let updatedProduct;

            if (index < updatedSayuran.length) {
                updatedSayuran[index] = {
                    ...updatedSayuran[index],
                    Kuantitas: kuantitasBaru,
                    Total_Harga: kuantitasBaru * harga,
                };
                updatedProduct = updatedSayuran[index];
            } else {
                const saranaIndex = index - updatedSayuran.length;
                updatedSarana_Pertanian[saranaIndex] = {
                    ...updatedSarana_Pertanian[saranaIndex],
                    Kuantitas: kuantitasBaru,
                    Total_Harga: kuantitasBaru * harga,
                };
                updatedProduct = updatedSarana_Pertanian[saranaIndex];
            }

            const keranjangRef = doc(firestore, "keranjang", penggunaSaatIni);
            await updateDoc(keranjangRef, {
                Sayuran: updatedSayuran,
                Sarana_Pertanian: updatedSarana_Pertanian,
            });

            const subtotalSayuran = updatedSayuran.reduce((acc, item) => acc + item.Total_Harga, 0);
            const subtotalSarana = updatedSarana_Pertanian.reduce((acc, item) => acc + item.Total_Harga, 0);
            const Sub_Total = subtotalSayuran + subtotalSarana;
            const Biaya_Pengiriman = 100000;
            const Total = Sub_Total + Biaya_Pengiriman;

            await updateDoc(keranjangRef, {
                Sub_Total,
                Biaya_Pengiriman,
                Total,
            });

            setKeranjang({
                Sayuran: updatedSayuran,
                Sarana_Pertanian: updatedSarana_Pertanian,
                Sub_Total,
                Biaya_Pengiriman,
                Total,
            });

        } catch (error) {
            console.error("Gagal memperbarui kuantitas keranjang:", error);
            toast.error("Gagal memperbarui kuantitas keranjang.");
        }
    };

    useEffect(() => {
        ambilKeranjang();
    }, []);

    return { keranjang, memuat, ambilKeranjang, hapusItemKeranjang, updateKuantitasKeranjang };
};

export default useAmbilKeranjang;