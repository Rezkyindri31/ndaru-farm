"use client"
import Navigation from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeaderProduk from "@/components/HeaderSection"
import TampilanProduk from "@/app/Produk/components/Produk";
import toast, { Toaster } from "react-hot-toast";

function Produk() {
    return (
        <div className="position-relative top-0">
            <div className="text-base justify-center text-center font-bold">
                <Toaster position="top-right" reverseOrder={false} />
            </div>
            <Navigation />
            <HeaderProduk />
            <TampilanProduk />
            <Footer />
        </div>
    );
}

export default Produk;