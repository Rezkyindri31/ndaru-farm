import Image from 'next/image';
import { RxCross2 } from "react-icons/rx";
import { Typography } from "@material-tailwind/react";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';
import useNavbarAktif from "@/hooks/Frontend/useNavbarAktif";
import useAmbilKeranjang from "@/hooks/Backend/useAmbilKeranjang";

const PemesananProduk = () => {
    const { memuatPesanan, handlenavbarAktif } = useNavbarAktif();
    const { keranjang, memuat, hapusItemKeranjang, updateKuantitasKeranjang } = useAmbilKeranjang();
    const handleKuantitasChange = (value, product, index) => {
        const kuantitasBaru = parseInt(value, 10) || 0;
        updateKuantitasKeranjang(index, kuantitasBaru, product.Harga);
    };

    if (!keranjang || (!keranjang.Sayuran?.length && !keranjang.Sarana_Pertanian?.length)) {
        return (
            <div className='text-center border-2 border-blue-gray-800 rounded-lg shadow-xl p-1 my-12 mx-60 uppercase'>
                <Typography variant="h4">Keranjang Anda kosong</Typography>
            </div>
        );
    }

    return (
        <div className="z-10 relative mt-8">
            <div className="w-full justify-center flex items-center">
                <table className="w-full table-auto text-left mx-64 shadow-lg rounded-xl">
                    <thead className="bg-[#738E5BCC] rounded-t-xl">
                        <tr>
                            <th className="font-bold px-6 py-4 text-center" colSpan={2}>Nama Produk</th>
                            <th className="font-bold px-6 py-4 text-center">Harga</th>
                            <th className="font-bold px-6 py-4 text-center">Kuantitas</th>
                            <th className="font-bold px-6 py-4 text-end">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {['Sayuran', 'Sarana_Pertanian']
                            .flatMap((kategori) => keranjang[kategori] || [])
                            .map((product, index) => (
                                <tr key={index} className="">
                                    <td className="px-6 py-4">
                                        <div
                                            className="w-6 h-6 bg-lightgray bg-opacity-40 items-center justify-center flex rounded-lg cursor-pointer"
                                            onClick={() => hapusItemKeranjang(index)}
                                        >
                                            <RxCross2 size={12} color="black" className="w-4 h-4" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 flex items-center">
                                        <Image
                                            src={product.Gambar}
                                            alt={product.Nama}
                                            width={48}
                                            height={48}
                                            className="object-cover mr-4"
                                        />
                                        {product.Nama}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.Harga).replace(',00', '')}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <input
                                            type="number"
                                            value={product.Kuantitas}
                                            min={1}
                                            max={100}
                                            className="w-16 text-center border border-gray-300 rounded"
                                            onChange={(e) => handleKuantitasChange(e.target.value, product, index)}
                                        />
                                    </td>
                                    <td className="px-6 py-4 text-end">{
                                        new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.Total_Harga).replace(',00', '')}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            <div className="w-full my-4 flex justify-end">
                <div className="w-[400px] mr-64">
                    <div className="w-full max-w-4xl bg-white shadow-md p-4 rounded-lg">
                        <div className="flex justify-between items-center pb-3">
                            <span className="font-medium text-lg">Subtotal</span>
                            <span className="font-bold">
                                {
                                    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(keranjang.Sub_Total).replace(',00', '')}
                            </span>
                        </div>
                        <div className="flex justify-between items-center border-b py-3">
                            <span className="font-medium text-lg">Biaya Kirim</span>
                            <span className="font-bold"> {
                                new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(keranjang.Biaya_Pengiriman).replace(',00', '')}</span>
                        </div>
                        <div className="flex justify-between items-center py-3">
                            <span className="font-medium text-lg">Total</span>
                            <span className="font-bold text-xl"> {
                                new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(keranjang.Total).replace(',00', '')}</span>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => handlenavbarAktif("/KonfirmasiPesanan")}
                                className="px-6 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition"
                                disabled={memuatPesanan}
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default PemesananProduk;
