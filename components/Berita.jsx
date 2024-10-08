"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
    Typography, CardBody,
    CardFooter, Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@/app/MTailwind";
import { FaLocationArrow } from "react-icons/fa";
import { TiArrowLeftThick, TiArrowRightThick } from "react-icons/ti";
import { IconButton } from "@/app/MTailwind";
import { useRouter } from "next/navigation";
import { usePath } from "@/components/PathContext";
import useStateBerita from "@/hooks/useStateBerita";
import Loader from "@/components/Loader"

function Berita() {
    const { currentPath } = usePath();
    if (!currentPath) {
        return <Loader />;
    }
    const pengarah = useRouter();
    const { activePage,
        totalPages,
        getCurrentNews,
        getItemProps,
        next,
        prev,
        isHomepage } = useStateBerita();
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);
    return (
        <div className="h-full my-16 z-10 relative">
            {getCurrentNews().length > 0 && (
                <>
                    <div className="flex items-center justify-center gap-4 uppercase font-black pt-2">
                        <h1 className="text-4xl text-secondary underline underline-offset-8">Berita</h1>
                        <h1 className="text-4xl">Kami</h1>
                    </div>
                    <div className="flex items-center text-center justify-center gap-4 font-black my-10 mx-96">
                        <Typography variant="paragraph">
                            Konten ini berisikan informasi terkait Ndaru Farm maupun terkait seputar sayuran hidroponik dan sayuran sehat lainnya.
                        </Typography>
                    </div>
                    <div className="grid grid-cols-1 gap-1 py-6 lg:grid-cols-3 lg:gap-6 justify-items-center px-5 lg:px-36 lg:py-4">
                        {getCurrentNews().map((news) => (
                            <div key={news.id} className="relative flex flex-col my-6 bg-white border border-gray rounded-lg shadow-lg mx-5 p-5 w-auto transition-transform duration-300 ease-in-out hover:shadow-none hover:border-none hover:scale-110">
                                <div className="relative h-52  m-1.5 overflow-hidden text-white rounded-md">
                                    <Image src={news.Gambar} alt={`${news.Judul}-image`}
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-md" />
                                </div>
                                <CardBody>
                                    <Typography variant="h5" color="blue-gray" className="mb-2">
                                        {news.Judul}
                                    </Typography>
                                    <Typography>
                                        {news.Deskripsi}
                                    </Typography>
                                    <Typography className="mt-2 border-2 border-secondary text-base text-center rounded-full bg-secondary text-white mx-12">
                                        {news.Kategori}
                                    </Typography>
                                </CardBody>
                                <CardFooter className="pt-0">
                                    <Button onClick={handleOpen} className="w-56 bg-secondary text-white text-sm border-none rounded-full px-8 py-2 font-semibold uppercase transition-transform duration-300 ease-in-out flex justify-center items-center gap-2 hover:bg-white hover:text-secondary hover:scale-110">Baca Selengkapnya</Button>
                                    <>
                                        <Dialog open={open} handler={handleOpen}>
                                            <DialogHeader>{news.Judul}</DialogHeader>
                                            <DialogBody className="relative h-auto w-auto flex justify-center items-center">
                                                <div className="relative w-full h-full">
                                                    <Image
                                                        src={news.Gambar}
                                                        alt={`${news.Judul}-image`}
                                                        layout="fill"
                                                        objectFit="cover"
                                                        className="rounded-md"
                                                    />
                                                    <Typography>
                                                        {news.Deskripsi}
                                                    </Typography>
                                                    <Typography className="mt-2 border-2 border-secondary text-base text-center rounded-full bg-secondary text-white mx-12">
                                                        {news.Kategori}
                                                    </Typography>
                                                </div>
                                            </DialogBody>
                                            <DialogFooter>
                                                <Button
                                                    variant="text"
                                                    color="red"
                                                    onClick={handleOpen}
                                                    className="mr-1"
                                                >
                                                    <span>Cancel</span>
                                                </Button>
                                                <Button variant="gradient" color="green" onClick={handleOpen}>
                                                    <span>Confirm</span>
                                                </Button>
                                            </DialogFooter>
                                        </Dialog>
                                    </>
                                </CardFooter>
                            </div>
                        ))}
                    </div>
                </>
            )}
            {currentPath !== "/Beranda" && totalPages > 1 && (
                <div className="flex items-center gap-4 justify-center">
                    <Button
                        variant="text"
                        className="flex items-center gap-2 rounded-full text-secondary"
                        onClick={prev}
                        disabled={activePage === 1}
                    >
                        <TiArrowLeftThick strokeWidth={2} className="h-4 w-4 " /> Previous
                    </Button>
                    <div className="flex items-center gap-2 text-secondary">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <IconButton key={index + 1} {...getItemProps(index + 1)}>{index + 1}</IconButton>
                        ))}
                    </div>
                    <Button
                        variant="text"
                        className="flex items-center gap-2 rounded-full text-secondary"
                        onClick={next}
                        disabled={activePage === totalPages}
                    >
                        Next
                        <TiArrowRightThick strokeWidth={2} className="h-4 w-4" />
                    </Button>
                </div>
            )}
            {isHomepage && (
                <div className="flex justify-center items-center my-6">
                    <Button className="button-effect" type="button" onClick={() => pengarah.push("/Berita")}>
                        <FaLocationArrow /> <span>Ketahui Lebih Banyak</span>
                    </Button>
                </div>
            )}
        </div>
    );
}

export default Berita;
