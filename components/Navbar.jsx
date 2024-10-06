"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { usePath } from '@/components/PathContext';
import Image from "next/image";
import {
    Navbar,
    Collapse,
    Typography,
    Button,
    IconButton,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Popover,
    PopoverHandler,
    PopoverContent,
    Input,
} from "@/app/MTailwind";
import { FaHome, FaCartPlus, FaShoppingCart } from "react-icons/fa";
import { FaMagnifyingGlass, FaGear } from "react-icons/fa6";
import { MdHomeRepairService } from "react-icons/md";
import { RiContactsBook2Fill, RiToolsFill } from "react-icons/ri";
import useLogoutAccount from "@/hooks/useLogout";
import useAuth from '@/hooks/useVerifyLogin';
function Navigation() {
    const Logo = require("@/assets/img/logo.png");
    const router = useRouter();
    const { handleLogout } = useLogoutAccount();
    const user = useAuth();
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

    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 uppercase">
            <Typography
                as="li"
                className={`flex items-center gap-x-2 p-1 font-bold hover:translate-y-1 lg:text-xl ${activeNav === "/Beranda" ? "text-primary" : "text-white"
                    }`}
            >
                <FaHome />
                <a className="flex items-center" onClick={() => handleNavClick("/Beranda")}>
                    Beranda
                </a>
            </Typography>
            <Typography
                as="li"
                className={`flex items-center gap-x-2 p-1 font-bold hover:translate-y-1 lg:text-xl ${activeNav === "/Produk" ? "text-primary" : "text-white"
                    }`}
            >
                <FaCartPlus />
                <a className="flex items-center" onClick={() => handleNavClick("/Produk")}>
                    Produk
                </a>
            </Typography>
            <Typography
                as="li"
                className={`flex items-center gap-x-2 p-1 font-bold hover:translate-y-1 lg:text-xl ${activeNav === "/Jasa" ? "text-primary" : "text-white"
                    }`}
            >
                <MdHomeRepairService />
                <a className="flex items-center" onClick={() => handleNavClick("/Jasa")}>
                    Jasa
                </a>
            </Typography>
            <Typography
                as="li"
                className={`flex items-center gap-x-2 p-1 font-bold hover:translate-y-1 lg:text-xl ${activeNav === "/SaranaPertanian" ? "text-primary" : "text-white"
                    }`}
            >
                <RiToolsFill />
                <a className="flex items-center" onClick={() => handleNavClick("/SaranaPertanian")}>
                    Sarana Pertanian
                </a>
            </Typography>
            <Typography
                as="li"
                className={`flex items-center gap-x-2 p-1 font-bold hover:translate-y-1 lg:text-xl ${activeNav === "/KontakKami" ? "text-primary" : "text-white"
                    }`}
            >
                <RiContactsBook2Fill />
                <a className="flex items-center" onClick={() => handleNavClick("/KontakKami")}>
                    Kontak Kami
                </a>
            </Typography>
        </ul>
    );

    return (
        <div>
            <Navbar
                className={`mx-auto max-w-screen-2xl px-4 py-2 lg:px-3 lg:py-4 lg:fixed lg:left-1/2 lg:transform lg:-translate-x-1/2 z-20 absolute ${navbarBg} border-none shadow-none backdrop-filter-none transition-all duration-300`}
            >
                <div className="container mx-auto flex items-center justify-between text-white">
                    <Typography
                        as="a"
                        href="#"
                        className="mr-4 cursor-pointer py-1.5 text-white flex items-center gap-x-2 uppercase font-bold"
                        onClick={() => handleNavClick("/Beranda")}
                    >
                        <Image src={Logo} alt="" className="w-14 lg:w-20 h-14 lg:h-20" />
                        E-Mart Ndaru Farm
                    </Typography>
                    <div className="hidden lg:block">{navList}</div>
                    {user ? (
                        <div>
                            <div className="hidden sm:flex items-center gap-x-5">
                                <Popover>
                                    <PopoverHandler>
                                        <a className="font-bold text-white hover:text-primary">
                                            <FaMagnifyingGlass className="w-5 h-5" />
                                        </a>
                                    </PopoverHandler>
                                    <PopoverContent className="absolute z-50">
                                        <div className="flex w-72 flex-col gap-6">
                                            <Input
                                                variant="standard"
                                                label="Pencarian Kata Kunci"
                                                placeholder="Cari Disini"
                                                color="green"
                                                className="text-blue-gray-500"
                                            />
                                        </div>
                                    </PopoverContent>
                                </Popover>
                                <a className="font-bold text-white hover:text-primary" onClick={() => handleNavClick("/Pemesanan")}>
                                    <FaShoppingCart className="w-5 h-5" />
                                </a>
                                <Menu
                                    animate={{
                                        mount: { y: 5 },
                                        unmount: { y: 25 },
                                    }}
                                >
                                    <MenuHandler>
                                        <a className="font-bold text-white hover:text-primary">
                                            <FaGear className="w-5 h-5" />
                                        </a>
                                    </MenuHandler>
                                    <MenuList className="text-white text-base bg-primary border-2 border-white uppercase">
                                        <MenuItem onClick={() => handleNavClick("/ProfileSetting")}>Profile Saya</MenuItem>
                                        <MenuItem onClick={() => handleNavClick("/TrackingPesanan")}>Pesanan Saya</MenuItem>
                                        <hr className="my-1" />
                                        <MenuItem onClick={handleLogout}>Keluar</MenuItem>
                                    </MenuList>
                                </Menu>
                            </div>
                        </div>
                    ) : (
                        <div className="hidden sm:flex items-center gap-x-5">
                            <Button className="border-2 border-white uppercase font-bold bg-secondary rounded-full" onClick={() => handleNavClick("/Login")}>
                                Login
                            </Button>
                        </div>
                    )}
                    <IconButton
                        variant="text"
                        className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                        ripple={false}
                        onClick={() => setOpenNav(!openNav)}
                    >
                        {openNav ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </IconButton>
                </div>
                <Collapse open={openNav}>
                    <div className="container mx-auto hidden">
                        {navList}
                        user ? (
                        <div className="flex justify-center items-center gap-x-20">
                            <Popover placement="bottom">
                                <PopoverHandler>
                                    <a className="font-bold text-white">
                                        <FaMagnifyingGlass className="w-5 h-5" />
                                    </a>
                                </PopoverHandler>
                                <PopoverContent className="absolute z-50 top-96">
                                    <div className="flex w-80 flex-col gap-6">
                                        <Input
                                            variant="standard"
                                            label="Pencarian Kata Kunci"
                                            placeholder="Cari Disini"
                                            color="green"
                                            className="text-blue-gray-500"
                                        />
                                    </div>
                                </PopoverContent>
                            </Popover>
                            <a className="font-bold text-white hover:text-primary" onClick={() => handleNavClick("/Pemesanan")}>
                                <FaShoppingCart className="w-5 h-5" />
                            </a>
                            <Menu
                                animate={{
                                    mount: { y: 30 },
                                    unmount: { y: 50 },
                                }}
                            >
                                <MenuHandler>
                                    <a className="font-bold text-white">
                                        <FaGear className="w-5 h-5" />
                                    </a>
                                </MenuHandler>
                                <MenuList className="text-white text-base bg-primary border-2 border-white uppercase">
                                    <MenuItem onClick={() => handleNavClick("/ProfileSetting")}>Profile Saya</MenuItem>
                                    <MenuItem onClick={() => handleNavClick("/TrackingPesanan")}>Pesanan Saya</MenuItem>
                                    <hr className="my-1" />
                                    <MenuItem onClick={handleLogout}>Keluar</MenuItem>
                                </MenuList>
                            </Menu>
                        </div>
                        ) : (
                        <div className="flex justify-center items-center gap-x-20">
                            <Button className="button-effect" onClick={() => handleNavClick("/Login")}>
                                Login
                            </Button>
                        </div>
                        )
                    </div>
                </Collapse>
            </Navbar >
        </div >
    );
}

export default Navigation;
