"use client"
import Navigation from "@/components/Navbar";
import Footer from "@/components/Footer";
import Carousel from "@/app/Beranda/components/Carousel";
import Feature from "@/app/Beranda/components/Features";
import Flyer from "@/app/Beranda/components/Selebaran";
import Profiles from "@/app/Beranda/components/Profile";
import { useEffect, useRef } from "react";
import { initializeAos } from "@/components/aosInit";
import { Toaster } from 'react-hot-toast';

function Beranda() {
    const PromosiRef = useRef(null);
    const FeedbackRef = useRef(null);

    useEffect(() => {
        if (PromosiRef.current && FeedbackRef.current) {
            initializeAos();
        }
    }, [PromosiRef] || [FeedbackRef]);

    return (
        <div className="position-relative top-0 overflow-x-hidden">
            <div className="w-full text-base justify-center text-center font-bold" >
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div>
            <Navigation />
            <Carousel />
            <Feature />
            {/* <Flyer /> */}
            <Profiles />
            <Footer />
        </div>
    );
}

export default Beranda;