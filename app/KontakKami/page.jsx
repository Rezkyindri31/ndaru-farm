"use client"
import Navigation from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeaderTentangKami from "@/components/HeaderSection"
import Kontak from "@/app/KontakKami/components/KontakKami";
import Feature from "@/app/Beranda/components/Features";
import toast, { Toaster } from "react-hot-toast";


function KontakKami() {
    return (
        <div className="position-relative top-0">
            <div className="text-base justify-center text-center font-bold">
                <Toaster position="top-right" reverseOrder={false} />
            </div>
            <Navigation />
            <HeaderTentangKami />
            <Feature />
            <Kontak />
            <Footer />
        </div>

    );
}

export default KontakKami;