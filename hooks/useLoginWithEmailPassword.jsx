import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebaseConfig';
import { getDocs, query, collection, where } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';

const useLoginWithEmailPassword = () => {
    const router = useRouter();
    const [sedangMemuatLogin, setSedangMemuatLogin] = useState(false);

    const handleLogin = async (email, password) => {
        const sanitizedEmail = email.trim();
        const sanitizedPassword = password.trim();

        console.log('Attempting to log in with:', { email: sanitizedEmail, password: sanitizedPassword });

        if (!sanitizedEmail || !sanitizedPassword) {
            toast.error('Email dan Password harus diisi', {
                duration: 3000,
            });
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(sanitizedEmail)) {
            toast.error('Format email tidak valid', {
                duration: 3000,
            });
            return;
        }

        setSedangMemuatLogin(true);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, sanitizedEmail, sanitizedPassword);
            const user = userCredential.user;
            console.log('Login berhasil di Firebase Authentication:', user.email);

            router.push('/Beranda');
            toast.success(`Selamat Datang ${user.email}`, {
                duration: 3000,
            });

        } catch (error) {
            console.error('Error logging in:', error.message);
            console.log('Error code:', error.code);
            if (error.code === 'auth/invalid-credential') {
                toast.error('Email atau password tidak valid', {
                    duration: 3000,
                });
            } else if (error.code === 'auth/user-not-found') {
                toast.error('Email tidak terdaftar', {
                    duration: 3000,
                });
            } else if (error.code === 'auth/wrong-password') {
                toast.error('Password salah', {
                    duration: 3000,
                });
            } else {
                toast.error('Terjadi kesalahan. Coba lagi.', {
                    duration: 3000,
                });
            }
        } finally {
            setSedangMemuatLogin(false);
        }
    };




    return {
        handleLogin, sedangMemuatLogin, setSedangMemuatLogin
    };
};
export default useLoginWithEmailPassword;


