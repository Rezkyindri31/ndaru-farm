import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { formatNoIdentitas } from "@/utils/utilsNoIdentitas";
import { formatHuruf } from "@/utils/utilsHanyaHuruf";
import { formatNoTelepon } from "@/utils/utilsNoTelepon";
import { Radio } from "@material-tailwind/react";
import useSubmitBiodata from "@/hooks/Backend/useFormBiodata";

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
                <div key={index} className="flex items-center mx-auto mb-5">
                    <div
                        className={`rounded-full w-8 h-8 flex items-center justify-center text-black font-bold border border-white ${activeStep >= index
                            ? "bg-white"
                            : "bg-blue-gray-300"
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
    const { submitBiodata } = useSubmitBiodata();
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
        const penggunaID = localStorage.getItem("ID");
        if (!penggunaID) {
            toast.error("Pengguna ID tidak ditemukan. Silakan login terlebih dahulu.");
            return;
        }
        try {
            await submitBiodata(penggunaID, formData);
            router.push("/Beranda");
        } catch (error) {
            toast.error("Gagal menyimpan biodata. Silakan coba lagi.");
        }
    };

    return (
        <div className="max-w-xl mx-auto p-5 mt-2 bg-light-green-600 rounded-xl shadow-lg">
            <Stepper activeStep={activeStep} steps={steps} />
            {activeStep === 0 && (
                <div className="bg-white p-3 rounded-xl bg-opacity-20">
                    <h2 className="text-xl text-black font-bold mb-3">Data Diri</h2>
                    <div className="mb-4">
                        <label className="block mb-1 text-black">NIK</label>
                        <input
                            type="text"
                            name="NIK"
                            value={formData.NIK}
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded-lg bg-opacity-85 bg-white"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 text-black">Nama Lengkap</label>
                        <input
                            type="text"
                            name="Nama_Lengkap"
                            value={formData.Nama_Lengkap}
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded-lg bg-opacity-85 bg-white"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 text-black">Jenis Kelamin</label>
                        <Radio
                            name="Jenis_Kelamin"
                            label="Laki-laki"
                            value="Laki-laki"
                            onChange={handleInputChange}
                            style={{
                                appearance: "none",
                                WebkitAppearance: "none",
                                width: "20px",
                                height: "20px",
                                border: "2px solid #ccc",
                                borderRadius: "50%",
                                backgroundColor: "white",
                                cursor: "pointer",
                            }}
                        />
                        <Radio
                            name="Jenis_Kelamin"
                            label="Perempuan"
                            value="Perempuan"
                            onChange={handleInputChange}
                            style={{
                                appearance: "none",
                                WebkitAppearance: "none",
                                width: "20px",
                                height: "20px",
                                border: "2px solid #ccc",
                                borderRadius: "50%",
                                backgroundColor: "white",
                                cursor: "pointer",
                            }}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 text-black">Tanggal Lahir</label>
                        <input
                            type="date"
                            name="Tanggal_Lahir"
                            value={formData.Tanggal_Lahir}
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded-lg bg-opacity-85 bg-white"
                            required
                        />
                    </div>
                    <div className="mb-4 ">
                        <label className="block mb-1 text-black">No. Telepon</label>
                        <input
                            type="text"
                            name="No_Telepon"
                            value={formData.No_Telepon}
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded-lg bg-opacity-85 bg-white"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 text-black">Alamat Lengkap</label>
                        <textarea
                            type="text"
                            name="Alamat"
                            value={formData.Alamat}
                            onChange={handleInputChange}
                            className="w-full border h-32 p-2 rounded-lg bg-opacity-85 bg-white"
                            required
                        />
                    </div>
                </div>
            )}

            {activeStep === 1 && (
                <div>
                    <h2 className="text-xl font-bold mb-4 text-white">Data Penerima</h2>
                    <div className="mb-4">
                        <label className="block mb-1 text-white">Nama Lengkap Penerima</label>
                        <input
                            type="text"
                            name="Nama_Lengkap_Penerima"
                            value={formData.Nama_Lengkap_Penerima}
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded-lg bg-opacity-85 bg-white"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 text-white">Alamat Lengkap Penerima</label>
                        <textarea
                            type="text"
                            name="Alamat_Penerima"
                            value={formData.Alamat_Penerima}
                            onChange={handleInputChange}
                            className="w-full border h-32 p-2 rounded-lg bg-opacity-85 bg-white"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 text-white">No. Telepon Penerima</label>
                        <input
                            type="text"
                            name="No_Telepon_Penerima"
                            value={formData.No_Telepon_Penerima}
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded-lg bg-opacity-85 bg-white"
                            required
                        />
                    </div>
                </div>
            )}
            <div className="flex justify-between mt-6">
                <button
                    type="button"
                    className="bg-gray-300 px-4 py-2 rounded-lg bg-opacity-85 bg-white hover:bg-blue-gray-800 hover:bg-opacity-50 hover:text-white"
                    onClick={handlePreviousStep}
                    disabled={activeStep === 0 || isLoading}
                >
                    Sebelumnya
                </button>
                <button
                    type="button"
                    className="bg-yellow-600 text-black px-4 py-2 rounded-lg hover:bg-blue-gray-800 hover:bg-opacity-50 hover:text-white"
                    onClick={handleNextStep}
                    disabled={isLoading}
                >
                    {activeStep === steps.length - 1 ? "Simpan" : "Selanjutnya"}
                </button>
            </div>
        </div>
    );
}
