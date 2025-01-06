"use client";
import React, { useState } from "react";
import Image from "next/image";
import "@/app/globals.css";
import { FaInfoCircle } from "react-icons/fa";
import { BsShop } from "react-icons/bs";
import DialogDetailPesanan from "@/app/TrackingPesanan/components/dialogDetailPesanan";
import useAmbilPemesanan from "@/hooks/Backend/useAmbilPemesanan";
import { Typography, Spinner } from "@material-tailwind/react";

function PesananSaya() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedPemesanan, setSelectedPemesanan] = useState(null);

    const { pemesananData, memuatPemesanan, error } = useAmbilPemesanan();

    const handleOpenDialog = (value, pemesananData) => {
        setSelectedPemesanan(pemesananData);
        setIsDialogOpen(value);
    };

    if (memuatPemesanan) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner className="h-12 w-12 text-green-700" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Typography variant="h2" className="text-red-700">
                    Terjadi kesalahan saat memuat data pesanan.
                </Typography>
            </div>
        );
    }

    if (!pemesananData || pemesananData.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Typography variant="h2" className="text-gray-500">
                    Anda belum memiliki pesanan.
                </Typography>
            </div>
        );
    }

    return (
        <div className="py-10 px-4 lg:px-20">
            <Typography variant="h1" className="text-3xl font-bold mb-6">
                Pesanan Saya
            </Typography>
            <div className="space-y-6">
                {pemesananData.map((pemesanan) => (
                    <div
                        key={pemesanan.ID_Pemesanan}
                        className="border p-6 rounded-lg shadow-md bg-white space-y-4 m-5"
                    >
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-1">
                                <BsShop
                                    size={29}
                                    color="white"
                                    className="bg-green-700 p-1 rounded-md"
                                />
                                <Typography
                                    variant="h2"
                                    className="text-lg font-semibold text-green-700"
                                >
                                    Nomor Pemesanan {pemesanan.ID_Pemesanan}
                                </Typography>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Typography
                                    variant="small"
                                    className={`border p-1 rounded-md ${pemesanan.Status_Pemesanan === "Belum Selesai"
                                        ? "border-red-700 text-red-700"
                                        : "border-green-700 text-green-700"
                                        }`}
                                >
                                    {pemesanan.Status_Pemesanan}
                                </Typography>
                                <FaInfoCircle
                                    size="24"
                                    color="green"
                                    onClick={() => handleOpenDialog(true, pemesanan)}
                                    className="cursor-pointer"
                                />
                            </div>
                        </div>
                        <hr className="border-blue-gray-300" />
                        <ul className="space-y-4">
                            {pemesanan.Data_Pesanan?.map((item, itemIndex) => (
                                <li
                                    key={`${pemesanan.ID_Pemesanan}-${itemIndex}`}
                                    className="flex items-start text-sm"
                                >
                                    <Image
                                        src={item.Gambar}
                                        width={60}
                                        height={60}
                                        className="rounded-md"
                                        alt={item.Nama}
                                    />
                                    <div className="ml-4 flex-1">
                                        <Typography
                                            variant="small"
                                            className="font-bold text-lg"
                                        >
                                            {item.Nama}
                                        </Typography>
                                        <Typography
                                            variant="small"
                                            className="text-gray-500"
                                        >
                                            Kategori: Sayuran
                                        </Typography>
                                    </div>
                                    <div className="text-right">
                                        <Typography
                                            variant="small"
                                            className="text-gray-700"
                                        >
                                            x{item.Kuantitas}
                                        </Typography>
                                        <Typography variant="small">
                                            Rp{item.Harga.toLocaleString()}
                                        </Typography>
                                        <Typography variant="small">
                                            Total: Rp{item.Total_Harga.toLocaleString()}
                                        </Typography>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <hr className="border-blue-gray-300" />
                        <div className="flex justify-end items-center mt-4">
                            <Typography
                                variant="paragraph"
                                className="font-bold text-lg"
                            >
                                Total Pesanan: Rp{pemesanan.Total.toLocaleString()}
                            </Typography>
                        </div>
                    </div>
                ))}
            </div>
            <DialogDetailPesanan
                isOpen={isDialogOpen}
                handleClose={() => setIsDialogOpen(false)}
                pemesananData={selectedPemesanan}
                transaksiData={selectedPemesanan?.transaksiData}
                pengirimanData={selectedPemesanan?.pengirimanData}
            />
        </div>
    );
}

export default PesananSaya;
