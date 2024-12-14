import { useRouter } from "next/navigation";
import React from "react";

const useNavbarAktif = (initialPath = "/Beranda") => {
    const router = useRouter();
    const [navbarAktif, setnavbarAktif] = React.useState(initialPath);

    React.useEffect(() => {
        const handlePathnameUpdate = () => {
            const currentPath = window.location.pathname;
            setnavbarAktif(currentPath);
        };
        handlePathnameUpdate();
        window.addEventListener("popstate", handlePathnameUpdate);
        return () => {
            window.removeEventListener("popstate", handlePathnameUpdate);
        };
    }, []);

    const handlenavbarAktif = (path) => {
        setnavbarAktif(path);
        router.push(path);
    };

    return { navbarAktif, handlenavbarAktif };
};

export default useNavbarAktif;
