import React, { useState, useCallback } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { formatNoIdentitas } from "@/utils/utilsNoIdentitas";
import { formatHuruf } from "@/utils/utilsHanyaHuruf";
import { formatNoTelepon } from "@/utils/utilsNoTelepon";

function useFormBiodataPengguna() {
    const [formData, setFormData] = useState({
        NIK: "",
        Nama_Lengkap: "",
        No_Telepon: "",
        Jenis_Kelamin: "",
        Tanggal_Lahir: "",
        Alamat: "",
        Nama_Lengkap_Penerima: "",
        No_Telepon_Penerima: "",
        Alamat_Penerima: "",
    });

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        if (name === "NIK") {
            formattedValue = formatNoIdentitas(value);
        } else if (["Nama_Lengkap", "Nama_Lengkap_Penerima"].includes(name)) {
            formattedValue = formatHuruf(value);
        } else if (["No_Telepon", "No_Telepon_Penerima"].includes(name)) {
            formattedValue = formatNoTelepon(value);
        }

        setFormData((prev) => ({
            ...prev,
            [name]: formattedValue,
        }));
    }, []);

    return { formData, handleInputChange, setFormData };
}

function Stepper({ activeStep, steps }) {
    return (
        <div className="flex items-center mb-6">
            {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                    <div
                        className={`rounded-full w-8 h-8 flex items-center justify-center text-white font-bold ${activeStep >= index
                            ? "bg-blue-500"
                            : "bg-gray-300"
                            }`}
                    >
                        {index + 1}
                    </div>
                    {index < steps.length - 1 && <div className="w-8 h-[2px] bg-gray-300 mx-2" />}
                </div>
            ))}
        </div>
    );
}

export default function FormBiodataPengguna() {
    const router = useRouter();
    const { formData, handleInputChange, setFormData } = useFormBiodataPengguna();
    const [activeStep, setActiveStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const steps = ["Data Diri", "Data Penerima"];

    const handleNextStep = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep((prev) => prev + 1);
        } else {
            handleSubmit();
        }
    };

    const handlePreviousStep = () => {
        if (activeStep > 0) {
            setActiveStep((prev) => prev - 1);
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);

        try {
            if (!formData.NIK || formData.NIK.length !== 16) {
                throw new Error("NIK harus terdiri dari 16 digit angka.");
            }
            console.log("Mengirim data:", formData);
            toast.success("Data berhasil disimpan!");
            router.push("/Beranda");
        } catch (error) {
            toast.error(error.message || "Terjadi kesalahan saat menyimpan data.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded shadow-md">
            <Stepper activeStep={activeStep} steps={steps} />

            {activeStep === 0 && (
                <div>
                    <h2 className="text-xl font-bold mb-4">Data Diri</h2>
                    <div className="mb-4">
                        <label className="block mb-1">NIK</label>
                        <input
                            type="text"
                            name="NIK"
                            value={formData.NIK}
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Nama Lengkap</label>
                        <input
                            type="text"
                            name="Nama_Lengkap"
                            value={formData.Nama_Lengkap}
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">No. Telepon</label>
                        <input
                            type="text"
                            name="No_Telepon"
                            value={formData.No_Telepon}
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded"
                            required
                        />
                    </div>
                </div>
            )}

            {activeStep === 1 && (
                <div>
                    <h2 className="text-xl font-bold mb-4">Data Penerima</h2>
                    <div className="mb-4">
                        <label className="block mb-1">Nama Lengkap Penerima</label>
                        <input
                            type="text"
                            name="Nama_Lengkap_Penerima"
                            value={formData.Nama_Lengkap_Penerima}
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">No. Telepon Penerima</label>
                        <input
                            type="text"
                            name="No_Telepon_Penerima"
                            value={formData.No_Telepon_Penerima}
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded"
                            required
                        />
                    </div>
                </div>
            )}

            <div className="flex justify-between mt-6">
                <button
                    type="button"
                    className="bg-gray-300 px-4 py-2 rounded"
                    onClick={handlePreviousStep}
                    disabled={activeStep === 0 || isLoading}
                >
                    Sebelumnya
                </button>
                <button
                    type="button"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={handleNextStep}
                    disabled={isLoading}
                >
                    {activeStep === steps.length - 1 ? "Simpan" : "Selanjutnya"}
                </button>
            </div>
        </div>
    );
}
