"use client"
import Navigation from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeaderProduk from "@/components/HeaderSection"
import JasaTemplate from "@/components/Jasa";

function Jasa() {
    return (
        <div className="position-relative top-0">
            <Navigation />
            <HeaderProduk />
            <JasaTemplate />
            <Footer />
        </div>
    );
}

export default Jasa;