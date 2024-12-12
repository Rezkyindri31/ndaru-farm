import { useState } from "react";
import { auth, firestore } from "@/lib/firebaseConfig";
import toast from "react-hot-toast";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const useMasukanKeKeranjangSayuran = () => {
    const [memuatMasukKeKeranjangSayuran, setMemuatMasukKeKeranjangSayuran] = useState(false);

    const masukanKeKeranjangSayuran = async (idSayuran) => {
        setMemuatMasukKeKeranjangSayuran(true);
        try {
            const penggunaSaatIni = auth.currentUser;
            if (!penggunaSaatIni) {
                toast.error("Anda harus masuk untuk menambahkan ke keranjang.");
                setMemuatMasukKeKeranjangSayuran(false);
                return;
            }

            const sayuranRef = doc(firestore, "sayuran", idSayuran);
            const sayuranSnap = await getDoc(sayuranRef);

            if (!sayuranSnap.exists()) {
                toast.error("Produk tidak ditemukan.");
                setMemuatMasukKeKeranjangSayuran(false);
                return;
            }

            const dataSayuran = sayuranSnap.data();
            const keranjangRef = doc(firestore, "keranjang", penggunaSaatIni.uid);
            const keranjangSnap = await getDoc(keranjangRef);

            const sayuranYangDipilih = keranjangSnap.exists()
                ? keranjangSnap.data().Sayuran || []
                : [];
            const indeksProduk = sayuranYangDipilih.findIndex(
                (item) => item.ID_Produk === idSayuran
            );

            if (indeksProduk >= 0) {
                toast.error("Produk sudah ada di keranjang.");
                setMemuatMasukKeKeranjangSayuran(false);
                return;
            }

            sayuranYangDipilih.push({
                ID_Produk: idSayuran,
                Nama: dataSayuran.Nama,
                Harga: dataSayuran.Harga,
                Berat: dataSayuran.Berat,
                Gambar: dataSayuran.Gambar,
                Kuantitas: 1,
                Total_Harga: dataSayuran.Harga,
            });

            if (keranjangSnap.exists()) {
                await updateDoc(keranjangRef, { Sayuran: sayuranYangDipilih });
                toast.success("Produk berhasil diperbarui di keranjang!");
            } else {
                await setDoc(keranjangRef, {
                    Sayuran: [
                        {
                            ID_Produk: idSayuran,
                            Nama: dataSayuran.Nama,
                            Harga: dataSayuran.Harga,
                            Berat: dataSayuran.Berat,
                            Gambar: dataSayuran.Gambar,
                            Kuantitas: 1,
                            Total_Harga: dataSayuran.Harga,
                        },
                    ],
                });
                toast.success("Produk berhasil ditambahkan ke keranjang baru!");
            }
        } catch (error) {
            console.error("Gagal menambahkan ke keranjang:", error);
            toast.error("Gagal menambahkan ke keranjang.");
        } finally {
            setMemuatMasukKeKeranjangSayuran(false);
        }
    };

    return { memuatMasukKeKeranjangSayuran, masukanKeKeranjangSayuran };
};

export default useMasukanKeKeranjangSayuran;
