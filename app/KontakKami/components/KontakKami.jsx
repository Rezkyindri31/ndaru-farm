import React, { useState } from 'react';
import { FaMapMarkedAlt, FaClock, FaAddressBook } from "react-icons/fa";
import "@/app/globals.css";

function Kontak() {
    return (
        <div className="mt-10 py-20 lg:py-10 z-10 relative">
            <div className=" md:grid-cols-2 justify-center items-center gap-10 lg:items-center lg:justify-end lg:gap-2">
                <div className="flex justify-center items-center px-32 mx-auto lg:mr-auto">
                    <div className="text-center lg:text-left lg:space-y-4 mx-6 lg:mx-12">
                        <div className="space-y-10 border-2 border-secondary bg-gray rounded-xl px-7 py-12">
                            <div className="flex flex-col items-start space-y-3">
                                <h1 className="text-2xl font-bold flex items-center">
                                    <FaMapMarkedAlt className="mr-2 text-secondary" /> Alamat Toko
                                </h1>
                                <p className="text-base">Jl. Terusan SMP, Batujajar Bar., Kec. Batujajar, Kabupaten Bandung Barat, Jawa Barat 40561</p>
                            </div>
                            <div className="flex flex-col items-start space-y-3">
                                <h1 className="text-2xl font-bold flex items-center">
                                    <FaClock className="mr-2 text-secondary" /> Waktu Buka Toko
                                </h1>
                                <p className="text-base">Senin - Jumat : 08.00 - 17.00</p>
                                <p className="text-base">Sabtu - Minggu : 08.00 - 15.00</p>
                                <p className="text-base">Online : 24 Jam</p>
                            </div>
                            <div className="flex flex-col items-start space-y-3">
                                <h1 className="text-2xl font-bold flex items-center">
                                    <FaAddressBook className="mr-2 text-secondary" /> Kontak Toko
                                </h1>
                                <p className="text-base">0882-1599-3129</p>
                                <p className="text-base">chandrasatriana9@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Kontak;
