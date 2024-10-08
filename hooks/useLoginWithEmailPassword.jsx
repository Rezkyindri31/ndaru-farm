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
        console.log('Attempting to log in with:', { email, password });
        if (!email || !password) {
            toast.error('Email dan Password harus diisi', {
                duration: 3000,
            });
            return;
        }
        setSedangMemuatLogin(true);
        try {
            const userRef = query(
                collection(db, "pengguna"),
                where("Email", "==", email)
            );
            const userSnap = await getDocs(userRef);

            if (userSnap.empty) {
                console.log('Email tidak ditemukan di Firestore');
                throw new Error('auth/user-not-found');
            } else {
                console.log('Email ditemukan di Firestore');
            }

            // Firebase Authentication login
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('Login berhasil di Firebase Authentication');

            const user = userCredential.user;

            // Redirect ke halaman Beranda
            router.push('/Beranda');
            toast.success(`Selamat Datang ${user.email}`, {
                duration: 3000,
            });

        } catch (error) {
            console.error('Error logging in:', error.message);

            // Logging untuk error code dari Firebase
            console.log('Error code:', error.code);

            if (error.message === 'auth/user-not-found') {
                console.log('Email tidak terdaftar.');
                toast.error('Email tidak terdaftar', {
                    duration: 3000,
                });
            } else if (error.code === 'auth/wrong-password') {
                console.log('Password salah.');
                toast.error('Password salah', {
                    duration: 3000,
                });
            } else {
                console.log('Error tidak diketahui:', error.message);
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


