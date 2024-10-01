"use client"
import Navigation from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeaderTrackingPesanan from "@/components/HeaderSection"
import TrackingPesanan from "@/app/TrackingPesanan/components/Tracking";


function Pemesanan() {
    return (
        <div className="position-relative top-0">
            <Navigation />
            <HeaderTrackingPesanan />
            <TrackingPesanan />
            <Footer />
        </div>

    );
}

export default Pemesanan;