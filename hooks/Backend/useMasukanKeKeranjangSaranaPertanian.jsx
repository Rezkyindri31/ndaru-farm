import { useState } from "react";
import { auth, firestore } from "@/lib/firebaseConfig";
import toast from "react-hot-toast";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const useMasukanKeKeranjangSaranaPertanian = () => {
    const [memuatMasukKeKeranjangSaranaPertanian, setMemuatMasukKeKeranjangSaranaPertanian] = useState(false);

    const masukanKeKeranjangSaranaPertanian = async (idSaranaPertanian) => {
        setMemuatMasukKeKeranjangSaranaPertanian(true);
        try {
            const penggunaSaatIni = auth.currentUser;
            if (!penggunaSaatIni) {
                toast.error("Anda harus masuk untuk menambahkan ke keranjang.");
                setMemuatMasukKeKeranjangSaranaPertanian(false);
                return;
            }

            const saranaPertanianRef = doc(firestore, "sarana_pertanian", idSaranaPertanian);
            const saranaPertanianSnap = await getDoc(saranaPertanianRef);

            if (!saranaPertanianSnap.exists()) {
                toast.error("Produk tidak ditemukan.");
                setMemuatMasukKeKeranjangSaranaPertanian(false);
                return;
            }

            const dataSaranaPertanian = saranaPertanianSnap.data();
            const keranjangRef = doc(firestore, "keranjang", penggunaSaatIni.uid);
            const keranjangSnap = await getDoc(keranjangRef);

            const saranaPertanianYangDipilih = keranjangSnap.exists()
                ? keranjangSnap.data().Sarana_Pertanian || []
                : [];
            const indeksProduk = saranaPertanianYangDipilih.findIndex(
                (item) => item.ID_Produk === idSaranaPertanian
            );

            if (indeksProduk >= 0) {
                toast.error("Produk sudah ada di keranjang.");
                setMemuatMasukKeKeranjangSaranaPertanian(false);
                return;
            }

            saranaPertanianYangDipilih.push({
                ID_Produk: idSaranaPertanian,
                Nama: dataSaranaPertanian.Nama,
                Harga: dataSaranaPertanian.Harga,
                Gambar: dataSaranaPertanian.Gambar,
                Jenis: dataSaranaPertanian.Jenis,
                Kuantitas: 1,
                Total_Harga: dataSaranaPertanian.Harga,
            });

            if (keranjangSnap.exists()) {
                await updateDoc(keranjangRef, { Sarana_Pertanian: saranaPertanianYangDipilih });
                toast.success("Produk berhasil diperbarui di keranjang!");
            } else {
                await setDoc(keranjangRef, {
                    Sarana_Pertanian: [
                        {
                            ID_Produk: idSaranaPertanian,
                            Nama: dataSaranaPertanian.Nama,
                            Jenis: dataSaranaPertanian.Jenis,
                            Gambar: dataSaranaPertanian.Gambar,
                            Kuantitas: 1,
                            Total_Harga: dataSaranaPertanian.Harga,
                        },
                    ],
                });
                toast.success("Produk berhasil ditambahkan ke keranjang baru!");
            }
        } catch (error) {
            console.error("Gagal menambahkan ke keranjang:", error);
            toast.error("Gagal menambahkan ke keranjang.");
        } finally {
            setMemuatMasukKeKeranjangSaranaPertanian(false);
        }
    };

    return { memuatMasukKeKeranjangSaranaPertanian, masukanKeKeranjangSaranaPertanian };
};

export default useMasukanKeKeranjangSaranaPertanian;
