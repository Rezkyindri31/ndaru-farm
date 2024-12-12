"use client"
import Navigation from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeaderTentangKami from "@/components/HeaderSection"
import Konfirmasi from "@/app/KonfirmasiPesanan/components/Konfirmasi"
import toast, { Toaster } from "react-hot-toast";


function KonfirmasiPesanan() {
    return (
        <div className="position-relative top-0">
            <div className="text-base justify-center text-center font-bold">
                <Toaster position="top-right" reverseOrder={false} />
            </div>
            <Navigation />
            <HeaderTentangKami />
            <Konfirmasi />
            <Footer />
        </div>

    );
}

export default KonfirmasiPesanan;