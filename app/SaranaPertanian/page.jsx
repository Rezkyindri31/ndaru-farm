"use client"
import Navigation from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeaderProduk from "@/components/HeaderSection"
import SaranaPertanianTemplate from "@/components/SaranaPertanian";

function Jasa() {
    return (
        <div className="position-relative top-0">
            <Navigation />
            <HeaderProduk />
            <SaranaPertanianTemplate />
            <Footer />
        </div>
    );
}

export default Jasa;