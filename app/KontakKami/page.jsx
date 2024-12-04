"use client"
import Navigation from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeaderTentangKami from "@/components/HeaderSection"
import Kontak from "@/app/KontakKami/components/KontakKami";
import Feature from "@/app/Beranda/components/Features";


function KontakKami() {
    return (
        <div className="position-relative top-0">
            <Navigation />
            <HeaderTentangKami />
            <Feature />
            <Kontak />
            <Footer />
        </div>

    );
}

export default KontakKami;