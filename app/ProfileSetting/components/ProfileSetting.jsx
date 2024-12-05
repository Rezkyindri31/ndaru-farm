"use client";
import React, { useState, useEffect, useRef } from "react";
import {
    Card,
    CardBody,
    Typography,
    Textarea,
    Button,
    Input,
} from "@/app/MTailwind";
import { Open_Sans } from "next/font/google";
import { FaPen, FaTrashAlt, FaUser, FaBuilding } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';
import useTampilanPengguna from '@/hooks/Frontend/useTampilanPengguna';

const openSans = Open_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

function ProfileSet() {
    const { apakahSudahLogin, userID, detailPengguna } = useTampilanPengguna();

    if (!apakahSudahLogin) {
        return <p>Silakan login terlebih dahulu.</p>;
    }
    return (
        <div className="h-full m-16 relative">
            <div className="text-base justify-center text-center font-bold" >
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div>
            <Card className="shadow-2xl border-blue-gray-500 h-full">
                <CardBody>
                    <div className="flex justify-start items-center m-5">
                        <Typography variant="h4" color="blue-gray" className={`mb-2 font-bold ${openSans.className}`}>
                            Informasi Profile
                        </Typography>
                    </div>
                    <div className="items-center flex space-x-3 w-full">
                        <div className="p-5 w-full">
                            <Typography variant="h6" color="blue-gray" className={`mb-2 font-bold ${openSans.className}`}>
                                Nama Lengkap
                            </Typography>
                            <Input type="text" placeholder="Nama Anda" className="bg-blue-gray-800 bg-opacity-10 text-blue-gray-700 w-full" value={detailPengguna.Nama_Lengkap} />
                        </div>
                        <div className="p-5 w-full">
                            <Typography variant="h6" color="blue-gray" className={`mb-2 font-bold ${openSans.className}`}>
                                Email
                            </Typography>
                            <Input type="email" placeholder="Email Anda" className="bg-blue-gray-800 bg-opacity-10 border-blue-gray-300 text-blue-gray-700 w-full" value={detailPengguna.Email} />
                        </div>
                        <div className="p-5 w-full">
                            <Typography variant="h6" color="blue-gray" className={`mb-2 font-bold ${openSans.className}`}>
                                Nomor Telepon
                            </Typography>
                            <Input type="number" placeholder="Nomor Telepon Anda" className="bg-blue-gray-800 bg-opacity-10 border-blue-gray-300 text-blue-gray-700 w-full" value={detailPengguna.No_Telepon} />
                        </div>
                    </div>
                    <div className="items-center flex space-x-3 w-full">
                        <div className="p-5 w-full">
                            <Typography variant="h6" color="blue-gray" className={`mb-2 font-bold ${openSans.className}`}>
                                Tanggal Lahir
                            </Typography>
                            <Input type="date" placeholder="Tanggal Lahir Anda" className="bg-blue-gray-800 bg-opacity-10 border-blue-gray-300 text-blue-gray-700 w-full" value={detailPengguna.Tanggal_Lahir} />
                        </div>
                        <div className="p-5 w-full">
                            <Typography variant="h6" color="blue-gray" className={`mb-2 font-bold ${openSans.className}`}>
                                Alamat
                            </Typography>
                            <Input type="text" placeholder="Alamat Anda" className="bg-blue-gray-800 bg-opacity-10 border-blue-gray-300 text-blue-gray-700 w-full" value={detailPengguna.Alamat} />
                        </div>
                        <div className="p-5 w-full">
                            <Typography variant="h6" color="blue-gray" className={`mb-2 font-bold ${openSans.className}`}>
                                Jenis Kelamin
                            </Typography>
                            <select className="bg-blue-gray-800 bg-opacity-10 w-full p-3 rounded-lg border border-blue-gray-300 text-blue-gray-700" value={detailPengguna.Jenis_Kelamin || ''}>
                                <option value="">Pilih Jenis Kelamin</option>
                                <option value="laki-laki">Laki-Laki</option>
                                <option value="perempuan">Perempuan</option>
                            </select>
                        </div>
                    </div>
                    <div className="items-center justify-between flex w-full">
                        <div className="p-5 w-[500px]">
                            <Typography variant="h6" color="blue-gray" className={`mb-2 font-bold ${openSans.className}`}>
                                NIK
                            </Typography>
                            <Input type="number" placeholder="NIK Anda" className="bg-blue-gray-800 bg-opacity-10 border-blue-gray-300 text-blue-gray-700 w-full" value={detailPengguna.NIK} />
                        </div>
                        <div className="w-80 mt-9 mx-6">
                            <Button className={`bg-green-600 bg-opacity-85 border-blue-gray-300 text-white w-full hover:bg-blue-gray-700 hover:scale-105 transition duration-300 ease-in-out ${openSans.className}`} type="button">
                                Simpan
                            </Button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div >
    );
}

export default ProfileSet;
