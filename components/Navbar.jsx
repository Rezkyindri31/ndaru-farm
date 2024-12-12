"use client";
import React from "react";
import { useRouter } from "next/navigation";
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
} from "@/app/MTailwind";
import { FaHome, FaCartPlus, FaShoppingCart } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { MdHomeRepairService } from "react-icons/md";
import { RiContactsBook2Fill, RiToolsFill } from "react-icons/ri";
import useVerifikasiLogin from '@/hooks/Backend/useVerifikasiLogin';
import useNavbarEfek from "@/hooks/Frontend/useNavbarEfek";
import useNavbarAktif from "@/hooks/Frontend/useNavbarAktif";
import useKeluarAkun from "@/hooks/Backend/useKeluarAkun";

function Navigation() {
    const Logo = require("@/assets/img/logo.png");
    const { isLoggedIn, loading } = useVerifikasiLogin();
    const { handleLogout } = useKeluarAkun();
    const { navbarBg } = useNavbarEfek();
    const { navbarAktif, handlenavbarAktif } = useNavbarAktif();

    const [openNav, setOpenNav] = React.useState(false);

    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 uppercase">
            <Typography
                as="li"
                className={`flex items-center gap-x-2 p-1 font-bold hover:translate-y-1 lg:text-xl cursor-pointer ${navbarAktif === "/Beranda" ? "text-primary" : "text-white"
                    }`}
                onClick={() => handlenavbarAktif("/Beranda")}
            >
                <FaHome />
                Beranda
            </Typography>
            <Typography
                as="li"
                className={`flex items-center gap-x-2 p-1 font-bold hover:translate-y-1 lg:text-xl cursor-pointer ${navbarAktif === "/Produk" ? "text-primary" : "text-white"
                    }`}
                onClick={() => handlenavbarAktif("/Produk")}
            >
                <FaCartPlus />
                Produk
            </Typography>
            <Typography
                as="li"
                className={`flex items-center gap-x-2 p-1 font-bold hover:translate-y-1 lg:text-xl cursor-pointer ${navbarAktif === "/SaranaPertanian" ? "text-primary" : "text-white"
                    }`}
                onClick={() => handlenavbarAktif("/SaranaPertanian")}
            >
                <RiToolsFill />
                Sarana Pertanian
            </Typography>
            <Typography
                as="li"
                className={`flex items-center gap-x-2 p-1 font-bold hover:translate-y-1 lg:text-xl cursor-pointer ${navbarAktif === "/KontakKami" ? "text-primary" : "text-white"
                    }`}
                onClick={() => handlenavbarAktif("/KontakKami")}
            >
                <RiContactsBook2Fill />
                Kontak Kami
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
                        onClick={() => handlenavbarAktif("/Beranda")}
                    >
                        <Image src={Logo} alt="" className="w-14 lg:w-20 h-14 lg:h-20" priority />
                        E-Mart Ndaru Farm
                    </Typography>
                    <div className="hidden lg:block">{navList}</div>
                    <div>
                        {/* Conditionally render based on login status */}
                        {loading ? (
                            <p></p>
                        ) : isLoggedIn ? (
                            <div className="hidden sm:flex items-center gap-x-5">
                                <a
                                    className="font-bold text-white hover:text-primary"
                                    onClick={() => handlenavbarAktif("/Pemesanan")}
                                >
                                    <FaShoppingCart
                                        className={`w-5 h-5 cursor-pointer ${navbarAktif === "/Pemesanan" || navbarAktif === "/KonfirmasiPesanan"
                                            ? "text-primary"
                                            : "text-white"
                                            }`}
                                    />
                                </a>
                                <Menu
                                    animate={{
                                        mount: { y: 5 },
                                        unmount: { y: 25 },
                                    }}
                                >
                                    <MenuHandler>
                                        <a>
                                            <FaGear
                                                className={`w-5 h-5 font-bold cursor-pointer hover:text-primary ${["/ProfileSetting", "/TrackingPesanan"].includes(navbarAktif)
                                                    ? "text-primary"
                                                    : "text-white"
                                                    }`}
                                            />
                                        </a>
                                    </MenuHandler>
                                    <MenuList className="text-white text-base bg-primary border-2 border-white uppercase">
                                        <MenuItem
                                            className={`font-bold text-white hover:text-primary ${navbarAktif === "/ProfileSetting" ? "text-primary bg-white" : "text-white"
                                                }`}
                                            onClick={() => handlenavbarAktif("/ProfileSetting")}>
                                            Profile Saya
                                        </MenuItem>
                                        <MenuItem
                                            className={`font-bold text-white hover:text-primary ${navbarAktif === "/TrackingPesanan" ? "text-primary bg-white" : "text-white"
                                                }`}
                                            onClick={() => handlenavbarAktif("/TrackingPesanan")}>
                                            Pesanan Saya
                                        </MenuItem>
                                        <hr className="my-1" />
                                        <MenuItem onClick={handleLogout}>Keluar</MenuItem>
                                    </MenuList>
                                </Menu>
                            </div>
                        ) : (
                            <div className="hidden sm:flex items-center gap-x-5">
                                <Button
                                    className="border-2 border-white uppercase font-bold bg-secondary rounded-full"
                                    onClick={() => handlenavbarAktif("/Login")}
                                >
                                    Login
                                </Button>
                            </div>
                        )}
                    </div>
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
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </IconButton>
                </div>
                <Collapse open={openNav}>
                    <div className="container mx-auto">{navList}</div>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default Navigation;
