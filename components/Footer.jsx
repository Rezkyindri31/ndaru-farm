import React from "react";
import { Typography } from "@/app/MTailwind";
import { FaChevronRight } from "react-icons/fa";
import useNavbarAktif from "@/hooks/Frontend/useNavbarAktif";

function Footer() {
    const { navbarAktif, handlenavbarAktif } = useNavbarAktif();

    return (
        <footer className="bg-darkgray text-white py-20  z-10 relative">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center lg:text-center">
                    <Typography variant="h3" className="font-semibold mb-3">
                        Tentang Kami
                    </Typography>
                    <hr className="border-t-2 border-primary w-full mx-auto md:mx-0 mb-4" />
                    <Typography className="text-base">
                        Ndaru Farm terletak di Batujajar, Kabupaten Bandung Barat. Menggunakan teknologi akuaponik yang menggabungkan akuakultur dan hidroponik, Ndaru Farm mengoptimalkan penggunaan air dan ruang untuk budidaya ikan dan tanaman hidroponik.
                    </Typography>
                </div>
                <div className="text-center lg:text-center">
                    <Typography variant="h3" className="font-semibold mb-3">
                        Kontak Kami
                    </Typography>
                    <hr className="border-t-2 border-primary w-full mx-auto md:mx-0 mb-4" />
                    <Typography className="text-base">
                        Jl. Terusan SMP, Batujajar Bar., Kabupaten Bandung Barat, Jawa Barat 40561
                    </Typography>
                    <Typography className="text-base mt-2">
                        0882-1599-3129
                    </Typography>
                    <Typography className="text-base mt-2">
                        chandrasatrian69@gmail.com
                    </Typography>
                </div>
                <div className="text-left">
                    <Typography variant="h3" className="font-semibold mb-3 text-center lg:text-center">
                        Halaman
                    </Typography>
                    <hr className="border-t-2 border-primary w-full mx-auto lg:mx-0 mb-4" />
                    <ul className="text-base space-y-2 text-left lg:ml-40">
                        <li
                            className={`flex items-center hover:text-secondary hover:translate-y-1 ${navbarAktif === "/Beranda" ? "text-primary" : ""}`}
                            onClick={() => handlenavbarAktif("/Beranda")}
                        >
                            <FaChevronRight className="mr-2 text-secondary" />
                            <span>Beranda</span>
                        </li>
                        <li
                            className={`flex items-center hover:text-secondary hover:translate-y-1 ${navbarAktif === "/Produk" ? "text-primary" : ""}`}
                            onClick={() => handlenavbarAktif("/Produk")}
                        >
                            <FaChevronRight className="mr-2 text-secondary" />
                            <span>Produk</span>
                        </li>
                        <li
                            className={`flex items-center hover:text-secondary hover:translate-y-1 ${navbarAktif === "/SaranaPertanian" ? "text-primary" : ""}`}
                            onClick={() => handlenavbarAktif("/SaranaPertanian")}
                        >
                            <FaChevronRight className="mr-2 text-secondary" />
                            <span>Sarana Pertanian</span>
                        </li>
                        <li
                            className={`flex items-center hover:text-secondary hover:translate-y-1 ${navbarAktif === "/KontakKami" ? "text-primary" : ""}`}
                            onClick={() => handlenavbarAktif("/KontakKami")}
                        >
                            <FaChevronRight className="mr-2 text-secondary" />
                            <span>Kontak Kami</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-primary mt-10 pt-4">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                    <Typography variant='h6' className="">
                        Copyrights © 2024 - <span className="font-semibold text-secondary mr-2">Bhineka Dev.</span> All Rights Reserved.
                    </Typography>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <i className="fab fa-instagram"></i>
                        <i className="fab fa-facebook"></i>
                        <i className="fas fa-paper-plane"></i>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
