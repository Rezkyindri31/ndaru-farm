import React, { useState } from 'react';
import { Stepper, Step, Textarea, Typography, Input, Button, Spinner, Radio } from '@/app/MTailwind';
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { FaUser, FaBuilding } from "react-icons/fa";
import useStepperForm from "@/hooks/Frontend/useStepperForm";
import useSubmitBiodata from "@/hooks/Backend/useFormBiodata";
import { formatNoIdentitas } from "@/utils/utilsNoIdentitas";
import { formatHuruf } from "@/utils/utilsHanyaHuruf";
import { formatNoTelepon } from '@/utils/utilsNoTelepon';
import { formatEmail } from '@/utils/utilsEmail';

function FormBiodataPengguna() {
    const pengarah = useRouter();
    const { stepAktif, handleSelanjutnya, handleSebelumnya } = useStepperForm();
    const { submitBiodata, isLoading } = useSubmitBiodata();
    const [penggunaID, setPenggunaID] = useState(() => localStorage.getItem("ID"));
    const [formDataPengguna, setFormDataPengguna] = useState({
        NIK: "",
        Nama_Lengkap: "",
        No_Telepon: "",
        Jenis_Kelamin: "",
        Email: "",
        Tanggal_Lahir: "",
        Alamat: "",
        Nama_Lengkap_Penerima: "",
        No_Telepon_Penerima: "",
        Alamat_Penerima: "",
    });
    const handleSubmitBiodata = async (e) => {
        e.preventDefault();
        const requiredFields = [
            "NIK",
            "Nama_Lengkap",
            "No_Telepon",
            "Jenis_Kelamin",
            "Email",
            "Tanggal_Lahir",
            "Alamat",
            "Nama_Lengkap_Penerima",
            "No_Telepon_Penerima",
            "Alamat_Penerima"
        ];

        for (const field of requiredFields) {
            if (!formDataPengguna[field]) {
                toast.error(`Harap isi seluruh form. Kolom ${field.replace("_", " ")} belum diisi.`);
                return;
            }
        }

        if (!penggunaID) {
            toast.error("User ID tidak ditemukan.");
            return;
        }

        await submitBiodata(penggunaID, formDataPengguna);
        pengarah.push("/Beranda");
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "NIK") {
            const formattedInput = formatNoIdentitas(value);
            setFormDataPengguna((prev) => ({
                ...prev,
                [name]: formattedInput,
            }));
            return;
        }
        if (name === "Email") {
            const formattedInput = formatEmail(value);
            setFormDataPengguna((prev) => ({
                ...prev,
                [name]: formattedInput,
            }));
            return;
        }
        if (["Nama_Lengkap_Penerima", "Nama_Lengkap"].includes(name)) {
            const formattedInput = formatHuruf(value);
            setFormDataPengguna((prev) => ({
                ...prev,
                [name]: formattedInput,
            }));
            return;
        }
        if (["No_Telepon_Penerima", "No_Telepon"].includes(name)) {
            const formattedInput = formatNoTelepon(value);
            setFormDataPengguna((prev) => ({
                ...prev,
                [name]: formattedInput,
            }));
            return;
        }
        setFormDataPengguna((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    return (
        <form onSubmit={handleSubmitBiodata}>
            <div className="w-full px-24 py-4 ">
                <Stepper
                    activeStep={stepAktif}
                    className="shadow-lg drop-shadow-2xl bg-secondary rounded-2xl h-16 justify-center gap-20"
                >
                    <Step onClick={() => handleSebelumnya()} disabled={stepAktif === 0}>
                        <FaUser className="h-10 w-10" />
                    </Step>
                    <Step onClick={() => handleSelanjutnya()} disabled={stepAktif === 1}>
                        <FaBuilding className="h-10 w-10" />
                    </Step>
                </Stepper>

                {stepAktif === 0 && (
                    <div className="page-informasipribadi space-y-6">
                        <div className="grid gap-6 lg:grid-cols-1 my-2 mt-12 ">
                            <Typography variant='h2' className="text-center text-xl text-black font-semibold uppercase shadow-lg border-b-4 border-secondary p-1.5 rounded-lg ">Informasi Pribadi</Typography>
                            <div>
                                <Input
                                    type="number"
                                    placeholder="NIK"
                                    name="NIK"
                                    className="!border-2 !border-secondary bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                    labelProps={{
                                        className: "hidden",
                                    }}
                                    containerProps={{ className: "min-w-[100px]" }}
                                    value={formDataPengguna.NIK}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <Input
                                    type="text"
                                    placeholder="Nama Lengkap"
                                    name="Nama_Lengkap"
                                    className="!border-2 !border-secondary bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                    labelProps={{ className: "hidden" }}
                                    containerProps={{ className: "min-w-[100px]" }}
                                    value={formDataPengguna.Nama_Lengkap}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="flex items-center gap-10 text-xs !border-2 !border-secondary bg-white rounded-lg text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10">
                                <h1 className="whitespace-nowrap text-sm text-blue-gray-400 ps-3">Jenis Kelamin</h1>
                                <Radio
                                    name="Jenis_Kelamin"
                                    label="Laki-laki"
                                    value="Laki-laki"
                                    onChange={handleInputChange}
                                />
                                <Radio
                                    name="Jenis_Kelamin"
                                    label="Perempuan"
                                    value="Perempuan"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <Input
                                    type="number"
                                    placeholder="Nomor Telepon Pengguna"
                                    name="No_Telepon"
                                    className="!border-2 !border-secondary bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                    labelProps={{
                                        className: "hidden",
                                    }}
                                    containerProps={{ className: "min-w-[100px]" }}
                                    value={formDataPengguna.No_Telepon}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <Input
                                    type="email"
                                    placeholder="Email Pengguna"
                                    name="Email"
                                    className="!border-2 !border-secondary bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                    labelProps={{
                                        className: "hidden",
                                    }}
                                    containerProps={{ className: "min-w-[100px]" }}
                                    value={formDataPengguna.Email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-blue-gray-400 text-sm">
                                    Tanggal Lahir Pengguna
                                </label>
                                <Input
                                    type="date"
                                    placeholder="Tanggal Lahir Pengguna"
                                    name="Tanggal_Lahir"
                                    className="!border-2 !border-secondary bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                    labelProps={{
                                        className: "hidden",
                                    }}
                                    containerProps={{ className: "min-w-[100px]" }}
                                    onChange={handleInputChange}
                                    value={formDataPengguna.Tanggal_Lahir}
                                    required
                                />
                            </div>
                            <div>
                                <Textarea
                                    type="text"
                                    placeholder="Alamat Tagihan"
                                    name="Alamat"
                                    className="!border-2 !border-secondary bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                    labelProps={{
                                        className: "hidden",
                                    }}
                                    containerProps={{ className: "min-w-[100px] h-[150px]" }}
                                    onChange={handleInputChange}
                                    value={formDataPengguna.Alamat}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                )}
                {stepAktif === 1 && (
                    <div className="page-informasipribadi space-y-6">
                        <div className="page-penerima space-y-6">
                            <div className="grid gap-6 lg:grid-cols-1 my-2 mt-12 ">
                                <Typography variant='h2' className="text-center text-xl text-black font-semibold uppercase shadow-lg border-b-4 border-secondary p-1.5 rounded-lg ">Informasi Pengiriman</Typography>
                                <div>
                                    <Input
                                        type="text"
                                        placeholder="Nama Lengkap Penerima"
                                        name='Nama_Lengkap_Penerima'
                                        className="!border-2 !border-secondary bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                        labelProps={{ className: "hidden" }}
                                        containerProps={{ className: "min-w-[100px]" }}
                                        value={formDataPengguna.Nama_Lengkap_Penerima}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <Input
                                        type="tel"
                                        placeholder="Nomor Telepon Penerima"
                                        name="No_Telepon_Penerima"
                                        className="!border-2 !border-secondary bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                        labelProps={{
                                            className: "hidden",
                                        }}
                                        containerProps={{ className: "min-w-[100px]" }}
                                        value={formDataPengguna.No_Telepon_Penerima}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <Textarea
                                        type="text"
                                        placeholder="Alamat Penerima"
                                        name="Alamat_Penerima"
                                        className="!border-2 !border-secondary bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                        labelProps={{
                                            className: "hidden",
                                        }}
                                        containerProps={{ className: "min-w-[100px] h-[150px]" }}
                                        value={formDataPengguna.Alamat_Penerima}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="mt-10 flex justify-between">
                    {stepAktif > 0 && (
                        <Button
                            onClick={handleSebelumnya}
                            className="bg-black text-white"
                        >
                            Sebelumnya
                        </Button>
                    )}
                    {stepAktif < 1 && (
                        <Button
                            onClick={handleSelanjutnya}
                            className="bg-black text-white"
                        >
                            Selanjutnya
                        </Button>
                    )}
                    {stepAktif === 1 && (
                        <Button
                            type="submit"
                            className="bg-blue-600 text-white"
                            disabled={isLoading}
                        >
                            {isLoading ? "Sedang menyimpan..." : "Simpan Data"}
                        </Button>
                    )}
                </div>
            </div>
        </form >
    )
};
export default FormBiodataPengguna;