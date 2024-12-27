import React, { useState, useEffect } from "react";
import { Card, CardBody, Typography, Button, Input } from "@/app/MTailwind";
import { Open_Sans } from "next/font/google";
import { FaUserEdit } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import useTampilanPengguna from "@/hooks/Frontend/useTampilanPengguna";
import useProfileEdit from "@/hooks/Backend/useEditProfile";

const openSans = Open_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

function PengaturanProfile() {
    const { detailPengguna } = useTampilanPengguna();
    const {
        isEditable,
        profileData,
        handleChange,
        handleEditClick,
        handleSave,
        handleCancel,
    } = useProfileEdit(detailPengguna);

    return (
        <div className="h-full m-16 relative">
            <div className="text-base justify-center text-center font-bold">
                <Toaster position="top-right" reverseOrder={false} />
            </div>
            <Card className="shadow-2xl border-blue-gray-500 h-full">
                <CardBody>
                    <div className="flex justify-between items-center m-5">
                        <Typography
                            variant="h4"
                            color="blue-gray"
                            className={`mb-2 font-bold ${openSans.className}`}
                        >
                            Informasi Profile
                        </Typography>
                        <div onClick={handleEditClick} className="flex items-center space-x-2 border-2 border-lightgray bg-blue-gray-600 bg-opacity-25 p-2 rounded-lg w-18 h-10 cursor-pointer">
                            <FaUserEdit />
                            <Typography className="font-bold uppercase tracking-wid">Edit</Typography>
                        </div>
                    </div>
                    <form>
                        <div className="items-center flex space-x-3 w-full">
                            <div className="p-5 w-full">
                                <Typography variant="h6" color="blue-gray" className={`mb-2 font-bold ${openSans.className}`}>
                                    Nama Lengkap
                                </Typography>
                                <Input
                                    type="text"
                                    name="Nama_Lengkap"
                                    placeholder="Nama Anda"
                                    className="bg-blue-gray-800 bg-opacity-10 text-blue-gray-700 w-full"
                                    value={profileData.Nama_Lengkap}
                                    onChange={handleChange}
                                    readOnly={!isEditable}
                                />
                            </div>
                            <div className="p-5 w-full">
                                <Typography variant="h6" color="blue-gray" className={`mb-2 font-bold ${openSans.className}`}>
                                    Email
                                </Typography>
                                <Input
                                    type="email"
                                    name="Email"
                                    placeholder="Email Anda"
                                    className="bg-blue-gray-800 bg-opacity-10 border-blue-gray-300 text-blue-gray-700 w-full"
                                    value={profileData.Email}
                                    onChange={handleChange}
                                    readOnly
                                />
                            </div>
                            <div className="p-5 w-full">
                                <Typography variant="h6" color="blue-gray" className={`mb-2 font-bold ${openSans.className}`}>
                                    Nomor Telepon
                                </Typography>
                                <Input
                                    type="number"
                                    name="No_Telepon"
                                    placeholder="Nomor Telepon Anda"
                                    className="bg-blue-gray-800 bg-opacity-10 border-blue-gray-300 text-blue-gray-700 w-full"
                                    value={profileData.No_Telepon}
                                    onChange={handleChange}
                                    readOnly={!isEditable}
                                />
                            </div>
                        </div>
                        <div className="items-center flex space-x-3 w-full">
                            <div className="p-5 w-full">
                                <Typography
                                    variant="h6"
                                    color="blue-gray"
                                    className={`mb-2 font-bold ${openSans.className}`}
                                >
                                    Tanggal Lahir
                                </Typography>
                                <Input
                                    type="date"
                                    name="Tanggal_Lahir"
                                    placeholder="Tanggal Lahir Anda"
                                    className="bg-blue-gray-800 bg-opacity-10 border-blue-gray-300 text-blue-gray-700 w-full"
                                    value={profileData.Tanggal_Lahir}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="p-5 w-full">
                                <Typography
                                    variant="h6"
                                    color="blue-gray"
                                    className={`mb-2 font-bold ${openSans.className}`}
                                >
                                    Alamat
                                </Typography>
                                <Input
                                    type="text"
                                    name="Alamat"
                                    placeholder="Alamat Anda"
                                    className="bg-blue-gray-800 bg-opacity-10 border-blue-gray-300 text-blue-gray-700 w-full"
                                    value={profileData.Alamat}
                                    onChange={handleChange}
                                    readOnly={!isEditable}
                                />
                            </div>
                            <div className="p-5 w-full">
                                <Typography
                                    variant="h6"
                                    color="blue-gray"
                                    className={`mb-2 font-bold ${openSans.className}`}
                                >
                                    Jenis Kelamin
                                </Typography>
                                <select
                                    name="Jenis_Kelamin"
                                    className="bg-blue-gray-800 bg-opacity-10 w-full p-3 rounded-lg border border-blue-gray-300 text-blue-gray-700"
                                    value={profileData.Jenis_Kelamin || ''}
                                    onChange={handleChange}
                                    disabled={!isEditable}
                                >
                                    <option value="">Pilih Jenis Kelamin</option>
                                    <option value="Laki-laki">Laki-Laki</option>
                                    <option value="Perempuan">Perempuan</option>
                                </select>
                            </div>
                        </div>
                        <div className="items-center flex space-x-3 w-full">
                            <div className="p-5 w-full">
                                <Typography
                                    variant="h6"
                                    color="blue-gray"
                                    className={`mb-2 font-bold ${openSans.className}`}
                                >
                                    Nama Lengkap Penerima
                                </Typography>
                                <Input
                                    type="text"
                                    name="Nama_Lengkap_Penerima"
                                    placeholder="Nama Lengkap Penerima Anda"
                                    className="bg-blue-gray-800 bg-opacity-10 border-blue-gray-300 text-blue-gray-700 w-full"
                                    value={profileData.Nama_Lengkap_Penerima}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="p-5 w-full">
                                <Typography variant="h6" color="blue-gray" className={`mb-2 font-bold ${openSans.className}`}>
                                    Nomor Telepon Penerima
                                </Typography>
                                <Input
                                    type="number"
                                    name="No_Telepon_Penerima"
                                    placeholder="Nomor Telepon Anda"
                                    className="bg-blue-gray-800 bg-opacity-10 border-blue-gray-300 text-blue-gray-700 w-full"
                                    value={profileData.No_Telepon_Penerima}
                                    onChange={handleChange}
                                    readOnly={!isEditable}
                                />
                            </div>
                            <div className="p-5 w-full">
                                <Typography
                                    variant="h6"
                                    color="blue-gray"
                                    className={`mb-2 font-bold ${openSans.className}`}
                                >
                                    Alamat Penerima
                                </Typography>
                                <Input
                                    type="text"
                                    name="Alamat_Penerima"
                                    placeholder="AlamatPenerima Anda"
                                    className="bg-blue-gray-800 bg-opacity-10 border-blue-gray-300 text-blue-gray-700 w-full"
                                    value={profileData.Alamat_Penerima}
                                    onChange={handleChange}
                                    readOnly={!isEditable}
                                />
                            </div>
                        </div>
                        <div className="items-center justify-between flex w-full">
                            {isEditable && (
                                <div className="w-full mt-9 mx-6 flex space-x-4">
                                    <Button
                                        className="bg-green-700 bg-opacity-85 border-blue-gray-300 text-white w-full hover:bg-blue-gray-700 hover:scale-105 transition duration-300 ease-in-out"
                                        type="button"
                                        onClick={handleSave}
                                    >
                                        Simpan Perubahan
                                    </Button>
                                    <Button
                                        className="bg-red-700 bg-opacity-85 border-blue-gray-300 text-white w-full hover:bg-blue-gray-700 hover:scale-105 transition duration-300 ease-in-out"
                                        type="button"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            )}
                        </div>
                    </form>
                </CardBody>
            </Card>
        </div >
    );
}

export default PengaturanProfile;
