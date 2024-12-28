"use client";
import React from "react";
import Image from "next/image";
import { Typography, Button, IconButton } from "@/app/MTailwind";
import { BsCartPlusFill } from "react-icons/bs";
import useStateSaranaPertanian from "@/hooks/Frontend/useTampilkanSaranaPertanian";
import useVerifikasiLogin from '@/hooks/Backend/useVerifikasiLogin';
import useMasukanKeKeranjangSaranaPertanian from "@/hooks/Backend/useMasukanKeKeranjangSaranaPertanian";

function SaranaPertanian() {
    const { isLoggedIn, loading: loadingLogin } = useVerifikasiLogin();
    const { memuatMasukKeKeranjangSaranaPertanian, masukanKeKeranjangSaranaPertanian } = useMasukanKeKeranjangSaranaPertanian();
    const { activePage,
        totalPages,
        getCurrentFasilitas,
        getItemProps,
    } = useStateSaranaPertanian();

    const currentSarana = getCurrentFasilitas() || [];
    const sortedSarana = currentSarana.sort((a, b) => {
        const dateA = new Date(a.Tanggal_Dibuat);
        const dateB = new Date(b.Tanggal_Dibuat);
        return dateB - dateA;
    });
    return (
        <div className="h-full my-16">
            {sortedSarana.length > 0 ? (
                <>
                    <div className="flex items-center justify-center gap-4 uppercase font-black pt-2">
                        <h1 className="text-4xl text-secondary underline underline-offset-8">Sarana Pertanian</h1>
                        <h1 className="text-4xl">Kami</h1>
                    </div>
                    <div className="flex items-center text-center justify-center gap-4 font-black my-10 mx-96">
                        <Typography variant="paragraph">
                            Kami adalah tim yang berkomitmen untuk menyediakan sarana pertanian dalam pengenalan metode tanam hidroponik yang nantinya dapat dijadikan referensi dalam memulai penanaman hidroponik.
                        </Typography>
                    </div>
                    <div className="saranapertanian-container grid grid-cols-1 gap-1 py-6 lg:grid-cols-3 lg:gap-6 justify-items-center px-5 lg:px-36 lg:py-4">
                        {sortedSarana.map((fasilitas) => (
                            <div key={fasilitas.id} className="relative flex flex-col my-6 bg-white border border-gray rounded-lg shadow-lg mx-5 p-12 w-auto transition-transform duration-300 ease-in-out hover:shadow-none hover:border-none hover:scale-110">
                                <div className="relative h-72 m-2.5 overflow-hidden text-white rounded-md">
                                    <Image src={fasilitas.Gambar}
                                        alt={`${fasilitas.Nama}-image`}
                                        fill
                                        className="rounded-md object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                                </div>
                                <div className="p-4 space-y-2">
                                    <div className="flex items-center">
                                        <h6 className="text-slate-800 text-xl font-black">
                                            {fasilitas.Nama}
                                        </h6>
                                    </div>
                                    <p className="text-slate-600 leading-normal">
                                        {fasilitas.Deskripsi}
                                    </p>
                                    <div className="flex items-center mb-2">
                                        <p className="text-slate-600 leading-normal font-bold">
                                            Rp {fasilitas.Harga.toLocaleString('id-ID')}
                                        </p>
                                    </div>
                                </div>
                                <div className="px-4 pb-4 pt-0 mt-2 text-base">
                                    <button
                                        className={`w-full text-sm border-none rounded-full px-8 py-2 font-semibold uppercase transition-transform duration-300 ease-in-out flex justify-center items-center gap-2 cursor-pointer ${isLoggedIn
                                            ? "bg-secondary text-white hover:bg-white hover:text-secondary hover:scale-110"
                                            : "bg-gray-400 text-gray-200 cursor-not-allowed"
                                            }`}
                                        type="button"
                                        onClick={() => masukanKeKeranjangSaranaPertanian(fasilitas.id)}
                                        disabled={!isLoggedIn || loadingLogin || memuatMasukKeKeranjangSaranaPertanian}
                                    >
                                        {memuatMasukKeKeranjangSaranaPertanian ? (
                                            <span>Loading...</span>
                                        ) : (
                                            <>
                                                <BsCartPlusFill /> Masukkan Keranjang
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-4">
                        <div className="flex items-center space-x-2">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <Button
                                    key={index}
                                    variant={getItemProps(index + 1).variant}
                                    onClick={getItemProps(index + 1).onClick}
                                    className={`rounded-full ${activePage === index + 1 ? 'bg-primary text-white' : 'text-gray-500'}`}
                                >
                                    {index + 1}
                                </Button>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <div className="text-center">
                    <Typography className="text-2xl">Tidak ada produk tersedia.</Typography>
                </div>
            )}
        </div>

    );
}

export default SaranaPertanian;
