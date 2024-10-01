import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { useRouter } from "next/navigation";

const useLoginWithGoogle = () => {
    const router = useRouter();
    const handleLoginWithGoogle = async () => {
        const googleProvider = new GoogleAuthProvider();
        signInWithPopup(auth, googleProvider).then(async (result) => {
            console.log('User logged in with Google successfully');
            console.log(result);
            router.push('/Beranda');
        });
    }

    return {
        handleLoginWithGoogle
    };
};
export default useLoginWithGoogle;


