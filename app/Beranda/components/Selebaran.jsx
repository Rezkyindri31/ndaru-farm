"use client";
import FlyerJasa from "@/components/Jasa";
import FlyerProduk from "@/components/Produk";
import { useEffect, useRef } from "react";
import { initializeAos } from "@/config/aosInit";

function Selebaran() {
    const flyerProdukRef = useRef(null);
    const flyerJasakRef = useRef(null);

    useEffect(() => {
        if (flyerProdukRef.current && flyerJasakRef.current) {
            initializeAos();
        }
    }, [flyerProdukRef] || [flyerJasakRef]);

    return (
        <div className="py-4 relative z-10 overflow-x-hidden">
            <div ref={flyerProdukRef} data-aos="fade-right" data-aos-duration="1000" data-aos-easing="ease-in-sine">
                <FlyerProduk />
            </div>
            <div ref={flyerJasakRef} data-aos="fade-left" data-aos-duration="1000" data-aos-easing="ease-in-sine">
                <FlyerJasa />
            </div>
        </div>
    );
}

export default Selebaran;
