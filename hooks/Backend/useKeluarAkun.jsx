import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebaseConfig";
import toast from "react-hot-toast";

const useKeluarAkun = () => {
    const pengarah = useRouter();
    const handleLogout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem("ID");
            toast.success("Selamat tinggal dan Sampai Bertemu Kembali.");
            pengarah.push("/Login");
        } catch (err) {
            toast.error("Error logging out.");
        }
    };

    return { handleLogout };
};

export default useKeluarAkun;
