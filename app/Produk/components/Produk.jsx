"use client";
import React from "react";
import Image from "next/image";
import { Typography, Button, IconButton, Popover, PopoverHandler, PopoverContent } from "@/app/MTailwind";
import {
    FaCircleInfo,
} from "react-icons/fa6";
import { BsCartPlusFill } from "react-icons/bs";
import useStateProduk from "@/hooks/Frontend/useTampilanProduk";
import useVerifikasiLogin from "@/hooks/Backend/useVerifikasiLogin";
import useMasukanKeKeranjangSayuran from "@/hooks/Backend/useMasukanKeKeranjangSayuran";

function Produk() {
    const { isLoggedIn, loading: loadingLogin } = useVerifikasiLogin();
    const { memuatMasukKeKeranjangSayuran, masukanKeKeranjangSayuran } = useMasukanKeKeranjangSayuran();
    const {
        activePage,
        totalPages,
        getCurrentProducts,
        getItemProps,
        next,
        prev,
    } = useStateProduk();

    const currentProducts = getCurrentProducts() || [];
    const sortedProducts = currentProducts.sort((a, b) => {
        const dateA = new Date(a.Tanggal_Dibuat);
        const dateB = new Date(b.Tanggal_Dibuat);
        return dateB - dateA;
    });

    return (
        <div className="h-full my-16">
            {sortedProducts.length > 0 ? (
                <>
                    <div className="produk-container grid grid-cols-1 gap-1 py-6 lg:grid-cols-3 lg:gap-6 justify-items-center px-5 lg:px-36 lg:py-4">
                        {sortedProducts.map((product) => (
                            <div
                                key={product.id}
                                className="relative flex flex-col my-6 bg-white border border-gray rounded-lg shadow-lg mx-5 p-6 w-auto transition-all duration-300 ease-in-out hover:shadow-2xl hover:border-none hover:scale-105"
                            >
                                <Popover>
                                    <PopoverHandler>
                                        <div className="absolute top-4 right-4">
                                            <FaCircleInfo
                                                size={20}
                                                className="text-gray-500 cursor-pointer hover:text-secondary"
                                            />
                                        </div>
                                    </PopoverHandler>
                                    <PopoverContent>
                                        <Typography variant="small">
                                            Harga produk / {product.Berat} kg
                                        </Typography>
                                    </PopoverContent>
                                </Popover>
                                <div className="relative h-80 m-2.5 overflow-hidden text-white rounded-md">
                                    <Image
                                        src={product.Gambar}
                                        alt={`${product.Nama}-image`}
                                        width={600}
                                        height={400}
                                        className="rounded-md object-cover"
                                    />
                                </div>
                                <div className="p-4 space-y-2">
                                    <div className="flex items-center">
                                        <h6 className="text-slate-800 text-xl font-black">
                                            {product.Nama}
                                        </h6>
                                    </div>
                                    <Typography variant="paragraph" className="leading-normal">{product.Deskripsi}</Typography>
                                    <div className="flex items-center mb-2">
                                        <p className="text-slate-600 leading-normal font-bold">
                                            Rp {product.Harga.toLocaleString("id-ID")}
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
                                        onClick={() => masukanKeKeranjangSayuran(product.id)}
                                        disabled={!isLoggedIn || loadingLogin || memuatMasukKeKeranjangSayuran}
                                    >
                                        {memuatMasukKeKeranjangSayuran ? (
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

export default Produk;
