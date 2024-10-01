import React from "react";
import Image from "next/image";
import { Typography, Button, IconButton } from "@/app/MTailwind";
import { TiArrowLeftThick, TiArrowRightThick } from "react-icons/ti";
import { usePath } from "@/components/PathContext";
import SeladaImage from "../assets/img/Produk/Selada.jpeg";
import PokcoyImage from "../assets/img/Produk/Pokcoy.jpeg";
import TomatImage from "../assets/img/Produk/Tomat.jpeg";
import { TiStarFullOutline } from "react-icons/ti";
import { BsCartPlusFill } from "react-icons/bs";
import Loader from "@/components/Loader"

const products = [
    {
        name: "Selada",
        image: SeladaImage,
        desc: "Per Kg",
        price: "Rp 15.000",
        rating: 5.0,
    },
    {
        name: "Pokcoy",
        image: PokcoyImage,
        desc: "Per Kg",
        price: "Rp 12.000",
        rating: 4.8,
    },
    {
        name: "Tomat",
        image: TomatImage,
        desc: "Per Kg",
        price: "Rp 10.000",
        rating: 4.7,
    },
    {
        name: "Tomat",
        image: TomatImage,
        desc: "Per Kg",
        price: "Rp 10.000",
        rating: 4.7,
    },
    {
        name: "Tomat",
        image: TomatImage,
        desc: "Per Kg",
        price: "Rp 10.000",
        rating: 4.7,
    },
    {
        name: "Tomat",
        image: TomatImage,
        desc: "Per Kg",
        price: "Rp 10.000",
        rating: 4.7,
    },
    {
        name: "Tomat",
        image: TomatImage,
        desc: "Per Kg",
        price: "Rp 10.000",
        rating: 4.7,
    },
    {
        name: "Tomat",
        image: TomatImage,
        desc: "Per Kg",
        price: "Rp 10.000",
        rating: 4.7,
    },
    {
        name: "Tomat",
        image: TomatImage,
        desc: "Per Kg",
        price: "Rp 10.000",
        rating: 4.7,
    },
    {
        name: "Selada",
        image: TomatImage,
        desc: "Per Kg",
        price: "Rp 10.000",
        rating: 4.7,
    },
];

function Produk() {
    const [activePage, setActivePage] = React.useState(1);
    const { currentPath } = usePath();
    if (!currentPath) {
        return <Loader />;
    }
    const productsPerPage = 9;
    const isHomepage = currentPath === "/Beranda";
    const displayedProducts = isHomepage ? products.slice(0, 3) : products;
    const totalPages = Math.ceil(displayedProducts.length / productsPerPage);
    const getCurrentProducts = () => {
        if (isHomepage) {
            return displayedProducts;
        }
        const startIndex = (activePage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        return displayedProducts.slice(startIndex, endIndex);
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
        <div className="h-full my-16">
            {getCurrentProducts().length > 0 && (
                <>
                    <div className="flex items-center justify-center gap-4 uppercase font-black pt-2">
                        <h1 className="text-4xl text-secondary underline underline-offset-8">Produk</h1>
                        <h1 className="text-4xl">Kami</h1>
                    </div>
                    <div className="flex items-center text-center justify-center gap-4 font-black my-10 mx-96">
                        <Typography variant="paragraph">
                            Kami adalah tim yang berkomitmen untuk menyediakan produk-produk berkualitas tinggi bagi Anda. Dengan fokus pada kualitas, kesehatan, dan kepuasan pelanggan, kami hadir dengan beragam produk segar dan organik. Dengan pengalaman dan reputasi yang kuat, kami siap menjadi mitra terpercaya Anda dalam menjaga gaya hidup sehat.
                        </Typography>
                    </div>
                    <div className="produk-container grid grid-cols-1 gap-1 py-6 lg:grid-cols-3 lg:gap-6 justify-items-center px-5 lg:px-36 lg:py-4">
                        {getCurrentProducts().map((product, index) => (
                            <div key={index} className="relative flex flex-col my-6 bg-white border border-gray rounded-lg shadow-lg mx-5 p-12 w-auto transition-transform duration-300 ease-in-out hover:shadow-none hover:border-none hover:scale-110">
                                <div className="relative h-72 m-2.5 overflow-hidden text-white rounded-md">
                                    <Image src={product.image} alt={`${product.name}-image`} />
                                </div>
                                <div className="p-4">
                                    <div className="flex items-center mb-2">
                                        <h6 className="text-slate-800 text-xl font-black">
                                            {product.name}
                                        </h6>
                                        <div className="flex items-center gap-0.5 ml-auto">
                                            <TiStarFullOutline className="w-5 h-5 text-yellow-600" />
                                            <span className="text-slate-600 ml-1.5 font-bold">{product.rating.toFixed(1)}</span>
                                        </div>
                                    </div>
                                    <p className="text-slate-600 leading-normal">
                                        {product.desc}
                                    </p>
                                    <p className="text-slate-600 leading-normal font-bold">
                                        {product.price}
                                    </p>
                                </div>
                                <div className="px-4 pb-4 pt-0 mt-2 text-base">
                                    <button className="w-full bg-secondary text-white text-sm border-none rounded-full px-8 py-2 font-semibold uppercase transition-transform duration-300 ease-in-out flex justify-center items-center gap-2 hover:bg-white hover:text-secondary hover:scale-110" type="button">
                                        <BsCartPlusFill /> Masukkan Keranjang
                                    </button>
                                </div>
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
        </div>
    );
}

export default Produk;
