import React, { useState } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Timeline,
    TimelineItem,
    TimelineConnector,
    TimelineHeader,
    TimelineIcon,
    TimelineBody,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { usePath } from '@/components/PathContext';
import { FaInfoCircle, FaHome, FaBell, FaDollarSign, FaNewspaper } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import useTransactions from "@/hooks/useFetchTransaction";


function OrderList({ title, options, icon, detail }) {
    const [open, setOpen] = React.useState(false);
    const { transactions, isLoading, error } = useTransactions();
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    if (isLoading) {
        return <p>Loading transactions...</p>;
    }
    if (error) {
        return <p>{error}</p>;
    }

    const handleOpen = (transaction) => {
        setSelectedTransaction(transaction);
        setOpen(!open);
    };
    return (
        <>
            {transactions.map((transaction) => (
                <div key={transaction.id}>
                    <Card shadow={false} className="rounded-lg border border-gray-300 p-4">
                        <div className="mb-4 flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="border border-gray-200 p-2.5 rounded-lg">
                                    <FaNewspaper className="h-6 w-6 text-gray-900" />
                                </div>
                                <div>
                                    <Typography variant="small" color="blue-gray" className="mb-1 font-bold">
                                        # {transaction.orderId}
                                    </Typography>
                                    <Typography className="!text-gray-600 text-xs font-normal">
                                        {transaction.status}
                                    </Typography>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <Button
                                    size="sm"
                                    variant="text"
                                    className="flex items-center gap-2"
                                    onClick={() => handleOpen(transaction)}
                                >
                                    <FaInfoCircle className="h-4 w-4 text-gray-600" />
                                    <Typography className="!font-semibold text-xs text-gray-600 md:block hidden">
                                        Lihat Detail
                                    </Typography>
                                </Button>
                            </div>
                        </div>
                        <div>
                            <div className="grid grid-cols-1 gap-1">
                                <Typography className="mb-1 text-xs !font-medium !text-gray-600">
                                    {transaction.userTagihan?.Nama_Tagihan}
                                </Typography>
                                <Typography className="mb-1 text-xs !font-medium !text-gray-600">
                                    {transaction.userTagihan?.Email_Tagihan}
                                </Typography>
                                <Typography className="mb-1 text-xs !font-medium !text-gray-600">
                                    {transaction.userTagihan?.Nomor_Telepon_Tagihan}
                                </Typography>
                            </div>
                        </div>
                    </Card>
                    <Dialog className="fixed z-50 w-full h-full" size="lg" open={open} handler={handleOpen}>
                        <DialogHeader>Tracking Pesanan # {selectedTransaction?.orderId}</DialogHeader>
                        <DialogBody className="overflow-y-auto h-full py-5">
                            <div className="space-y-8">
                                <Timeline className="p-6 max-w-7xl mx-auto bg-white shadow-lg rounded-lg">
                                    {Array(3).fill().map((_, index) => (
                                        <TimelineItem key={index}>
                                            <TimelineConnector />
                                            <TimelineHeader>
                                                <TimelineIcon className="p-2 bg-white shadow-lg border-2 border-gray">
                                                    {index === 0 && <FaHome className="h-4 w-4 text-secondary" />}
                                                    {index === 1 && <FaBell className="h-4 w-4 text-secondary" />}
                                                    {index === 2 && <FaDollarSign className="h-4 w-4 text-secondary" />}
                                                </TimelineIcon>
                                                <Typography variant="h5" color="blue-gray">
                                                    Timeline Title Here.
                                                </Typography>
                                            </TimelineHeader>
                                            <TimelineBody className="pb-8">
                                                <Typography color="gray" className="font-normal text-gray-600">
                                                    The key to more success is to have a lot of pillows. Put it this way, it took me
                                                    twenty five years to get these plants, twenty five years of blood sweat and tears, and
                                                    I&apos;m never giving up, I&apos;m just getting started. I&apos;m up to something. Fan
                                                    luv.
                                                </Typography>
                                            </TimelineBody>
                                        </TimelineItem>
                                    ))}
                                </Timeline>
                                <div className="p-6 max-w-7xl mx-auto bg-white shadow-lg rounded-lg pb-20">
                                    <h1 className="text-2xl font-semibold mb-2">Detail Pesanan</h1>
                                    <p className="text-gray-500 mb-6">
                                        Dipesan pada tanggal <span className="font-bold">{selectedTransaction?.userTagihan?.createdAt}</span>
                                    </p>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        {/* Left Column */}
                                        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                                            <div className="flex justify-between items-center mb-4">
                                                <div>
                                                    <p>Order Number: {selectedTransaction?.createdAt?.toDate().toLocaleString()}</p>
                                                    <p>Date Ordered: # {selectedTransaction?.orderId}</p>
                                                </div>
                                                <Button className="flex items-center gap-2" color="gray" size="sm">
                                                    Download Invoice
                                                </Button>
                                            </div>
                                            <div className="mt-4">
                                                {/* Product List */}
                                                <div className="border-t pt-4">
                                                    <div className="flex items-center mb-4">
                                                        <img
                                                            src="https://via.placeholder.com/80"
                                                            alt="Premium Suit"
                                                            className="w-16 h-16 object-cover"
                                                        />
                                                        <div className="ml-4">
                                                            <h3 className="font-semibold">Premium Suit</h3>
                                                            <p className="text-gray-500">Premium Wool Blend (80% Wool, 20% Polyester)</p>
                                                            <p>Size: M</p>
                                                            <p className="font-bold">Price: $790.00</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center">
                                                        <img
                                                            src="https://via.placeholder.com/80"
                                                            alt="Classic Leather Jacket"
                                                            className="w-16 h-16 object-cover"
                                                        />
                                                        <div className="ml-4">
                                                            <h3 className="font-semibold">Classic Leather Jacket</h3>
                                                            <p className="text-gray-500">100% Genuine Leather</p>
                                                            <p>Size: M</p>
                                                            <p className="font-bold">Price: $990.00</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Column */}
                                        <div>
                                            <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
                                                <h2 className="font-semibold mb-4">Order Summary</h2>
                                                <div className="flex justify-between mb-2">
                                                    <span>Shipping estimate</span>
                                                    <span>Rp 0</span>
                                                </div>
                                                <div className="flex justify-between mb-2">
                                                    <span>Tax estimate</span>
                                                    <span>Rp 0</span>
                                                </div>
                                                <div className="flex justify-between font-bold">
                                                    <span>Total</span>
                                                    <span>
                                                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(selectedTransaction?.totalPrice)}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Shipping Address */}
                                            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                                                <div className="flex justify-between items-center mb-4">
                                                    <h2 className="font-semibold">Alamat Pengiriman</h2>
                                                    <Button color="gray" size="sm" variant="text">
                                                        Edit
                                                    </Button>
                                                </div>
                                                <div>
                                                    <p>{selectedTransaction?.userPenerima?.Nama_Penerima}</p>
                                                    <p>{selectedTransaction?.userPenerima?.Nomor_Telepon_Penerima}</p>
                                                    <p>{selectedTransaction?.userPenerima?.Alamat_Penerima}</p>
                                                </div>
                                            </div>

                                            {/* Billing Address */}
                                            <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-4">
                                                <div className="flex justify-between items-center mb-4">
                                                    <h2 className="font-semibold">Billing Address</h2>
                                                    <Button color="gray" size="sm" variant="text">
                                                        Edit
                                                    </Button>
                                                </div>
                                                <p>{selectedTransaction?.userTagihan?.Nama_Tagihan}</p>
                                                <p>{selectedTransaction?.userTagihan?.Email_Tagihan}</p>
                                                <p>{selectedTransaction?.userTagihan?.Nomor_Telepon_Tagihan}</p>
                                                <p>{selectedTransaction?.userTagihan?.Alamat_Tagihan}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </DialogBody>
                        <DialogFooter>
                            <Button
                                variant="text"
                                color="red"
                                onClick={handleOpen}
                                className="mr-1"
                            >
                                <span>Close</span>
                            </Button>
                        </DialogFooter>
                    </Dialog>
                </div>
            ))}
        </>
    );
}

