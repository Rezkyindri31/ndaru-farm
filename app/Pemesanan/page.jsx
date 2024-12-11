"use client"
import Navigation from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeaderTentangKami from "@/components/HeaderSection"
import PemesananTable from "@/app/Pemesanan/components/Pemesanan";

function Pemesanan() {
    return (
        <div className="position-relative top-0">
            <Navigation />
            <HeaderTentangKami />
            <PemesananTable />
            <Footer />
        </div>

    );
}

export default Pemesanan;