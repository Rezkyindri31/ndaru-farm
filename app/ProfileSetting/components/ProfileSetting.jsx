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

const openSans = Open_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

function ProfileSet() {
    return (
        <div className="h-full m-16 relative">
            <div className="text-base justify-center text-center font-bold" >
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div>
            <Card className="shadow-2xl border-blue-gray-500 h-96 ">
                <CardBody>
                    <div className="flex justify-start items-center m-5">
                        <Typography variant="h4" color="blue-gray" className={`mb-2 font-bold ${openSans.className}`}>
                            Informasi Profile
                        </Typography>
                    </div>
                    <div className="items-center flex space-x-3">
                        <div className="p-5">
                            <Typography variant="h5" color="blue-gray" className={`mb-2 font-bold ${openSans.className}`}>
                                Nama
                            </Typography>
                            <Input type="text" size="lg" color="blue-gray" placeholder="Nama Anda" className="bg-lightgray bg-opacity-10 w-96" />
                        </div>
                        <div>
                            <Typography variant="h5" color="blue-gray" className={`mb-2 font-bold ${openSans.className}`}>
                                Email
                            </Typography>
                            <Input type="email" size="lg" color="blue-gray" placeholder="Email Anda" />
                        </div>
                        <div>
                            <Typography variant="h5" color="blue-gray" className={`mb-2 font-bold ${openSans.className}`}>
                                Email
                            </Typography>
                            <Input type="email" size="lg" color="blue-gray" placeholder="Email Anda" />
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div >
    );
}

export default ProfileSet;
