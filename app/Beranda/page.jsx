"use client"
import Navigation from "@/components/Navbar";
import Footer from "@/components/Footer";
import Carousel from "@/app/Beranda/components/Carousel";
import Feature from "@/app/Beranda/components/Features";
import Flyer from "@/app/Beranda/components/Selebaran";
import Promosi from "@/app/Beranda/components/Promo";
import Feedback from "@/app/Beranda/components/Komentar";
import Profiles from "@/app/Beranda/components/Profile";
import News from "@/components/Berita";
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
            <Flyer />
            <div ref={PromosiRef} data-aos="fade-right" data-aos-duration="1000" data-aos-easing="ease-in-sine">
                <Promosi />
            </div>
            <div ref={FeedbackRef} data-aos="fade-left" data-aos-duration="1000" data-aos-easing="ease-in-sine" >
                <Feedback />
            </div>
            <Profiles />
            <News />
            <Footer />
        </div>
    );
}

export default Beranda;