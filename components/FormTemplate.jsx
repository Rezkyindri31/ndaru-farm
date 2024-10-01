"use client";

import React, { useState } from 'react';
import { Input, Button, Checkbox } from '@/app/MTailwind';
import Image from 'next/image';
import { usePath } from '@/components/PathContext';
import { Toaster } from 'react-hot-toast';
import useValidationForm from '@/hooks/useValidationForm';
import useLoginWithGoogle from '@/hooks/useLoginWithGoogle';
import useLoginWithEmailPassword from '@/hooks/useLoginWithEmailPassword';
import useStateForm from '@/hooks/useStateForm';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from "next/navigation";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import RegisterWithEmailPassword from '@/hooks/useRegisterWithEmailPassword';

function AuthPage() {
    const handleNavClick = (path) => {
        console.log("Navigating to:", path);
        setActiveNav(path);
        router.push(path);
    };
    const [activeNav, setActiveNav] = React.useState("/Beranda");
    const router = useRouter();
    const { currentPath, loading } = usePath();

    const LoginIcon = require("@/assets/img/Icon/Login.png");
    const ForgotPasswordIcon = require("@/assets/img/Icon/ForgotPassword.png");

    const { email, setEmail, password, setPassword } = useStateForm();

    const { isPasswordVisibleLogin, togglePasswordVisibilityLogin } = useValidationForm();

    if (loading) {
        return null;
    }
    const { handleLoginWithGoogle } = useLoginWithGoogle();
    const { handleLogin } = useLoginWithEmailPassword();
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        await handleLogin(email, password);
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gradient-to-r from-secondary to-primary">
            <div className="text-base justify-center text-center font-bold" >
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div>
            <div className="bg-white shadow-lg rounded-lg flex overflow-hidden w-full max-w-4xl">
                {/* Login */}
                {currentPath === '/Login' && (
                    <div className="w-1/2 p-8">
                        <div className='page-login'>
                            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Silahkan Masuk</h2>

                            <Button
                                onClick={handleLoginWithGoogle} className="w-full mb-4 !border-2 !border-secondary text-black text-sm flex items-center justify-center space-x-2"
                            >
                                <FcGoogle />
                                <span>Log in with Google</span>
                            </Button>

                            <p className="text-center text-black font-bold mb-6">OR LOGIN WITH EMAIL</p>
                            <form onSubmit={handleLoginSubmit}>
                                <div className="mb-4">
                                    <Input
                                        className="!border-2 !border-secondary bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        labelProps={{
                                            className: "hidden",
                                        }}
                                        required
                                    />

                                </div>
                                <div className="mb-4 relative">
                                    <Input
                                        className="!border-2 !border-secondary bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                        type={isPasswordVisibleLogin ? "text" : "password"}
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        labelProps={{
                                            className: "hidden",
                                        }}
                                        required
                                    />

                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibilityLogin}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                                        aria-label={isPasswordVisibleLogin ? "Sembunyikan Password" : "Tampilkan Password"}
                                    >
                                        {isPasswordVisibleLogin ? (
                                            <span role="img" aria-label="Hide password"><IoMdEyeOff /></span>
                                        ) : (
                                            <span role="img" aria-label="Show password"><IoMdEye /></span>
                                        )}
                                    </button>
                                </div>
                                <div className="flex justify-between items-center mb-6">
                                    <Checkbox id="remember" label="Keep me logged in" color="blue" />
                                    <a href="/LupaPassword" className="text-blue-500 text-sm">Lupa Password?</a>
                                </div>
                                <Button className="button-effect w-full my-5" type='submit'>
                                    Log in
                                </Button>
                            </form>
                            <p className="mt-4 text-center text-gray-500">Tidak Punya Akun? <a href="/Signup" className="text-blue-500">Daftar</a></p>
                        </div>
                    </div>
                )}
                {currentPath === '/Login' && (
                    <div className="w-1/2 bg-secondary text-white flex items-center justify-center py-8">
                        <div className="p-1 flex flex-col items-center justify-center">
                            <div className="text-end px-4">
                                <h3 className="text-2xl font-semibold mb-2">Penasaran Bagaimana Kami</h3>
                                <p className="mb-4">
                                    Kami punya sesuatu yang baru dan segar. Silahkan kunjungi beranda kami
                                </p>
                                <Button
                                    className="mt-4"
                                    color="white"
                                    variant="outlined"
                                    onClick={() => handleNavClick("/Beranda")}
                                >
                                    Lihat Sekarang
                                </Button>
                            </div>
                            <Image className="w-80 h-80 mt-4" src={LoginIcon} />
                        </div>
                    </div>
                )}
                {/* Signup */}
                {currentPath === '/Signup' && (
                    <div className="w-full p-5">
                        <div className='page-signup'>
                            <RegisterWithEmailPassword />
                        </div>
                    </div>
                )}
                {/* Lupa Password */}
                {currentPath === '/LupaPassword' && (
                    <div className="w-1/2 p-8">
                        <div className='page-login'>
                            <h2 className="text-3xl font-semibold text-gray-800 mb-12 ">Lupa Password</h2>
                            <p className="text-center text-black font-bold mb-6">Masukkan Alamat Email Anda dibawah ini</p>
                            <form>
                                <div className="mb-4">
                                    <Input
                                        type="email" label="Email" color="blue"
                                        placeholder="Email" required />
                                </div>
                                <Button className="w-full" color="green" type="submit">
                                    Submit
                                </Button>
                            </form>
                            <p className="mt-4 text-center text-gray-500">Sudah punya akun? <a href="/Login" className="text-blue-500">Login</a></p>
                        </div>
                    </div>
                )}

                {currentPath === '/LupaPassword' && (
                    <div className="w-1/2 bg-secondary text-white flex items-center justify-center py-8">
                        <div className="p-1 flex flex-col items-center justify-center">
                            <div className="text-end px-4">
                                <h3 className="text-2xl font-semibold mb-2">Penasaran Bagaimana Kami</h3>
                                <p className="mb-4">
                                    Kami punya sesuatu yang baru dan segar. Silahkan kunjungi beranda kami
                                </p>
                                <Button
                                    className="mt-4"
                                    color="white"
                                    variant="outlined"
                                    onClick={() => handleNavClick("/Beranda")}
                                >
                                    Lihat Sekarang
                                </Button>
                            </div>
                            <Image className="w-80 h-80 mt-4" src={ForgotPasswordIcon} />
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
}

export default AuthPage;
