"use client"
import Navigation from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeaderProduk from "@/components/HeaderSection"
import TampilanProduk from "@/app/Produk/components/Produk";

function Produk() {
    return (
        <div className="position-relative top-0">
            <Navigation />
            <HeaderProduk />
            <TampilanProduk />
            <Footer />
        </div>
    );
}

export default Produk;