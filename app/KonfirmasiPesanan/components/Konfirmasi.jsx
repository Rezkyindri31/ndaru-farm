"use client";
import React from "react";
import "@/app/globals.css";
import { Typography } from "@material-tailwind/react";
import { Open_Sans } from "next/font/google";
import Skeleton from 'react-loading-skeleton'
import useTampilanPengguna from "@/hooks/Frontend/useTampilanPengguna";
import useAmbilKeranjang from "@/hooks/Backend/useAmbilKeranjang";
import useBuatPemesanan from "@/hooks/Backend/useBuatPemesanan"; // Sesuaikan path


const openSans = Open_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});


function KonfirmasiPemesanan() {
    const { memuatPesanan, pembuatanPemesanan } = useBuatPemesanan();
    const { keranjang, memuat } = useAmbilKeranjang();
    const { detailPengguna } = useTampilanPengguna();
    if (memuat) {
        return (
            <div colSpan="5">
                <Skeleton count={5} height={40} />
            </div>
        );
    }

    if (!keranjang || (!keranjang.Sayuran?.length && !keranjang.Sarana_Pertanian?.length)) {
        return (
            <div className='text-center border-2 border-blue-gray-800 rounded-lg shadow-xl p-1 my-12 mx-60 uppercase'>
                <Typography variant="h2">Keranjang Anda kosong</Typography>
            </div>
        );
    }

    const handleCreatePemesanan = async () => {
        await pembuatanPemesanan();
    };

    return (
        <div className={`my-10 py-10 px-4 lg:px-20 ${openSans.className}`}>
            <h1 className={`text-3xl font-bold mb-8 ${openSans.className}`}>Konfirmasi Pesanan</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md border border-black">
                    <h2 className={`text-xl font-semibold mb-4 ${openSans.className}`}>Detail Pesanan</h2>
                    <ul className="space-y-4">
                        {['Sayuran', 'Sarana_Pertanian']
                            .flatMap((kategori) => keranjang[kategori] || [])
                            .map((product, index) => (
                                <li
                                    key={index}
                                    className={`flex justify-between text-sm text-gray-700 ${openSans.className}`}
                                >
                                    <span className="w-3/4">{product.Nama}</span>
                                    <span className="text-gray-500">x{product.Kuantitas}</span>
                                    <span>
                                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.Total_Harga).replace(',00', '')}
                                    </span>
                                </li>
                            ))}
                    </ul>
                    <div className="border-t mt-4 pt-4 space-y-2 text-sm">
                        <div className={`flex justify-between ${openSans.className}`}>
                            <span>Subtotal</span>
                            <span> {
                                new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(keranjang.Sub_Total).replace(',00', '')}
                            </span>
                        </div>
                        <div className={`flex justify-between ${openSans.className}`}>
                            <span>Biaya Pengiriman</span>
                            <span>
                                <span> {
                                    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(keranjang.Biaya_Pengiriman).replace(',00', '')}
                                </span>
                            </span>
                        </div>
                        <div className={`flex justify-between font-semibold text-lg ${openSans.className}`}>
                            <span>Total</span>
                            <span>
                                <span> {
                                    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(keranjang.Total).replace(',00', '')}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className={`text-xl font-semibold mb-4 ${openSans.className}`}>Alamat Penerima</h2>
                    <div className="space-y-4 shadow-md">
                        <div className="p-4 border rounded-lg border-black">
                            <div className={`flex items-center justify-between ${openSans.className}`}>
                                <span className="text-xl font-bold">Rumah</span>
                            </div>
                            <p className={`mt-2 text-lg ${openSans.className}`}>
                                {detailPengguna.Nama_Lengkap_Penerima || "Tidak tersedia"}
                            </p>
                            <p className={`mt-1 text-lg ${openSans.className}`}>
                                {detailPengguna.No_Telepon_Penerima || "Tidak tersedia"}
                            </p>
                            <p className={`mt-1 text-lg ${openSans.className}`}>
                                {detailPengguna.Alamat_Penerima || "Tidak tersedia"}
                            </p>
                        </div>
                    </div>
                    <div className="flex mt-4 justify-end items-center ml-6">
                        <button
                            onClick={handleCreatePemesanan}
                            disabled={memuatPesanan}
                            className={`w-full mx-5 py-2 bg-green-700 rounded-md font-bold text-white ${openSans.className} hover:bg-white hover:text-green-700 hover:border hover:border-green700 transition duration-300 ease-in-out `}>
                            {memuatPesanan ? "Sedang Membuat Pemesanan" : "Buat Pemesanan"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default KonfirmasiPemesanan;
