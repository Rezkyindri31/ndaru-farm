"use client";
import Image from 'next/image';
import React from 'react';
import { Typography, Button } from '@/app/MTailwind';
import { FaLocationArrow } from "react-icons/fa";
import Logo from '@/assets/img/logo.png';
import { useRouter } from "next/navigation";


function EventsSection() {
    const pengarah = useRouter();
    return (
        <div className="mt-10 py-20 lg:py-32 z-10 relative bg-gray">
            <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-10 lg:items-center lg:justify-end lg:gap-2 ">
                <div className="flex items-center justify-center w-96 h-96 bg-transparent shadow-lg backdrop-blur-sm border border-white border-opacity-20 rounded-lg mx-auto ">
                    <Image src={Logo} alt="Ndaru Farm Logo"></Image>
                </div>
                <div className="text-center lg:text-left lg:space-y-4 mx-6 lg:mx-12 lg:mr-80 ">
                    <Typography variant="lead" className='text-blue-gray-400 font-black'>Sejak Tahun 2018</Typography>
                    <h1 className="text-4xl font-semibold ">
                        Tentang <span className="font-black text-secondary">Kami</span>
                    </h1>
                    <Typography variant="paragraph" className='text-justify'>
                        Ndaru Farm terletak di Batujajar, Kabupaten Bandung Barat. Awalnya berupa sawah, lahan ini kemudian dialihfungsikan menjadi tempat budidaya akuaponik oleh pengelolanya, Nano, dan kakaknya sebagai pemilik. Menggunakan teknologi akuaponik yang menggabungkan akuakultur dan hidroponik, Ndaru Farm mengoptimalkan penggunaan air dan ruang untuk budidaya ikan dan tanaman hidroponik.
                    </Typography>
                </div>
            </div>
        </div>
    );
}

export default EventsSection;
