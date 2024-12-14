"use client"
import Navigation from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeaderTrackingPesanan from "@/components/HeaderSection"
import TrackingPesanan from "@/app/TrackingPesanan/components/Tracking";
import toast, { Toaster } from "react-hot-toast";


function Pemesanan() {
    return (
        <div className="position-relative top-0">
            <div className="text-base justify-center text-center font-bold">
                <Toaster position="top-right" reverseOrder={false} />
            </div>
            <Navigation />
            <HeaderTrackingPesanan />
            <TrackingPesanan />
            <Footer />
        </div>

    );
}

export default Pemesanan;