import { useState, useEffect } from "react";
import { firestore } from "@/lib/firebaseConfig";
import { toast } from "react-hot-toast";
import { doc, getDoc, updateDoc, setDoc, collection } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const useBuatPemesanan = () => {
    const [memuatPesanan, setMemuatPesanan] = useState(false);

    const pembuatanPemesanan = async (metodePembayaran) => {
        setMemuatPesanan(true);
        try {
            const penggunaSaatIni = localStorage.getItem("ID");
            if (!penggunaSaatIni) {
                toast.error("Anda harus masuk untuk melanjutkan.");
                setMemuatPesanan(false);
                return;
            }

            const keranjangRef = doc(firestore, "keranjang", penggunaSaatIni);
            const keranjangSnap = await getDoc(keranjangRef);
            if (!keranjangSnap.exists()) {
                toast.error("Keranjang tidak ditemukan.");
                setMemuatPesanan(false);
                return;
            }

            const keranjangData = keranjangSnap.data();
            const dataPesanan = [
                ...(keranjangData.Sayuran || []),
                ...(keranjangData.Sarana_Pertanian || []),
            ];

            const penggunaRef = doc(firestore, "pengguna", penggunaSaatIni);
            const penggunaSnap = await getDoc(penggunaRef);
            if (!penggunaSnap.exists()) {
                toast.error("Data pengguna tidak ditemukan.");
                setMemuatPesanan(false);
                return;
            }

            const penggunaData = penggunaSnap.data();
            const dataPengguna = {
                Nama_Lengkap_Penerima: penggunaData.Nama_Lengkap_Penerima,
                No_Telepon_Penerima: penggunaData.No_Telepon_Penerima,
                Alamat_Penerima: penggunaData.Alamat_Penerima,
                Email: penggunaData.Email,
            };

            const pemesananId = uuidv4().slice(0, 16);
            const transaksiId = uuidv4().slice(0, 16);

            const pemesananRef = doc(collection(firestore, "pemesanan"), pemesananId);
            await setDoc(pemesananRef, {
                Data_Pesanan: dataPesanan,
                Data_Pengguna: dataPengguna,
                ID_Pengguna: penggunaSaatIni,
                ID_Transaksi: transaksiId,
                Total: keranjangData.Total,
                Sub_Total: keranjangData.Sub_Total,
                Biaya_Pengiriman: keranjangData.Biaya_Pengiriman,
                Status_Pemesanan: "Belum Selesai",
                Tanggal_Pemesanan: new Date().toISOString(),
            });

            const transaksiRef = doc(firestore, "transaksi", transaksiId);
            await setDoc(transaksiRef, {
                Status_Pembayaran: "Belum Lunas",
                Metode_Pembayaran: metodePembayaran
            });

            await updateDoc(keranjangRef, {
                Sayuran: [],
                Sarana_Pertanian: [],
                Sub_Total: 0,
                Biaya_Pengiriman: 0,
                Total: 0,
            });

            toast.success("Pemesanan berhasil dibuat!");
            window.location.href = `/TrackingPesanan`;
        } catch (error) {
            console.error("Gagal membuat pemesanan:", error);
            toast.error("Gagal membuat pemesanan.");
        } finally {
            setMemuatPesanan(false);
        }
    };

    return { memuatPesanan, pembuatanPemesanan };
};

export default useBuatPemesanan;
