"use client";
import Image from "next/image";
import {
    Typography, CardBody,
    CardFooter, Button
} from "@/app/MTailwind";
import { FaLocationArrow } from "react-icons/fa";
import { TiArrowLeftThick, TiArrowRightThick } from "react-icons/ti";
import { IconButton } from "@/app/MTailwind";
import News1 from "../assets/img/latest-news/news-bg-1.jpg";
import News2 from "../assets/img/latest-news/news-bg-2.jpg";
import News3 from "../assets/img/latest-news/news-bg-3.jpg";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { usePath } from "@/components/PathContext";
import Loader from "@/components/Loader"

const news = [
    {
        name: "Judul Berita 1",
        image: News1,
        desc: "Deskripsi Berita 1",
    },
    {
        name: "Judul Berita 2",
        image: News2,
        desc: "Deskripsi Berita 2",
    },
    {
        name: "Judul Berita 3",
        image: News3,
        desc: "Deskripsi Berita 3",
    },
    {
        name: "Judul Berita 3",
        image: News3,
        desc: "Deskripsi Berita 3",
    },
    {
        name: "Judul Berita 3",
        image: News3,
        desc: "Deskripsi Berita 3",
    },
    {
        name: "Judul Berita 3",
        image: News3,
        desc: "Deskripsi Berita 3",
    },
    {
        name: "Judul Berita 3",
        image: News3,
        desc: "Deskripsi Berita 3",
    },
    {
        name: "Judul Berita 3",
        image: News3,
        desc: "Deskripsi Berita 3",
    },
    {
        name: "Judul Berita 3",
        image: News3,
        desc: "Deskripsi Berita 3",
    },
    {
        name: "Judul Berita 10",
        image: News3,
        desc: "Deskripsi Berita 10",
    },
];

function Berita() {
    const [activePage, setActivePage] = useState(1);
    const { currentPath } = usePath();
    if (!currentPath) {
        return <Loader />;
    }
    const pengarah = useRouter();
    const newsPerPage = 9;

    const isHomepage = currentPath === "/Beranda";

    const displayedNews = isHomepage ? news.slice(0, 3) : news;
    const totalPages = Math.ceil(displayedNews.length / newsPerPage);

    const getCurrentNews = () => {
        if (isHomepage) {
            return displayedNews;
        }
        const startIndex = (activePage - 1) * newsPerPage;
        const endIndex = startIndex + newsPerPage;
        return displayedNews.slice(startIndex, endIndex);
    };

    const getItemProps = (index) => ({
        variant: activePage === index ? "filled" : "text",
        color: "gray",
        onClick: () => setActivePage(index),
        className: "rounded-full text-secondary",
    });

    const next = () => {
        if (activePage < totalPages) {
            setActivePage(activePage + 1);
        }
    };

    const prev = () => {
        if (activePage > 1) {
            setActivePage(activePage - 1);
        }
    };

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
                        {getCurrentNews().map((newsinfo, index) => (
                            <div key={index} className="relative flex flex-col my-6 bg-white border border-gray rounded-lg shadow-lg mx-5 p-5 w-auto transition-transform duration-300 ease-in-out hover:shadow-none hover:border-none hover:scale-110">
                                <div className="relative h-52 m-1.5 overflow-hidden text-white rounded-md">
                                    <Image src={newsinfo.image} alt={`${newsinfo.name}-image`} />
                                </div>
                                <CardBody>
                                    <Typography variant="h5" color="blue-gray" className="mb-2">
                                        {newsinfo.name}
                                    </Typography>
                                    <Typography>
                                        {newsinfo.desc}
                                    </Typography>
                                </CardBody>
                                <CardFooter className="pt-0">
                                    <Button className="w-56 bg-secondary text-white text-sm border-none rounded-full px-8 py-2 font-semibold uppercase transition-transform duration-300 ease-in-out flex justify-center items-center gap-2 hover:bg-white hover:text-secondary hover:scale-110">Baca Selengkapnya</Button>
                                </CardFooter>
                            </div>
                        ))}
                    </div>
                </>
            )}
            {!isHomepage && totalPages > 1 && (
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
