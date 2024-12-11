"use client";
import React, { useState } from "react";
import Image from "next/image";
import "@/app/globals.css";
import { FaInfoCircle } from "react-icons/fa";
import { BsShop } from "react-icons/bs";

import Selada from "@/assets/img/Produk/Selada.jpeg";
import Pokcoy from "@/assets/img/Produk/Pokcoy.jpeg";
import DialogDetailPesanan from "@/app/TrackingPesanan/components/dialogDetailPesanan";

function PesananSaya() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleOpenDialog = (value) => {
        setIsDialogOpen(value);
    };

    return (
        <div className="py-10 px-4 lg:px-20">
            <h1 className="text-3xl font-bold mb-6">Pesanan Saya</h1>
            <div className="space-y-6">
                <div className="border p-6 rounded-lg shadow-md bg-white space-y-4 m-5">
                    <div className="flex justify-between items-center">
                        <div className="flex justify-center items-center space-x-1">
                            <BsShop size={29} color="white" className="bg-green-700 p-1 rounded-md" />
                            <h2 className="text-lg font-semibold text-green-700">NDARU MART</h2>
                        </div>
                        <div className="flex justify-end items-center space-x-2">
                            <p className="border border-green-700 p-1 rounded-md text-green-700">
                                Pesanan Selesai
                            </p>
                            <FaInfoCircle
                                size="24"
                                color="green"
                                onClick={() => handleOpenDialog(true)}
                                className="cursor-pointer"
                            />
                        </div>
                    </div>
                    <hr className="border-blue-gray-300" />
                    <ul className="space-y-4">
                        <li className="flex items-start text-sm">
                            <Image
                                src={Selada}
                                width={60}
                                height={60}
                                className="rounded-md"
                                alt="Selada"
                            />
                            <div className="ml-4 flex-1">
                                <p className="font-bold text-lg">Selada</p>
                                <p className="text-gray-500">Kategori: Sayuran</p>
                            </div>
                            <div className="text-right">
                                <p className="text-gray-700">x4</p>
                                <p>Rp15.000</p>
                            </div>
                        </li>
                        <li className="flex items-start text-sm">
                            <Image
                                src={Pokcoy}
                                width={60}
                                height={60}
                                className="rounded-md"
                                alt="Pokcoy"
                            />
                            <div className="ml-4 flex-1">
                                <p className="font-bold text-lg">Pokcoy</p>
                                <p className="text-gray-500">Kategori: Sayuran</p>
                            </div>
                            <div className="text-right">
                                <p className="text-gray-700">x3</p>
                                <p>Rp12.000</p>
                            </div>
                        </li>
                    </ul>
                    <hr className="border-blue-gray-300" />
                    <div className="flex justify-end items-center mt-4">
                        <p className="font-bold text-lg">Total Pesanan: Rp96.000</p>
                    </div>
                </div>
            </div>

            <DialogDetailPesanan
                isOpen={isDialogOpen}
                handleClose={handleOpenDialog}
            />
        </div>
    );
}

export default PesananSaya;