function TrackingPesanan() {
    const router = useRouter();
    const { setCurrentPath } = usePath();
    const [openNav, setOpenNav] = React.useState(false);
    const [navbarBg, setNavbarBg] = React.useState("bg-transparent");
    const [activeNav, setActiveNav] = React.useState("/Beranda");

    React.useEffect(() => {
        const handlePathnameUpdate = () => {
            const currentPath = window.location.pathname;
            console.log("Current Path:", currentPath);
            setActiveNav(currentPath);
        };

        handlePathnameUpdate();
        window.addEventListener("popstate", handlePathnameUpdate);

        return () => {
            window.removeEventListener("popstate", handlePathnameUpdate);
        };
    }, []);

    React.useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setNavbarBg("bg-secondary");
            } else {
                setNavbarBg("bg-transparent");
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 960) setOpenNav(false);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleNavClick = (path) => {
        console.log("Navigating to:", path);
        setActiveNav(path);
        router.push(path);
    };

    const { transactions, isLoading, error } = useTransactions();

    if (isLoading) {
        return <p>Loading transactions...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <section className="max-w-4xl !mx-auto px-8 py-20 w-full">
            <Card shadow={false}>
                <CardHeader
                    floated={false}
                    shadow={false}
                    className="rounded-none flex gap-2 flex-col md:flex-row items-start !justify-between"
                >
                    <div className="w-full mb-2">
                        <Typography className="!font-bold" color="blue-gray">
                            Informasi Pemesanan
                        </Typography>
                        <Typography
                            className="mt-1 !font-normal !text-gray-600"
                            variant="small"
                        >
                            Lihat dan perbarui detail tagihan Anda dengan cepat dan mudah.
                        </Typography>
                    </div>
                    <div className="w-full">
                        <Button
                            size="sm"
                            variant="outlined"
                            color="gray"
                            className="flex justify-center gap-3 md:max-w-fit w-full ml-auto" onClick={() => handleNavClick("/Beranda")}
                        >
                            <FaPlus strokeWidth={3} className="h-4 w-4" />
                            Tambahkan Pesanan
                        </Button>
                    </div>
                </CardHeader>
                <CardBody className="flex flex-col gap-4 !p-10">
                    {transactions.length === 0 ? (
                        <p className="font-bold text-center text-2xl uppercase">Tidak ada transaksi</p>
                    ) : (
                        <OrderList />
                    )}
                </CardBody>
            </Card>
        </section>
    );
}

export default TrackingPesanan;