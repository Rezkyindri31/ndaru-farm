import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebaseConfig';
import { useRouter } from "next/navigation";

const useLogout = () => {
    const router = useRouter();
    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log('User logged out successfully');
            router.push('/Login');
        } catch (err) {
            console.error(err);
        }
    };

    return { handleLogout };
};

export default useLogout;