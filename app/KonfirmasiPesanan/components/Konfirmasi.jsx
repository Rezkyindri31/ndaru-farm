"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "@/app/globals.css";
import useTampilanPengguna from "@/hooks/Frontend/useTampilanPengguna";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(number);
};

function KonfirmasiPemesanan() {
    const router = useRouter();
    const { detailPengguna } = useTampilanPengguna();

    const barangPesanan = [
        { nama: "Bayam", jumlah: 4, harga: 15000 },
        { nama: "Selada", jumlah: 2, harga: 15000 },
        { nama: "Packchuoy", jumlah: 4, harga: 15000 },
    ];

    const subtotal = barangPesanan.reduce((total, item) => total + item.harga * item.jumlah, 0);
    const biayaPengiriman = 0;
    const total = subtotal + biayaPengiriman;
    const handleBuatPesanan = () => {
        router.push('/TrackingPesanan');
    };


    return (
        <div className={`my-10 py-10 px-4 lg:px-20 ${openSans.className}`}>
            <h1 className={`text-3xl font-bold mb-8 ${openSans.className}`}>Konfirmasi Pesanan</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md border border-black">
                    <h2 className={`text-xl font-semibold mb-4 ${openSans.className}`}>Detail Pesanan</h2>
                    <ul className="space-y-4">
                        {barangPesanan.map((item, index) => (
                            <li
                                key={index}
                                className={`flex justify-between text-sm text-gray-700 ${openSans.className}`}
                            >
                                <span className="w-3/4">{item.nama}</span>
                                <span className="text-gray-500">x{item.jumlah}</span>
                                <span>{formatRupiah(item.harga * item.jumlah)}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="border-t mt-4 pt-4 space-y-2 text-sm">
                        <div className={`flex justify-between ${openSans.className}`}>
                            <span>Subtotal</span>
                            <span>{formatRupiah(subtotal)}</span>
                        </div>
                        <div className={`flex justify-between ${openSans.className}`}>
                            <span>Biaya Pengiriman</span>
                            <span>{formatRupiah(biayaPengiriman)}</span>
                        </div>
                        <div className={`flex justify-between font-semibold text-lg ${openSans.className}`}>
                            <span>Total</span>
                            <span>{formatRupiah(total)}</span>
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
                                Nama: {detailPengguna.Nama_Lengkap_Penerima || "Tidak tersedia"}
                            </p>
                            {/* <p className={`mt-1 text-lg ${openSans.className}`}>
                                Telepon: {detailPengguna?.No_Telepon_Penerima || "Tidak tersedia"}
                            </p>
                            <p className={`mt-1 text-lg ${openSans.className}`}>
                                Alamat: {detailPengguna?.Alamat_Penerima || "Tidak tersedia"}
                            </p> */}
                        </div>
                    </div>
                    <div className="flex mt-4 justify-end items-center ml-6">
                        <button onClick={handleBuatPesanan} className={`w-full mx-5 py-2 bg-green-700 rounded-md font-bold text-white ${openSans.className} hover:bg-white hover:text-green-700 hover:border hover:border-green700 transition duration-300 ease-in-out `}>Buat Pesanan</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default KonfirmasiPemesanan;
