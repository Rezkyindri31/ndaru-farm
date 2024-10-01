"use client"
import Navigation from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeaderTentangKami from "@/components/HeaderSection"
import Profiles from "@/app/Beranda/components/Profile";
import Feature from "@/app/Beranda/components/Features";


function Produk() {
    return (
        <div className="position-relative top-0">
            <Navigation />
            <HeaderTentangKami />
            <Profiles />
            <div className="text-center mx-auto lg:space-y-4 px-6 lg:px-12 bg-gray">
                <h1 className="text-4xl font-semibold">
                    Kenapa <span className="font-black text-secondary">Kami?</span>
                </h1>
            </div>
            <Feature />
            <Footer />
        </div>

    );
}

export default Produk;