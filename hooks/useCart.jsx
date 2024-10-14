import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { db } from "@/lib/firebaseConfig";
import { doc, getDoc, setDoc, collection, addDoc, updateDoc, arrayUnion, writeBatch } from "firebase/firestore";
import useAuth from '@/hooks/useVerifyLogin';
import useProfileSetting from "@/hooks/useProfileSetting";
import { debounce } from 'lodash';

const useCart = () => {
    const user = useAuth();
    const pengarah = useRouter();
    const { userDetails } = useProfileSetting();
    const [cartContent, setCartContent] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleAddToCart = async (item) => {
        if (!user) return;
        const itemExists = cartContent.some(existingItem => existingItem.id === item.id);
        if (itemExists) {
            toast.error("Produk Anda sudah berada di keranjang!");
            return;
        }

        const { Stok, Deskripsi, Jenis, ...itemWithoutDetails } = item;
        const itemWithDetails = {
            ...itemWithoutDetails,
            Jumlah_Pesanan: 1,
            Total_perItem: item.Harga,
        };

        const updatedCart = [...cartContent, itemWithDetails];
        setCartContent(updatedCart);

        try {
            await updateFirestoreCart(updatedCart);
            toast.success("Produk berhasil ditambahkan ke keranjang!");
        } catch (error) {
            console.error("Error adding item to cart: ", error);
            toast.error("Gagal menambahkan produk ke keranjang.");
        }
    };

    const loadCart = async () => {
        if (!user) return;
        try {
            const cartRef = doc(db, "keranjang", user.uid);
            const cartDoc = await getDoc(cartRef);

            if (cartDoc.exists()) {
                setCartContent(cartDoc.data().cart || []);
            } else {
                setCartContent([]);
            }
        } catch (error) {
            console.error("Error retrieving cart data: ", error);
            toast.error("Gagal mengambil data keranjang.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (user) loadCart();
    }, [user]);

    const clearCart = async () => {
        setCartContent([]);
        try {
            if (user) {
                await updateFirestoreCart([], 0);
            }
        } catch (error) {
            console.error("Error clearing cart data: ", error);
            toast.error("Gagal menghapus data keranjang.");
        }
    };

    const handleRemoveItem = async (index) => {
        if (!user) return;

        const updatedCart = cartContent.filter((_, i) => i !== index);
        setCartContent(updatedCart);

        try {
            await updateFirestoreCart(updatedCart);
            toast.success("Item berhasil dihapus dari keranjang.");
        } catch (error) {
            console.error("Error removing item from cart: ", error);
            toast.error("Gagal menghapus item dari keranjang.");
        }
    };

    const debouncedUpdateFirestoreCart = debounce(async (updatedCart) => {
        await updateFirestoreCart(updatedCart);
    }, 500);

    const handleQuantityChange = (index, newQuantity) => {
        if (!user) return;

        const parsedQuantity = parseInt(newQuantity, 10);
        if (isNaN(parsedQuantity) || parsedQuantity < 1) {
            toast.error("Kuantitas tidak valid.");
            return;
        }

        const updatedCart = [...cartContent];
        const item = updatedCart[index];

        item.Jumlah_Pesanan = parsedQuantity;
        item.Total_perItem = item.Harga * parsedQuantity;

        setCartContent(updatedCart);
        debouncedUpdateFirestoreCart(updatedCart);
    };

    const calculateTotalPrice = () => {
        return cartContent.reduce((total, item) => total + item.Total_perItem, 0);
    };

    const updateFirestoreCart = async (updatedCart, totalPrice) => {
        if (!user) return;

        try {
            const cartRef = doc(db, "keranjang", user.uid);
            await setDoc(cartRef, { cart: updatedCart }, { merge: true });
            const finalPrice = totalPrice !== undefined ? totalPrice : calculateTotalPrice();
            await updateDoc(cartRef, { Total_Harga_Keranjang: finalPrice });
            console.log("Firestore cart updated:", { updatedCart, totalPrice: finalPrice });
        } catch (error) {
            console.error("Error updating Firestore cart:", error);
        }
    };

    useEffect(() => {
        if (cartContent.length > 0) {
            const totalPrice = calculateTotalPrice();
            updateFirestoreCart(cartContent);
        }
    }, [cartContent]);

    const totalPrice = cartContent.reduce((total, item) => total + item.Total_perItem, 0);
    const formattedTotalPrice = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalPrice);

    const saveTransaction = async (cartContent, userDetails) => {
        if (!user) {
            console.error("User not authenticated");
            return;
        }

        try {
            const batch = writeBatch(db);
            const transaksiRef = collection(db, "transaksi");

            const transaksiData = {
                userPenerima: {
                    Nama_Penerima: userDetails.Nama_Lengkap_Penerima,
                    Nomor_Telepon_Penerima: userDetails.Nomor_Telepon_Penerima,
                    Alamat_Penerima: userDetails.Alamat_Tagihan_Penerima,
                },
                userTagihan: {
                    Nama_Tagihan: userDetails.Nama_Lengkap,
                    Email_Tagihan: userDetails.Email,
                    Nomor_Telepon_Tagihan: userDetails.Nomor_Telepon,
                    Alamat_Tagihan: userDetails.Alamat_Tagihan,
                },
                items: cartContent.map(item => ({
                    nama: item.Nama,
                    kategori: item.Kategori,
                    harga: item.Harga,
                    jumlah: item.Jumlah_Pesanan,
                    totalPerItem: item.Total_perItem,
                })),
                totalPrice: totalPrice,
                createdAt: new Date(),
                userId: user.uid,
                status: "Pesanan Masuk",
            };

            console.log("Transaction Data:", transaksiData);
            const docRef = await addDoc(transaksiRef, transaksiData);
            console.log("Transaksi berhasil disimpan dengan ID:", docRef.id);
            const userRef = doc(db, "pengguna", user.uid);
            batch.update(userRef, {
                transaksiIds: arrayUnion(docRef.id),
            });
            await batch.commit();
            clearCart();
        } catch (error) {
            console.error("Error menyimpan transaksi:", error);
        }
    };

    const handleConfirmOrder = async () => {
        if (cartContent.length > 0 && userDetails) {
            await saveTransaction(cartContent, userDetails);
            toast.success("Pemesanan Anda Berhasil.");
            pengarah.push("/Beranda");
        } else {
            console.error("Cart kosong atau detail pengguna tidak tersedia");
        }
    };

    return {
        handleAddToCart,
        cartContent,
        isLoading,
        clearCart,
        handleRemoveItem,
        handleQuantityChange,
        setCartContent,
        handleConfirmOrder,
        formattedTotalPrice
    };
};

export default useCart;
