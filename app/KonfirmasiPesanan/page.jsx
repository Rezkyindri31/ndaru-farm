"use client"
import Navigation from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeaderTentangKami from "@/components/HeaderSection"
// import Konfirmasi from "@/app/KonfirmasiPesanan/components/Konfirmasi"
import Tester from "@/app/KonfirmasiPesanan/components/Tester"


function KonfirmasiPesanan() {
    return (
        <div className="position-relative top-0">
            <Navigation />
            <HeaderTentangKami />
            {/* <Konfirmasi /> */}
            <Tester />
            <Footer />
        </div>

    );
}

export default KonfirmasiPesanan;