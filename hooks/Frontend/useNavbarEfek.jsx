import { useState, useEffect } from "react";

const useNavbar = () => {
    const [navbarBg, setNavbarBg] = useState("bg-secondary");
    const [openPengaturan, setOpenPengaturan] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setNavbarBg("bg-secondary");
            } else {
                setNavbarBg("bg-secondary");
            }
        };

        const handleResize = () => {
            if (window.innerWidth >= 960) {
                setOpenPengaturan(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return { navbarBg, openPengaturan, setOpenPengaturan };
};

export default useNavbar;
