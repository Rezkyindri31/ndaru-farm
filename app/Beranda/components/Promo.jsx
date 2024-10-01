"use client";
import React from 'react';
import { Button } from '@/app/MTailwind';
import { BsCartPlusFill } from "react-icons/bs";

function EventsSection() {
    return (
        <div className="mt-40 py-20 lg:py-32 z-10 relative bg-gray">
            <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-10 lg:items-center lg:justify-end lg:gap-2 ">
                <div className="flex items-center justify-center w-60 h-60 rounded-full border-8 border-black bg-secondary mx-auto ">
                    <div className="text-center text-black">
                        <p className="text-3xl font-bold">30%</p>
                        <p className="text-md">diskon per kg</p>
                    </div>
                </div>
                <div className="text-center lg:text-left lg:space-y-4 mx-6 lg:mx-12 lg:mr-80 ">
                    <h2 className="text-2xl font-bold text-primary">
                        Kesegaran <span className="font-black">di Bulan Ini</span>
                    </h2>
                    <p className="text-xl font-black">SELADA</p>
                    <p className="text-gray-600">
                        Produk ini baru dipanen dan sangat segar serta kualitasnya tidak perlu diragukan lagi. Produk ini sudah sangat menarik untuk dibeli.
                    </p>
                    <div className="grid grid-cols-4 gap-4 justify-center">
                        {['Days', 'Hours', 'Mins', 'Secs'].map((label, idx) => (
                            <div key={idx} className="text-center">
                                <div className="border-2 border-secondary px-4 py-2 rounded-lg text-primary font-bold text-2xl">00</div>
                                <p className="text-black">{label}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-4">
                        <Button className="w-80 text-lg bg-secondary text-white border-none rounded-full px-8 py-2 font-semibold uppercase transition-transform duration-300 ease-in-out flex justify-center items-center gap-2 hover:bg-white hover:text-secondary hover:scale-110" type="button">
                            <BsCartPlusFill /> Masukkan Keranjang
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventsSection;
