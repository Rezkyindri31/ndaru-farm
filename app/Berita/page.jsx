"use client"
import Navigation from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeaderBerita from "@/components/HeaderSection"
import BeritaTemplate from "@/components/Berita";
function Berita() {
    return (
        <div className="position-relative top-0">
            <Navigation />
            <HeaderBerita />
            <BeritaTemplate />
            <Footer />
        </div>
    );
}

export default Berita;