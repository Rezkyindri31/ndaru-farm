import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebaseConfig';
import { useRouter } from "next/navigation";

const useLoginWithGoogle = () => {
    const router = useRouter();

    const handleLoginWithGoogle = async () => {
        const googleProvider = new GoogleAuthProvider();
        googleProvider.setCustomParameters({
            prompt: 'select_account'
        });

        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log('User logged in with Google successfully');
            console.log(result);
            router.push('/Beranda');
        } catch (error) {
            console.error('Error logging in with Google:', error);
        }
    }

    return {
        handleLoginWithGoogle
    };
};

export default useLoginWithGoogle;
