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
                where("Email", "==", email),
                where("Password", "==", password)
            );
            const userSnap = await getDocs(userRef);

            if (userSnap.empty) {
                throw new Error('Email atau Password salah');
            }

            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('User logged in successfully');
            const user = userCredential.user;

            router.push('/Beranda');
            toast.success(`Selamat Datang ${user.email}`, {
                duration: 3000,
            });

        } catch (error) {
            console.error('Error logging in:', error.message);
            toast.error('Email tidak terdaftar', {
                duration: 3000,
            });
        } finally {
            setSedangMemuatLogin(false);
        }
    }

    return {
        handleLogin, sedangMemuatLogin, setSedangMemuatLogin
    };
};
export default useLoginWithEmailPassword;


