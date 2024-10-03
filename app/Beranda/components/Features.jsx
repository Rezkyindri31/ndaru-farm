"use client";
import {
    Card,
    CardBody,
    Typography,
} from "@/app/MTailwind";
import { MdDiscount } from "react-icons/md";
import { BiSolidPhoneCall } from "react-icons/bi";
import { RiRefund2Fill } from "react-icons/ri";
import { initializeAos } from "@/components/aosInit";
import { use, useEffect } from "react";

function FeatureSection() {
    useEffect(() => {
        initializeAos();
    }, []);
    return (
        <div className="z-10 relative grid grid-cols-1 gap-1 py-6 lg:grid-cols-3 lg:gap-6 justify-items-center px-5 lg:px-36 lg:py-16 bg-gray " data-aos="fade-up"
            data-aos-duration="1000">
            <Card className="w-full lg:w-auto z-50 shadow-none bg-transparent">
                <CardBody className="flex">
                    <MdDiscount className="mb-4 text-5xl me-10 text-secondary" />
                    <div className="flex flex-col">
                        <Typography variant="h5" color="blue-gray" className="mb-2 uppercase font-extrabold">
                            Bebas Biaya berkirim
                        </Typography>
                        <Typography className="text-lightgray">
                            Ketika memesan lebih dari Rp10.000.000
                        </Typography>
                    </div>
                </CardBody>
            </Card>
            <Card className="w-full lg:w-auto z-50 shadow-none bg-transparent">
                <CardBody className="flex">
                    <BiSolidPhoneCall className="mb-4 text-5xl me-10 text-secondary" />
                    <div className="flex flex-col">
                        <Typography variant="h5" color="blue-gray" className="mb-2 uppercase font-extrabold">
                            Promo Diskon 50%
                        </Typography>
                        <Typography className="text-lightgray">
                            Untuk pembelian pertama Anda.
                        </Typography>
                    </div>
                </CardBody>
            </Card>
            <Card className="w-full lg:w-auto z-50 shadow-none bg-transparent">
                <CardBody className="flex">
                    <RiRefund2Fill className="mb-4 text-5xl me-10 text-secondary" />
                    <div className="flex flex-col">
                        <Typography variant="h5" color="blue-gray" className="mb-2 uppercase font-extrabold">
                            Cashback Rp500.000
                        </Typography>
                        <Typography className="text-lightgray">
                            Berlaku untuk transaksi di atas Rp5.000.000
                        </Typography>
                    </div>
                </CardBody>
            </Card>
        </div>

    );
}

export default FeatureSection;