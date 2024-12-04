"use client"
import Navigation from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeaderJasa from "@/components/HeaderSection"
// import TampilanJasa from "@/app/Jasa/components/Jasa";

function Jasa() {
    return (
        <div className="position-relative top-0">
            <Navigation />
            <HeaderJasa />
            {/* <TampilanJasa /> */}
            <Footer />
        </div>
    );
}

export default Jasa;