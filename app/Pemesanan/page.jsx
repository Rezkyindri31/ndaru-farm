"use client"
import Navigation from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeaderTentangKami from "@/components/HeaderSection"
import PemesananTable from "@/app/Pemesanan/components/Pemesanan";
import toast, { Toaster } from "react-hot-toast";

function Pemesanan() {
    return (
        <div className="position-relative top-0">
            <div className="text-base justify-center text-center font-bold">
                <Toaster position="top-right" reverseOrder={false} />
            </div>
            <Navigation />
            <HeaderTentangKami />
            <PemesananTable />
            <Footer />
        </div>

    );
}

export default Pemesanan;