"use client";
import React, { useState } from 'react';
import {
    Card, Typography, Button, Accordion,
    AccordionHeader,
    AccordionBody, Input, Textarea, Radio
} from '@/app/MTailwind';
import ValidationInput from '@/components/Validation';
import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import "@/app/globals.css";

function Icon({ id, open }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={5}
            stroke="#738e5b"
            className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
    );
}


function KonfirmasiPemesanan() {
    const pengarah = useRouter();
    const [open, setOpen] = React.useState(0);
    const handleOpen = (value) => setOpen(open === value ? 0 : value);
    const [open1, setOpen1] = React.useState(1);
    const handleOpen1 = (value) => setOpen1(open === value ? 1 : value);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const HeaderCount = ["Total", "Harga"];
    const CountTotal = [
        {
            desc: "Subtotal",
            harga: "Rp 15.000",
        },
        {
            desc: "Biaya Pengiriman",
            harga: "Rp 10.000",

        },
        {
            desc: "Total",
            harga: "Rp 12.000",
        },
    ];
    return (
        <div className="mt-10 py-20 lg:py-10 z-10 relative">
            <form action="post">
                <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-10 lg:items-center lg:justify-end lg:gap-2 ">
                    <div className="flex flex-col items-start justify-start px-2 ml-10 mr-0 w-auto h-full space-y-6 text-center leading-relaxe">
                        <Accordion open={open === 1} icon={<Icon id={1} open={open} />} >
                            <AccordionHeader
                                onClick={() => handleOpen(1)}
                                className='bg-gray px-2 border-2 border-gray rounded-lg text-start'>
                                <div className="flex items-center">
                                    <FaCheckCircle className="text-secondary mx-4" />
                                    <span>Alamat Tagihan</span>
                                </div>
                            </AccordionHeader>
                            <AccordionBody
                                className={`px-5 border-2 border-gray rounded-s-lg rounded-e-lg 
                            ${open === 1 ? 'accordion-enter-active' : 'accordion-exit'}`}
                            >
                                <div className="space-y-6">
                                    <div className="grid gap-6 lg:grid-cols-1 my-2 ">
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
                                        <div>
                                            <ValidationInput
                                                type="tel"
                                                value={phone}
                                                onChange={setPhone}
                                                placeholder="Nomor Telepon (+62)"
                                            />
                                        </div>
                                        <div>
                                            <Textarea
                                                type="text"
                                                placeholder="Alamat Tagihan"
                                                className="!border-2 !border-secondary bg-blue-gray-100 text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                containerProps={{ className: "min-w-[100px] h-[150px]" }}
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
                                    </div>
                                </div>
                            </AccordionBody>
                        </Accordion>
                        <Accordion open={open === 2} icon={<Icon id={2} open={open} />} >
                            <AccordionHeader
                                onClick={() => handleOpen(2)}
                                className='bg-gray px-2 border-2 border-gray rounded-lg'>
                                <div className="flex items-center">
                                    <FaCheckCircle className="text-secondary mx-4" />
                                    <span>Alamat Pengiriman</span>
                                </div>
                            </AccordionHeader>
                            <AccordionBody
                                className={`px-5 border-2 border-gray rounded-s-lg rounded-e-lg 
                            ${open === 1 ? 'accordion-enter-active' : 'accordion-exit'}`}
                            >
                                <div className="space-y-6">
                                    <div className="grid gap-6 lg:grid-cols-1 my-2 ">
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
                                        <div>
                                            <ValidationInput
                                                type="tel"
                                                value={phone}
                                                onChange={setPhone}
                                                placeholder="Nomor Telepon (+62)"
                                            />
                                        </div>
                                        <div>
                                            <Textarea
                                                type="text"
                                                placeholder="Alamat Pengiriman"
                                                className="!border-2 !border-secondary bg-blue-gray-100 text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                containerProps={{ className: "min-w-[100px] h-[150px]" }}
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
                                    </div>
                                </div>
                            </AccordionBody>
                        </Accordion>
                        <Accordion open={open === 3} icon={<Icon id={3} open={open} />} >
                            <AccordionHeader
                                onClick={() => handleOpen(3)}
                                className='bg-gray px-2 border-2 border-gray rounded-lg'>
                                <div className="flex items-center">
                                    <FaCheckCircle className="text-secondary mx-4" />
                                    <span>Pilih Tipe Pembayaran</span>
                                </div>
                            </AccordionHeader>
                            <AccordionBody
                                className={`px-5 border-2 border-gray rounded-s-lg rounded-e-lg 
                            ${open === 3 ? 'accordion-enter-active' : 'accordion-exit'}`}
                            >
                                <>
                                    <Accordion open={open1 === 1}>
                                        <AccordionHeader onClick={() => handleOpen1(1)}>Via Transfer Antar Bank</AccordionHeader>
                                        <AccordionBody>
                                            <div className="flex flex-col gap-2 ml-3">
                                                <Radio
                                                    name="terms"
                                                    label={
                                                        <Typography
                                                            as="a"
                                                            color="blue-gray"
                                                            className="hover:text-blueg-gray-900 font-medium transition-colors"
                                                        >
                                                            Via Bank Mandiri
                                                        </Typography>
                                                    }
                                                />
                                                <Radio
                                                    name="terms"
                                                    label={
                                                        <Typography
                                                            as="a"
                                                            color="blue-gray"
                                                            className="hover:text-blueg-gray-900 font-medium transition-colors"
                                                        >
                                                            Via Bank BCA
                                                        </Typography>
                                                    }
                                                />
                                                <Radio
                                                    name="terms"
                                                    label={
                                                        <Typography
                                                            as="a"
                                                            color="blue-gray"
                                                            className="hover:text-blueg-gray-900 font-medium transition-colors"
                                                        >
                                                            Via Bank BRI
                                                        </Typography>
                                                    }
                                                />
                                            </div>
                                        </AccordionBody>
                                    </Accordion>
                                    <Accordion open={open1 === 2}>
                                        <AccordionHeader onClick={() => handleOpen1(2)}>
                                            Via Virtual Account
                                        </AccordionHeader>
                                        <AccordionBody>
                                            <div className="flex flex-col gap-2 ml-3">
                                                <Radio
                                                    name="terms"
                                                    label={
                                                        <Typography
                                                            as="a"
                                                            color="blue-gray"
                                                            className="hover:text-blueg-gray-900 font-medium transition-colors"
                                                        >
                                                            Via Bank Mandiri
                                                        </Typography>
                                                    }
                                                />
                                                <Radio
                                                    name="terms"
                                                    label={
                                                        <Typography
                                                            as="a"
                                                            color="blue-gray"
                                                            className="hover:text-blueg-gray-900 font-medium transition-colors"
                                                        >
                                                            Via Bank BCA
                                                        </Typography>
                                                    }
                                                />
                                                <Radio
                                                    name="terms"
                                                    label={
                                                        <Typography
                                                            as="a"
                                                            color="blue-gray"
                                                            className="hover:text-blueg-gray-900 font-medium transition-colors"
                                                        >
                                                            Via Bank BRI
                                                        </Typography>
                                                    }
                                                />
                                            </div>
                                        </AccordionBody>
                                    </Accordion>
                                </>
                            </AccordionBody>
                        </Accordion>
                    </div>
                    <div className="flex flex-col items-start justify-center w-auto h-full mx-auto text-center leading-relaxed overflow-auto py-3">
                        <Card className="h-full w-full">
                            <table className="w-full min-w-max table-auto">
                                <thead>
                                    <tr>
                                        {HeaderCount.map((head) => (
                                            <th
                                                key={head}
                                                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-center w-44"
                                            >
                                                <Typography
                                                    variant="h6"
                                                    className="text-black font-black leading-none opacity-70"
                                                >
                                                    {head}
                                                </Typography>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className='text-start'>
                                    {CountTotal.map(({ desc, harga }, index) => {
                                        const isLast = index === CountTotal.length - 1;
                                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50 w-44";
                                        return (
                                            <tr key={desc}>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="h6"
                                                        color="blue-gray"
                                                        className="font-extrabold"
                                                    >
                                                        {desc}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="h6"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {harga}
                                                    </Typography>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </Card>
                        <div className="flex justify-start mt-4 mx-3">
                            <Button className="button-effect" type="button" onClick={() => pengarah.push("/Beranda")}>
                                <span>Selesaikan Pemesanan</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div >
    );
}

export default KonfirmasiPemesanan;
