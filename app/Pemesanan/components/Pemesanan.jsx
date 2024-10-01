import React, { useState } from 'react';
import { Card, Typography, Button } from '@/app/MTailwind';
import { FaTrash } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import "@/app/globals.css";

function PemesananProduk() {
    const pengarah = useRouter();
    const HeaderPesanan = ["Nama", "Harga", "Kuantitas", "Total", ""];
    const [contentPesanan, setContentPesanan] = useState([
        {
            productname: "Selada",
            harga: "Rp 15.000",
            hargaNumerical: 15000,
            kuantitas: 1,
            total: "Rp 15.000",
        },
        {
            productname: "Tomat",
            harga: "Rp 10.000",
            hargaNumerical: 10000,
            kuantitas: 1,
            total: "Rp 10.000",
        },
        {
            productname: "Cabai",
            harga: "Rp 12.000",
            hargaNumerical: 12000,
            kuantitas: 1,
            total: "Rp 12.000",
        },
        {
            productname: "Kubis",
            harga: "Rp 10.000",
            hargaNumerical: 10000,
            kuantitas: 1,
            total: "Rp 10.000",
        },
        {
            productname: "Bawang Bombai",
            harga: "Rp 12.000",
            hargaNumerical: 12000,
            kuantitas: 1,
            total: "Rp 12.000",
        },
    ]);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(value);
    };

    const handleQuantityChange = (index, value) => {
        const updatedContent = [...contentPesanan];
        const newQuantity = value < 1 ? 1 : value;
        updatedContent[index].kuantitas = newQuantity;
        updatedContent[index].total = formatCurrency(updatedContent[index].hargaNumerical * newQuantity);
        setContentPesanan(updatedContent);
    };

    const handleRemove = (index) => {
        const updatedContent = contentPesanan.filter((_, i) => i !== index);
        setContentPesanan(updatedContent);
    };

    const calculateTotals = () => {
        const subtotal = contentPesanan.reduce((sum, item) => sum + item.hargaNumerical * item.kuantitas, 0);
        const shippingCost = 150000;
        const total = subtotal + shippingCost;
        return {
            subtotal: formatCurrency(subtotal),
            shipping: formatCurrency(shippingCost),
            total: formatCurrency(total)
        };
    };

    const { subtotal, shipping, total } = calculateTotals();

    const HeaderCount = ["Nama", "Harga"];
    const CountTotal = [
        { desc: "Subtotal", harga: subtotal },
        { desc: "Biaya Pengiriman", harga: shipping },
        { desc: "Total", harga: total },
    ];

    return (
        <div className="mt-10 py-20 lg:py-10 z-10 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-10 lg:items-center lg:justify-end lg:gap-2">
                <div className="flex flex-col items-start justify-center w-auto h-full ml-auto mr-0 text-center leading-relaxed overflow-auto">
                    <Card className="h-full w-full overflow-scroll">
                        <table className="w-full min-w-max table-auto">
                            <thead>
                                <tr>
                                    {HeaderPesanan.map((head) => (
                                        <th
                                            key={head}
                                            className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-center w-40"
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
                            <tbody className='text-center'>
                                {contentPesanan.map(({ productname, harga, kuantitas, total }, index) => {
                                    const isLast = index === contentPesanan.length - 1;
                                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50 w-40";
                                    return (
                                        <tr key={productname}>
                                            <td className={classes}>
                                                <Typography
                                                    variant="h6"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {productname}
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
                                            <td className={classes}>
                                                <input
                                                    type="number"
                                                    value={kuantitas}
                                                    min="1"
                                                    onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                                                    className="p-2 w-full border border-gray-300 rounded"
                                                />
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="h6"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {total}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <button className="p-2" onClick={() => handleRemove(index)}>
                                                    <FaTrash className="text-red-500" />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </Card>
                </div>
                <div className="flex flex-col items-start justify-center w-auto h-full mx-auto text-center leading-relaxed overflow-auto">
                    <Card className="h-full w-full overflow-hidden">
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
                            <tbody className='text-center'>
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
                        <div className="flex justify-start mt-4 mx-3">
                            <Button className="button-effect" type="button" onClick={() => pengarah.push("/KonfirmasiPesanan")}>
                                <span>Lanjutkan Pemesanan</span>
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default PemesananProduk;
