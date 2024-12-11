"use client"
import Navigation from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeaderTentangKami from "@/components/HeaderSection"
import Konfirmasi from "@/app/KonfirmasiPesanan/components/Konfirmasi"


function KonfirmasiPesanan() {
    return (
        <div className="position-relative top-0">
            <Navigation />
            <HeaderTentangKami />
            <Konfirmasi />
            <Footer />
        </div>

    );
}

export default KonfirmasiPesanan;