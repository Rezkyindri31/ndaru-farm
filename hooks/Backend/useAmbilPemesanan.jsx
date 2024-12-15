import { useState, useEffect } from "react";
import { firestore } from "@/lib/firebaseConfig";
import { toast } from "react-hot-toast";
import { collection, query, where, getDocs } from "firebase/firestore";

const useAmbilPemesanan = () => {
    const [pemesananList, setPemesananList] = useState([]);
    const [pemesananData, setPemesananData] = useState(null);
    const [transaksiData, setTransaksiData] = useState(null);
    const [penggunaData, setPenggunaData] = useState(null);
    const [memuatPemesanan, setMemuatPemesanan] = useState(false);
    const [memuatTransaksi, setMemuatTransaksi] = useState(false);
    const [memuatPengguna, setMemuatPengguna] = useState(false);

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
                const pemesananListData = querySnapshot.docs.map((pemesananDoc) => {
                    return {
                        ...pemesananDoc.data(),
                        ID_Pemesanan: pemesananDoc.id,
                    };
                });
                setPemesananList(pemesananListData);

                for (const pemesanan of pemesananListData) {
                    if (pemesanan.ID_Transaksi) {
                        await fetchTransaksiData(pemesanan.ID_Transaksi);
                    }

                    if (pemesanan.ID_Pengguna) {
                        await fetchPenggunaData(pemesanan.ID_Pengguna);
                    }
                }
            } catch (error) {
                console.error("Gagal mengambil data pemesanan:", error);
                toast.error("Gagal mengambil data pemesanan.");
            } finally {
                setMemuatPemesanan(false);
            }
        };

        const fetchTransaksiData = async (ID_Transaksi) => {
            setMemuatTransaksi(true);
            try {
                const transaksiRef = collection(firestore, "transaksi");
                const querySnapshot = await getDocs(transaksiRef);

                if (querySnapshot.empty) {
                    setMemuatTransaksi(false);
                    return;
                }

                const transaksiDoc = querySnapshot.docs.find((doc) => doc.id === ID_Transaksi);

                if (!transaksiDoc) {
                    setMemuatTransaksi(false);
                    toast.error("Tidak ada transaksi yang cocok dengan ID tersebut.");
                    return;
                }

                const transaksiDataWithId = {
                    ...transaksiDoc.data(),
                    ID_Transaksi: transaksiDoc.id,
                };
                setTransaksiData(transaksiDataWithId);
            } catch (error) {
                console.error("Gagal mengambil data transaksi:", error);
                toast.error("Gagal mengambil data transaksi.");
            } finally {
                setMemuatTransaksi(false);
            }
        };

        const fetchPenggunaData = async (ID_Pengguna) => {
            setMemuatPengguna(true);
            try {
                const penggunaRef = collection(firestore, "pengguna");
                const querySnapshot = await getDocs(penggunaRef);

                if (querySnapshot.empty) {
                    setMemuatPengguna(false);
                    toast.error("Tidak ada pengguna yang ditemukan.");
                    return;
                }

                const penggunaDoc = querySnapshot.docs.find((doc) => doc.id === ID_Pengguna);

                if (!penggunaDoc) {
                    setMemuatPengguna(false);
                    toast.error("Tidak ada pengguna yang cocok dengan ID tersebut.");
                    return;
                }

                const penggunaDataWithId = {
                    ...penggunaDoc.data(),
                    ID_Pengguna: penggunaDoc.id,
                };
                setPenggunaData(penggunaDataWithId);
            } catch (error) {
                console.error("Gagal mengambil data pengguna:", error);
                toast.error("Gagal mengambil data pengguna.");
            } finally {
                setMemuatPengguna(false);
            }
        };


        fetchPemesanan();
    }, []);
    return { pemesananData, memuatPemesanan, transaksiData, memuatTransaksi, penggunaData, memuatPengguna, pemesananList };
};

export default useAmbilPemesanan;
