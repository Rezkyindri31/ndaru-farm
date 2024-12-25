import React from "react";
import { FaMapMarkedAlt, FaClock, FaAddressBook } from "react-icons/fa";
import "@/app/globals.css";
import { Card, Input, Textarea, Button } from "@material-tailwind/react";

function Kontak() {
    return (
        <div className="mx-10 lg:py-10 z-10 relative flex flex-col lg:flex-row lg:space-x-10 justify-center items-start">
            <div className="flex-1 space-y-10 border-2 border-secondary bg-gray rounded-xl px-7 py-12">
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

            <div className="flex-1 mt-10 lg:mt-0 border-2 border-secondary rounded-xl">
                <Card className="py-12 px-10">
                    <h2 className="text-2xl font-bold text-center text-darkgray mb-6">Kirim Masukan</h2>
                    <form className="space-y-4">
                        <Input
                            type="text"
                            label="Nama"
                            size="lg"
                            className="bg-green-700"
                        />
                        <Input
                            type="email"
                            label="Email"
                            size="lg"
                            className="bg-green-700"
                        />
                        <Textarea
                            label="Pesan"
                            size="lg"
                            className="bg-green-700"
                        />
                        <div className="text-center w-full">
                            <Button
                                color="green"
                                className="bg-secondary border-2 font-bold text-md py-2 px-32 hover:bg-transparent hover:border-2 hover:border-secondary hover:text-secondary"
                                ripple={true}
                            >
                                Kirim
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
}

export default Kontak;
