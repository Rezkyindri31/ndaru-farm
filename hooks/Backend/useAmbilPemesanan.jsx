import { useState, useEffect } from "react";
import { firestore } from "@/lib/firebaseConfig";
import { toast } from "react-hot-toast";
import { collection, doc, getDoc, query, where, getDocs } from "firebase/firestore";

const useAmbilPemesanan = () => {
    const [pemesananList, setPemesananList] = useState([]);
    const [pemesananData, setPemesananData] = useState([]);
    const [memuatPemesanan, setMemuatPemesanan] = useState(false);

    useEffect(() => {
        const fetchPemesanan = async () => {
            setMemuatPemesanan(true);
            try {
                const penggunaSaatIni = localStorage.getItem("ID");
                if (!penggunaSaatIni) {
                    toast.error("Anda harus masuk untuk melanjutkan.");
                    setMemuatPemesanan(false);
                    return;
                }

                const pemesananRef = collection(firestore, "pemesanan");
                const q = query(pemesananRef, where("ID_Pengguna", "==", penggunaSaatIni));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    setMemuatPemesanan(false);
                    return;
                }

                const pemesananListData = querySnapshot.docs.map((doc) => ({
                    ...doc.data(),
                    ID_Pemesanan: doc.id,
                }));

                const detailedPemesanan = await Promise.all(
                    pemesananListData.map(async (pemesanan) => {
                        const transaksiData = pemesanan.ID_Transaksi
                            ? await fetchDetailData("transaksi", pemesanan.ID_Transaksi)
                            : null;

                        const penggunaData = pemesanan.ID_Pengguna
                            ? await fetchDetailData("pengguna", pemesanan.ID_Pengguna)
                            : null;

                        const pengirimanData = pemesanan.ID_Pengiriman
                            ? await fetchDetailData("pengiriman", pemesanan.ID_Pengiriman)
                            : null;

                        return {
                            ...pemesanan,
                            transaksiData,
                            penggunaData,
                            pengirimanData,
                        };
                    })
                );

                setPemesananList(pemesananListData);
                setPemesananData(detailedPemesanan);
            } catch (error) {
                console.error("Gagal mengambil data pemesanan:", error);
                toast.error("Gagal mengambil data pemesanan.");
            } finally {
                setMemuatPemesanan(false);
            }
        };

        const fetchDetailData = async (collectionName, documentId) => {
            try {
                const docRef = doc(firestore, collectionName, documentId);
                const docSnapshot = await getDoc(docRef);
                if (!docSnapshot.exists()) {
                    toast.error(`Data dari koleksi ${collectionName} dengan ID tersebut tidak ditemukan.`);
                    return null;
                }
                return { ...docSnapshot.data(), ID: docSnapshot.id };
            } catch (error) {
                console.error(`Gagal mengambil data dari koleksi ${collectionName}:`, error);
                toast.error(`Gagal mengambil data dari koleksi ${collectionName}.`);
                return null;
            }
        };

        fetchPemesanan();
    }, []);

    return { pemesananList, pemesananData, memuatPemesanan };
};

export default useAmbilPemesanan;
