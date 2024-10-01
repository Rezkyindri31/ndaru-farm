"use client"
import Navigation from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeaderTentangKami from "@/components/HeaderSection"
import Question from "@/app/KontakKami/components/Questioner";
import Feature from "@/app/Beranda/components/Features";


function KontakKami() {
    return (
        <div className="position-relative top-0">
            <Navigation />
            <HeaderTentangKami />
            <Feature />
            <Question />
            <Footer />
        </div>

    );
}

export default KontakKami;