"use client";

import React from 'react';
import { Button } from '@/app/MTailwind';
import Image from 'next/image';
import { Toaster } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import useLoginWithGoogle from '@/hooks/Backend/useMasukDenganGoogle';
import useNavbarAktif from '@/hooks/Frontend/useNavbarAktif';

function LoginForm() {
    const LoginIcon = require('@/assets/img/Icon/Login.png');
    const { navbarAktif, handlenavbarAktif } = useNavbarAktif();
    const handleNavClick = (path) => {
        handlenavbarAktif(path);
    };
    const { masukDenganGoogle } = useLoginWithGoogle();

    return (
        <div className="flex h-screen items-center justify-center bg-[#f6edd9]">
            <Toaster position="top-right" reverseOrder={false} />
            <div className="bg-white border-2 border-[#f6fbf2] shadow-2xl rounded-lg flex overflow-hidden w-full max-w-4xl">
                <>
                    <div className="w-1/2 p-8">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Silahkan Masuk</h2>
                        <Button
                            onClick={masukDenganGoogle}
                            className="w-full mb-4 !border-2 !border-secondary text-black text-sm flex items-center justify-center space-x-2"
                        >
                            <FcGoogle />
                            <span>Continue with Google</span>
                        </Button>
                    </div>
                    <div className="w-1/2 bg-secondary text-white flex items-center justify-center p-8">
                        <div className="flex flex-col items-center">
                            <h3 className="text-2xl font-semibold mb-2">
                                Penasaran Bagaimana Kami?
                            </h3>
                            <p className="mb-4">
                                Kami punya sesuatu yang baru dan segar. Silahkan kunjungi beranda kami.
                            </p>
                            <Button
                                color="white"
                                variant="outlined"
                                onClick={() => handleNavClick("/Beranda")}
                            >
                                Cek Beranda
                            </Button>
                            <Image
                                className="w-80 h-80 mt-4"
                                src={LoginIcon}
                                alt="Login Icon"
                                priority
                            />
                        </div>
                    </div>
                </>
            </div>
        </div>
    );
}

export default LoginForm;
