import React from "react";
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


function OrderList({ title, options, icon, detail }) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(!open);
    return (
        <Card
            shadow={false}
            className="rounded-lg border border-gray-300 p-4"
        >
            <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div className="border border-gray-200 p-2.5 rounded-lg">
                        {icon}
                    </div>
                    <div>
                        <Typography variant="small" color="blue-gray" className="mb-1 font-bold">
                            {title}
                        </Typography>
                        <Typography
                            className="!text-gray-600 text-xs font-normal"
                        >
                            {detail}
                        </Typography>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <Button
                        size="sm"
                        variant="text"
                        className="flex items-center gap-2"
                    >
                        <FaInfoCircle className="h-4 w-4 text-gray-600" />
                        <Typography className="!font-semibold text-xs text-gray-600 md:block hidden" onClick={handleOpen} variant="gradient">
                            Lihat Detail
                        </Typography>
                    </Button>
                </div>
                <div className="hidden">
                    <Dialog open={open} handler={handleOpen}>
                        <DialogHeader>Tracking Pesanan #FRB1235476</DialogHeader>
                        <DialogBody>
                            <div className="w-[32rem]">
                                <Timeline>
                                    <TimelineItem>
                                        <TimelineConnector />
                                        <TimelineHeader>
                                            <TimelineIcon className="p-2 bg-white shadow-lg border-2 border-gray">
                                                <FaHome className="h-4 w-4 text-secondary" />
                                            </TimelineIcon>
                                            <Typography variant="h5" color="blue-gray">
                                                Timeline Title Here.
                                            </Typography>
                                        </TimelineHeader>
                                        <TimelineBody className="pb-8">
                                            <Typography color="gary" className="font-normal text-gray-600">
                                                The key to more success is to have a lot of pillows. Put it this way, it took me
                                                twenty five years to get these plants, twenty five years of blood sweat and tears, and
                                                I&apos;m never giving up, I&apos;m just getting started. I&apos;m up to something. Fan
                                                luv.
                                            </Typography>
                                        </TimelineBody>
                                    </TimelineItem>
                                    <TimelineItem>
                                        <TimelineConnector />
                                        <TimelineHeader>
                                            <TimelineIcon className="p-2 bg-white shadow-lg border-2 border-gray">
                                                <FaBell className="h-4 w-4 text-secondary" />
                                            </TimelineIcon>
                                            <Typography variant="h5" color="blue-gray">
                                                Timeline Title Here.
                                            </Typography>
                                        </TimelineHeader>
                                        <TimelineBody className="pb-8">
                                            <Typography color="gary" className="font-normal text-gray-600">
                                                The key to more success is to have a lot of pillows. Put it this way, it took me
                                                twenty five years to get these plants, twenty five years of blood sweat and tears, and
                                                I&apos;m never giving up, I&apos;m just getting started. I&apos;m up to something. Fan
                                                luv.
                                            </Typography>
                                        </TimelineBody>
                                    </TimelineItem>
                                    <TimelineItem>
                                        <TimelineHeader>
                                            <TimelineIcon className="p-2 bg-white shadow-lg border-2 border-gray">
                                                <FaDollarSign className="h-4 w-4 text-secondary" />
                                            </TimelineIcon>
                                            <Typography variant="h5" color="blue-gray">
                                                Timeline Title Here.
                                            </Typography>
                                        </TimelineHeader>
                                        <TimelineBody>
                                            <Typography color="gary" className="font-normal text-gray-600">
                                                The key to more success is to have a lot of pillows. Put it this way, it took me
                                                twenty five years to get these plants, twenty five years of blood sweat and tears, and
                                                I&apos;m never giving up, I&apos;m just getting started. I&apos;m up to something. Fan
                                                luv.
                                            </Typography>
                                        </TimelineBody>
                                    </TimelineItem>
                                </Timeline>
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
            </div>
            <div>
                {options && (
                    <div>
                        {Object.keys(options).map((label) => (
                            <div key={label} className="flex gap-1">
                                <Typography className="mb-1 text-xs !font-medium !text-gray-600">
                                    {label}:
                                </Typography>
                                <Typography
                                    className="text-xs !font-bold"
                                    color="blue-gray"
                                >
                                    {options[label]}
                                </Typography>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Card>
    );
}

const CustomerData = [
    {
        icon: <FaNewspaper className="h-6 w-6 text-gray-900" />,
        title: "Burrito Vikings",
        detail: "Company",
        options: {
            "Contact": "Emma Roberts",
            "Email Address": "emma@mail.com",
            "VAT Number": "FRB1235476",
        },
    },
];

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
                <CardBody className="flex flex-col gap-4 !p-4">
                    {CustomerData.map((props, key) => (
                        <OrderList key={key} {...props} />
                    ))}
                </CardBody>
            </Card>
        </section>
    );
}

export default TrackingPesanan;