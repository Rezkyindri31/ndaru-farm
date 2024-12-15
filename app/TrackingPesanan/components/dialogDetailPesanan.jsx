"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Dialog, DialogHeader, DialogBody, Typography, Button } from "@material-tailwind/react";
import { FaTimes } from "react-icons/fa";
import { LuPackagePlus, LuPackageCheck } from "react-icons/lu";
import { LiaMoneyBillWaveSolid, LiaShippingFastSolid } from "react-icons/lia";
import useTampilanPengguna from "@/hooks/Frontend/useTampilanPengguna";
import useHapusPemesanan from "@/hooks/Backend/usePembatalanPemesanan";
import { Toaster } from "react-hot-toast";

const DialogDetailPesanan = ({ isOpen, handleClose, pemesananData, transaksiData }) => {
    const { detailPengguna } = useTampilanPengguna();
    const { memuatHapus, errorHapus, hapusPemesanan } = useHapusPemesanan();

    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

    const handleConfirmDialogOpen = () => {
        setIsConfirmDialogOpen(true);
    };

    const handleConfirmDialogClose = () => {
        setIsConfirmDialogOpen(false);
    };

    const handlePembatalanPesanan = async () => {
        if (!pemesananData?.ID_Pemesanan || !pemesananData?.ID_Transaksi) {
            return;
        }

        try {
            await hapusPemesanan(pemesananData.ID_Pemesanan, pemesananData.ID_Transaksi);
            handleClose();
            setIsConfirmDialogOpen(false);
        } catch (error) {
            console.error("Gagal membatalkan pesanan:", error);
        }
    };

    return (
        <>
            {/* Main Dialog for Order Details */}
            <Dialog open={isOpen} size="xl" handler={handleClose}>
                <div className="flex justify-between items-center p-2">
                    <DialogHeader>Detail Pesanan {pemesananData?.ID_Pemesanan}</DialogHeader>
                    <button
                        onClick={() => handleClose(false)}
                        className="text-gray-600 hover:text-gray-900"
                    >
                        <FaTimes className="mr-3 w-6 h-6" size={18} />
                    </button>
                </div>
                <DialogBody className="mb-8 max-h-[600px] overflow-y-auto mx-5">
                    <div className="text-base justify-center text-center font-bold">
                        <Toaster position="top-right" reverseOrder={false} />
                    </div>
                    <h2 className="font-semibold text-lg mb-7 text-center">
                        Status Pengiriman
                    </h2>
                    {/* Order Status Timeline */}
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col items-center -mx-4">
                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white">
                                <LiaMoneyBillWaveSolid size={30} />
                            </div>
                            <span className="mt-2 text-center text-green-500">
                                Pembayaran Berhasil
                            </span>
                        </div>
                        <div className="flex-1 mb-8 -mx-6 h-2 rounded-md bg-green-500"></div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white">
                                <LuPackagePlus size={30} />
                            </div>
                            <span className="mt-2 text-center text-green-500">Pesanan Dibuat</span>
                        </div>
                        <div className="flex-1 mb-8 -mx-6 h-2 rounded-md bg-green-500"></div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white">
                                <LiaShippingFastSolid size={30} />
                            </div>
                            <span className="mt-2 text-center text-green-500">Pesanan Dikirim</span>
                        </div>
                        <div className="flex-1 mb-8 -mx-6 h-2 rounded-md bg-blue-gray-500 bg-opacity-55"></div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-blue-gray-500 bg-opacity-45 rounded-full flex items-center justify-center text-blue-gray-600">
                                <LuPackageCheck size={30} />
                            </div>
                            <span className="mt-2 text-center text-blue-gray-600">Pesanan Selesai</span>
                        </div>
                    </div>
                    {/* Order and User Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                        <div className="lg:col-span-1 bg-blue-gray-800 bg-opacity-15 shadow-lg p-6 rounded-lg">
                            <Typography variant="h4" className="font-semibold mb-4 text-black uppercase underline underline-offset-8">Detail Pesanan</Typography>
                            <ul className="space-y-4">
                                {pemesananData?.Data_Pesanan?.map((item, index) => (
                                    <li key={index} className="flex justify-between items-center text-sm text-gray-700">
                                        <div className="flex items-center space-x-2">
                                            <Image
                                                src={item.Gambar}
                                                alt={item.Nama}
                                                width={60}
                                                height={60}
                                                className="rounded-lg w-16 h-16 border border-green-500"
                                            />
                                            <div>
                                                <span className="w-3/4 text-black">{item.Nama}</span>
                                                <p className="text-gray-500 text-black">x{item.Kuantitas}</p>
                                            </div>
                                        </div>
                                        <span className="text-black">Rp{item.Harga.toLocaleString()}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="border-t mt-4 pt-4 space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-black">Subtotal</span>
                                    <span className="text-black">Rp{pemesananData?.Sub_Total?.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-black">Biaya Pengiriman</span>
                                    <span className="text-black">Rp{pemesananData?.Biaya_Pengiriman?.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between font-semibold text-lg">
                                    <span className="text-black">Total</span>
                                    <span className="text-black">Rp{pemesananData?.Total?.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="p-6 bg-green-700 bg-opacity-50 shadow-md rounded-lg space-y-8">
                                <div className="grid grid-cols-1 items-center justify-between">
                                    <Typography variant="h4" className="text-white font-bold uppercase underline underline-offset-8 ">Detail Pengguna</Typography>
                                    <ul className="mt-2 text-md text-black space-y-1">
                                        <li className="flex justify-between">
                                            <span className="font-semibold text-start w-1/2">Nama Pengguna</span>
                                            <span className="text-start w-2/3">: {detailPengguna.Nama_Lengkap || "Tidak tersedia"}</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="font-semibold text-start w-1/2">Email Pengguna</span>
                                            <span className="text-start w-2/3">: {detailPengguna.Email || "Tidak tersedia"}</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="font-semibold text-start w-1/2">Nomor Telepon Pengguna</span>
                                            <span className="text-start w-2/3">: {detailPengguna.No_Telepon || "Tidak tersedia"}</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="font-semibold text-start w-1/2">Alamat Pengguna</span>
                                            <span className="text-start w-2/3">: {detailPengguna.Alamat || "Tidak tersedia"}</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="grid grid-cols-1 items-center justify-between">
                                    <Typography variant="h4" className="text-white font-bold uppercase underline underline-offset-8 ">Detail Penerima</Typography>
                                    <ul className="mt-2 text-md text-black space-y-1">
                                        <li className="flex justify-between">
                                            <span className="font-semibold text-start w-1/2">Nama Pengguna</span>
                                            <span className="text-start w-2/3">: {pemesananData?.Data_Pengguna?.Nama_Lengkap_Penerima || "Tidak tersedia"}</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="font-semibold text-start w-1/2">Nomor Telepon Pengguna</span>
                                            <span className="text-start w-2/3">: {pemesananData?.Data_Pengguna?.No_Telepon_Penerima || "Tidak tersedia"}</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="font-semibold text-start w-1/2">Alamat Pengguna</span>
                                            <span className="text-start w-2/3">: {pemesananData?.Data_Pengguna?.Alamat || "Tidak tersedia"}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full text-end space-x-5 mt-8">
                        <Button
                            className="border-2 border-red-800 text-red-800 hover:bg-red-800 hover:text-white"
                            onClick={handleConfirmDialogOpen}
                            disabled={memuatHapus}
                        >
                            {memuatHapus ? "Memproses..." : "Pembatalan Pesanan"}
                        </Button>
                        <Button color="green" disabled>Selesai Pesanan</Button>
                    </div>
                </DialogBody>
            </Dialog>

            <Dialog open={isConfirmDialogOpen} size="xs" handler={handleConfirmDialogClose}>
                <DialogHeader>Konfirmasi Pembatalan</DialogHeader>
                <DialogBody>
                    <Typography className="text-center text-sm">
                        Apakah Anda yakin ingin membatalkan pesanan dengan ID {pemesananData?.ID_Pemesanan}?
                    </Typography>
                    <div className="mt-4 text-center space-x-4">
                        <Button className="border border-red-700 text-red-400 hover:bg-red-800 hover:text-white" onClick={handleConfirmDialogClose}>
                            Batal
                        </Button>
                        <Button className="border border-primary text-primary hover:bg-secondary hover:text-white" onClick={handlePembatalanPesanan}>
                            Ya, Batalkan
                        </Button>
                    </div>
                </DialogBody>
            </Dialog>
        </>
    );
};

export default DialogDetailPesanan;
