"use client"
import Navigation from "@/components/Navbar";
import HeaderSetting from "@/components/HeaderSection"
import Setting from "@/app/ProfileSetting/components/ProfileSetting";
import Footer from "@/components/Footer";

function Produk() {
    return (
        <div className="position-relative top-0">
            <Navigation />
            <HeaderSetting />
            <Setting />
            <Footer />
        </div>
    );
}

export default Produk;