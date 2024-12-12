"use client"
import Navigation from "@/components/Navbar";
import Footer from "@/components/Footer";
import Carousel from "@/app/Beranda/components/Carousel";
import Feature from "@/app/Beranda/components/Features";
import Profiles from "@/app/Beranda/components/Profile";
import { Toaster } from 'react-hot-toast';

function Beranda() {
    return (
        <div className="position-relative top-0 overflow-x-hidden">
            <div className="text-base justify-center text-center font-bold">
                <Toaster position="top-right" reverseOrder={false} />
            </div>
            <Navigation />
            <Carousel />
            <Feature />
            <Profiles />
            <Footer />
        </div>
    );
}

export default Beranda;