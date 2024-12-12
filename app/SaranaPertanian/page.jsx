"use client"
import Navigation from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeaderProduk from "@/components/HeaderSection"
import SaranaPertanianTemplate from "@/app/SaranaPertanian/components/SaranaPertanian";
import toast, { Toaster } from "react-hot-toast";

function Jasa() {
    return (
        <div className="position-relative top-0">
            <div className="text-base justify-center text-center font-bold">
                <Toaster position="top-right" reverseOrder={false} />
            </div>
            <Navigation />
            <HeaderProduk />
            <SaranaPertanianTemplate />
            <Footer />
        </div>
    );
}

export default Jasa;