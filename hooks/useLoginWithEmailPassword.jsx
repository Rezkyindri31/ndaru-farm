import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebaseConfig';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const useLoginWithEmailPassword = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (email, password) => {
        const sanitizedEmail = email.trim();
        const sanitizedPassword = password.trim();

        console.log('Attempting to log in with:', { email: sanitizedEmail });

        if (!sanitizedEmail || !sanitizedPassword) {
            toast.error('Email dan Password harus diisi', { duration: 3000 });
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(sanitizedEmail)) {
            toast.error('Format email tidak valid', { duration: 3000 });
            return;
        }
        setIsLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, sanitizedEmail, sanitizedPassword);
            const user = userCredential.user;
            console.log('Login berhasil di Firebase Authentication:', user.email);
            router.push('/Beranda');
            toast.success(`Selamat Datang ${user.email}`, { duration: 3000 });

        } catch (error) {
            console.error('Error logging in:', error.message);
            handleLoginError(error.code);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLoginError = (errorCode) => {
        switch (errorCode) {
            case 'auth/invalid-credential':
                toast.error('Email atau password tidak valid', { duration: 3000 });
                break;
            case 'auth/user-not-found':
                toast.error('Email tidak terdaftar', { duration: 3000 });
                break;
            case 'auth/wrong-password':
                toast.error('Password salah', { duration: 3000 });
                break;
            default:
                toast.error('Terjadi kesalahan. Coba lagi.', { duration: 3000 });
                break;
        }
    };
    return {
        handleLogin,
        isLoading,
        setIsLoading,
    };
};

export default useLoginWithEmailPassword;
