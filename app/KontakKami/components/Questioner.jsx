import React, { useState } from 'react';
import { Button, Textarea } from '@/app/MTailwind';
import { FaLocationArrow, FaMapMarkedAlt, FaClock, FaAddressBook } from "react-icons/fa";
import ValidationInput from '@/components/Validation';
import "@/app/globals.css";

function Question() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    return (
        <div className="mt-10 py-20 lg:py-10 z-10 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-10 lg:items-center lg:justify-end lg:gap-2">
                <div className="flex flex-col items-center justify-center w-auto h-full mx-auto text-center leading-relaxed overflow-auto">
                    <div className="p-6">
                        <h1 className="text-left text-4xl font-semibold mb-4">Apakah Anda punya pertanyaan?</h1>
                        <p className="mb-6">Apabila terdapat saran dan kritikan terhadap website ini maka anda diharapkan masukan data dibawah ini.</p>
                        <form className="space-y-6">
                            <div className="grid gap-6 lg:grid-cols-2 my-2">
                                <div>
                                    <ValidationInput
                                        type="text"
                                        value={name}
                                        onChange={setName}
                                        placeholder="Nama"
                                    />
                                </div>
                                <div>
                                    <ValidationInput
                                        type="email"
                                        value={email}
                                        onChange={setEmail}
                                        placeholder="Email"
                                    />
                                </div>
                            </div>
                            <div className="grid gap-6 lg:grid-cols-2">
                                <div>
                                    <ValidationInput
                                        type="tel"
                                        value={phone}
                                        onChange={setPhone}
                                        placeholder="Nomor Telepon (+62)"
                                    />
                                </div>
                                <div>
                                    <ValidationInput
                                        type="text"
                                        value={subject}
                                        onChange={setSubject}
                                        placeholder="Subjek"
                                    />
                                </div>
                            </div>
                            <div>
                                <Textarea
                                    type="text"
                                    placeholder="Pesan"
                                    className="!border-2 !border-secondary bg-blue-gray-100 text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    containerProps={{ className: "min-w-[100px] h-[150px]" }}
                                />
                            </div>
                            <div>
                                <Button className="button-effect space-x-2">
                                    <FaLocationArrow size={20} />
                                    <span>Kirim</span>
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="flex justify-center items-center px-32 mx-auto lg:mr-auto">
                    <div className="text-center lg:text-left lg:space-y-4 mx-6 lg:mx-12">
                        <div className="space-y-10 border-2 border-secondary bg-gray rounded-xl px-7 py-12">
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Question;
