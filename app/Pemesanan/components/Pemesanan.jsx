import useCart from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { Typography, Button } from '@/app/MTailwind';
import { FaTrash } from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";

const PemesananProduk = () => {
    const pengarah = useRouter();
    const HeaderPesanan = ["Nama", "Harga", "Kuantitas", "Jenis Produk", "Total", "Action"];
    const { cartContent, isLoading, clearCart, handleRemoveItem, handleQuantityChange } = useCart();

    const totalPrice = cartContent.reduce((total, item) => total + item.Total_perItem, 0);
    const formattedTotalPrice = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalPrice);

    return (
        <div className="mt-10 py-20 lg:py-10 z-10 relative">
            <div className="text-base justify-center text-center font-bold" >
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div>
            <div className="grid grid-cols-1 justify-center items-center gap-10 lg:gap-2 space-y-10">
                <div className="flex flex-col items-center justify-center w-full h-full mx-auto text-center leading-relaxed px-4 lg:px-80 overflow-auto">
                    <div className="flex justify-end w-full mb-4">
                        <button className="flex items-center p-2 bg-red-800 text-white border-2 border-white rounded-lg text-sm" onClick={clearCart}>
                            <FaTrash className="text-white mr-2" />
                            <span>Kosongkan Keranjang</span>
                        </button>
                    </div>
                    <table className="w-full min-w-max table-fixed mx-auto bg-white rounded-2xl">
                        <thead>
                            <tr>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-center w-10">
                                    <Typography variant="h6" className="text-black font-black leading-none opacity-70">No</Typography>
                                </th>
                                {HeaderPesanan.map((head) => (
                                    <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-center w-40">
                                        <Typography variant="h6" className="text-black font-black leading-none opacity-70">{head}</Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={HeaderPesanan.length + 1} className="text-center p-4">Loading...</td>
                                </tr>
                            ) : cartContent.length > 0 ? (
                                cartContent.map(({ Nama, Harga, Jumlah_Pesanan, Kategori, Total_perItem }, index) => (
                                    <tr key={index}>
                                        <td className="p-4 text-center">{index + 1}</td>
                                        <td className="p-4">{Nama}</td>
                                        <td className="p-4">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Harga)}</td>
                                        <td className="p-4">
                                            <input
                                                type="number"
                                                value={Jumlah_Pesanan}
                                                min="1"
                                                className="p-2 w-full border border-gray-300 rounded"
                                                onChange={(e) => handleQuantityChange(index, e.target.value)}
                                            />
                                        </td>
                                        <td className="p-4">{Kategori}</td>
                                        <td className="p-4">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Total_perItem)}</td>
                                        <td className="p-4">
                                            <button className="p-2" type="button" onClick={() => handleRemoveItem(index)}>
                                                <FaTrash className="text-red-500" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={HeaderPesanan.length + 1} className="text-center p-4">Keranjang kosong</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="flex flex-col items-center justify-center w-full h-full mx-auto text-center leading-relaxed overflow-auto">
                    <div className="flex flex-col items-center justify-center w-full h-full mx-auto text-center leading-relaxed px-96 overflow-auto">
                        <table className="w-full min-w-max table-auto bg-secondary text-white rounded-2xl shadow-2xl">
                            <thead className="text-center ">
                                <tr>
                                    <td className="p-4 border-b border-blue-gray-50 w-44 uppercase">
                                        <Typography variant="h6" className="font-extrabold">
                                            Total Harga
                                        </Typography>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50 w-44">
                                        <Typography variant="h6" className="font-normal">
                                            {formattedTotalPrice}
                                        </Typography>
                                    </td>
                                </tr>
                            </thead>
                        </table>
                        <div className="flex justify-start mt-10 mx-3">
                            <Button className="button-effect" type="button" onClick={() => pengarah.push("/KonfirmasiPesanan")}>
                                <span>Lanjutkan Pemesanan</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default PemesananProduk;
