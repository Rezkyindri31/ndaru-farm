import React, { useState } from 'react';
import useStateForm from '@/hooks/useStateForm';
import { Stepper, Step, Textarea, Alert, Typography, Input, Button, Spinner, Radio } from '@/app/MTailwind';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '@/lib/firebaseConfig';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { FaUser, FaBuilding } from "react-icons/fa";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import useStepper from '@/hooks/useStepper';
import useValidationForm from '@/hooks/useValidationForm';

function useRegisterWithEmailPassword() {
    const {
        nik, setNik,
        namalengkap, setNamaLengkap,
        jenisKelamin, setJenisKelamin,
        nomortelepon, setNomorTelepon,
        tanggallahir, setTanggalLahir,
        alamattagihan, setAlamatTagihan,
        email, setEmail,
        password, setPassword,
        confirmpassword, setConfirmPassword,
        namalengkappenerima, setNamaLengkapPenerima,
        nomorteleponpenerima, setNomorTeleponPenerima,
        alamattagihanpenerima, setAlamatTagihanPenerima,
        isValidPassword, hasMinLength, hasUpperCase, hasLowerCase,
        hasNumber, hasSpecialChar, sedangMemuatRegister, setSedangMemuatRegister,
        hitungUmur
    } = useStateForm();
    const router = useRouter();

    const { isPasswordVisible, isConfirmPasswordVisible,
        togglePasswordVisibility, toggleConfirmPasswordVisibility, handleKeyPress } = useValidationForm();

    const { activeStep, setActiveStep, isLastStep,
        setIsLastStep, isFirstStep, setIsFirstStep,
        handleNext, handlePrev } = useStepper();

    const handleRegister = async (e) => {
        e.preventDefault();
        setSedangMemuatRegister(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const creationDate = new Date();
            const umur = hitungUmur(tanggallahir);
            console.log(user);
            if (user) {
                await setDoc(doc(db, "pengguna", user.uid), {
                    Email: user.email,
                    NIK: nik,
                    Nama_Lengkap: namalengkap,
                    Jenis_Kelamin: jenisKelamin,
                    Nomor_Telepon: nomortelepon,
                    Tanggal_Lahir: tanggallahir,
                    Umur: umur,
                    Alamat_Tagihan: alamattagihan,
                    Password: password,
                    Confirmpassword: confirmpassword,
                    Nama_Lengkap_Penerima: namalengkappenerima,
                    Nomor_Telepon_Penerima: nomorteleponpenerima,
                    Alamat_Tagihan_Penerima: alamattagihanpenerima,
                    Tanggal_Pembuatan: creationDate,
                    Tanggal_Verifikasi: null,
                });
            }
            await sendEmailVerification(user);
            console.log('Verification email sent');
            toast.success('Pembuatan Akun Anda Berhasil. Silahkan verifikasi email Anda sebelum login.', {
                duration: 4000,
            });
            router.push('/Login');
        } catch (err) {
            toast.error(`Gagal: ${err.message}`, {
                duration: 3000,
            });
        } finally {
            setSedangMemuatRegister(false);
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <div className="w-full px-24 py-4 ">
                <Stepper
                    activeStep={activeStep}
                    isLastStep={value => setIsLastStep(value)}
                    isFirstStep={value => setIsFirstStep(value)}
                    className='shadow-lg drop-shadow-2xl bg-secondary rounded-2xl h-16 justify-center gap-20'
                >
                    <Step onClick={() => setActiveStep(0)}>
                        <FaUser className="h-10 w-10" />
                    </Step>
                    <Step onClick={() => setActiveStep(1)}>
                        <FaUser className="h-10 w-10" />
                    </Step>
                    <Step onClick={() => setActiveStep(2)}>
                        <FaBuilding className="h-10 w-10" />
                    </Step>
                </Stepper>

                {activeStep === 0 && (
                    <div className="page-informasipribadi space-y-6">
                        <div className="grid gap-6 lg:grid-cols-1 my-2 mt-12 ">
                            <h1 className="text-center text-xl text-black font-semibold uppercase shadow-lg border-b-4 border-secondary p-1.5 rounded-lg ">Informasi Pribadi</h1>
                            <div>
                                <Input
                                    type="number"
                                    placeholder="NIK"
                                    className="!border-2 !border-secondary bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                    labelProps={{
                                        className: "hidden",
                                    }}
                                    containerProps={{ className: "min-w-[100px]" }}
                                    value={nik}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (value.length <= 16) {
                                            setNik(value);
                                        }
                                    }}
                                    required
                                />
                                {nik.length > 0 && nik.length < 16 && (
                                    <div className="flex w-full flex-col gap-2 mt-1.5">
                                        <Alert className='py-0 px-5' variant="filled">
                                            <Typography className="font-normal text-sm">
                                                <p className="text-red-500">NIK harus berjumlah 16 digit.</p>
                                            </Typography>
                                        </Alert>
                                    </div>
                                )}
                            </div>
                            <div>
                                <Input
                                    type="text"
                                    placeholder="Nama Lengkap"
                                    className="!border-2 !border-secondary bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                    labelProps={{ className: "hidden" }}
                                    containerProps={{ className: "min-w-[100px]" }}
                                    value={namalengkap}
                                    onChange={(e) => setNamaLengkap(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    required
                                />
                            </div>
                            <div className="flex items-center gap-10 text-xs !border-2 !border-secondary rounded-lg px-4">
                                <h1 className="whitespace-nowrap text-sm text-blue-gray-400">Jenis Kelamin</h1>
                                <Radio
                                    name="type"
                                    label="Laki-laki"
                                    value="Laki-laki"
                                    checked={jenisKelamin === 'Laki-laki'}
                                    onChange={(e) => setJenisKelamin(e.target.value)}
                                />
                                <Radio
                                    name="type"
                                    label="Perempuan"
                                    value="Perempuan"
                                    checked={jenisKelamin === 'Perempuan'}
                                    onChange={(e) => setJenisKelamin(e.target.value)}
                                />
                            </div>
                            <div>
                                <Input
                                    type="tel"
                                    placeholder="Nomor Telepon Pengguna"
                                    className="!border-2 !border-secondary bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                    labelProps={{
                                        className: "hidden",
                                    }}
                                    containerProps={{ className: "min-w-[100px]" }}
                                    value={nomortelepon}
                                    onChange={(e) => {
                                        let value = e.target.value;
                                        if (value === '') {
                                            setNomorTelepon('+62');
                                            return;
                                        }
                                        if (value.startsWith('+62')) {
                                            value = value.slice(3);
                                        } else if (value.length === 0) {
                                            return;
                                        }

                                        if (/^\d*$/.test(value) && value.length <= 11) {
                                            setNomorTelepon('+62' + value);
                                        }
                                    }}
                                    required
                                />
                                {nomortelepon.length > 0 && (nomortelepon.length < 11 || nomortelepon.length > 14) && (
                                    <div className="flex w-full flex-col gap-2 mt-0.5">
                                        <Alert className='py-0 px-5' variant="filled">
                                            <Typography className="font-normal text-sm">
                                                <p className="text-red-500">Nomor telepon harus berjumlah 10-13 digit.</p>
                                            </Typography>
                                        </Alert>
                                    </div>
                                )}
                            </div>
                            <div>
                                <Input
                                    type="date"
                                    placeholder="Tanggal Lahir Pengguna"
                                    className="!border-2 !border-secondary bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                    labelProps={{
                                        className: "hidden",
                                    }}
                                    containerProps={{ className: "min-w-[100px]" }}
                                    value={tanggallahir}
                                    onChange={(e) => setTanggalLahir(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <Textarea
                                    type="text"
                                    placeholder="Alamat Tagihan"
                                    className="!border-2 !border-secondary bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                    labelProps={{
                                        className: "hidden",
                                    }}
                                    containerProps={{ className: "min-w-[100px] h-[150px]" }}
                                    value={alamattagihan}
                                    onChange={(e) => setAlamatTagihan(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                )}
                {activeStep === 1 && (
                    <div className="page-informasipribadi space-y-6">
                        <div className="grid gap-6 lg:grid-cols-1 my-2 mt-12 ">
                            <h1 className="text-center text-xl text-black font-semibold uppercase shadow-lg border-b-4 border-secondary p-1.5 rounded-lg ">Informasi Pribadi Lanjutan</h1>
                            <div>
                                <Input
                                    type="email"
                                    placeholder="Email Pengguna"
                                    className="!border-2 !border-secondary bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                    labelProps={{
                                        className: "hidden",
                                    }}
                                    containerProps={{ className: "min-w-[100px]" }}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='relative'>
                                <Input
                                    type={isPasswordVisible ? "text" : "password"}
                                    placeholder="Password Pengguna"
                                    className="!border-2 !border-secondary bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                    labelProps={{
                                        className: "hidden",
                                    }}
                                    containerProps={{ className: "min-w-[100px]" }}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className={`absolute right-2 transform ${password.length > 0 && !isValidPassword ? 'top-3 translate-y-1/2' : 'top-1/3'}`}
                                    aria-label={isPasswordVisible ? "Sembunyikan Password" : "Tampilkan Password"}
                                >
                                    {isPasswordVisible ? (
                                        <span role="img" aria-label="Hide password"><IoMdEyeOff /></span>
                                    ) : (
                                        <span role="img" aria-label="Show password"><IoMdEye /></span>
                                    )}
                                </button>
                                {password.length > 0 && !isValidPassword && (
                                    <div className="flex flex-col mt-2">
                                        <Alert className='py-1 px-5' variant="filled">
                                            <Typography className="font-normal text-sm text-gray-800">
                                                {!hasMinLength && (
                                                    <p className="text-red-500">✘ Minimal 8 karakter</p>
                                                )}
                                                {!hasUpperCase && (
                                                    <p className="text-red-500">✘ Harus memiliki satu huruf kapital</p>
                                                )}
                                                {!hasLowerCase && (
                                                    <p className="text-red-500">✘ Harus memiliki satu huruf kecil</p>
                                                )}
                                                {!hasNumber && (
                                                    <p className="text-red-500">✘ Harus memiliki satu angka</p>
                                                )}
                                                {!hasSpecialChar && (
                                                    <p className="text-red-500">✘ Harus memiliki satu karakter unik (.,_/@!#$%^&*)</p>
                                                )}
                                                {hasMinLength && (
                                                    <p className="text-green-500">✔ Minimal 8 karakter</p>
                                                )}
                                                {hasUpperCase && <p className="text-green-500">✔ Harus memiliki satu huruf kapital</p>}
                                                {hasLowerCase && <p className="text-green-500">✔ Harus memiliki satu huruf kecil</p>}
                                                {hasNumber && <p className="text-green-500">✔ Harus memiliki satu angka</p>}
                                                {hasSpecialChar && <p className="text-green-500">✔ Harus memiliki satu karakter unik (.,_)</p>}
                                            </Typography>
                                        </Alert>
                                    </div>
                                )}
                            </div>
                            <div className='relative'>
                                <Input
                                    type={isConfirmPasswordVisible ? "text" : "password"}
                                    placeholder="Konfirmasi Password Pengguna"
                                    className="!border-2 !border-secondary bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                    labelProps={{
                                        className: "hidden",
                                    }}
                                    containerProps={{ className: "min-w-[100px]" }}
                                    value={confirmpassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={toggleConfirmPasswordVisibility}
                                    className={`absolute right-2 transform ${confirmpassword.length > 0 && password !== confirmpassword ? 'top-3 translate-y-1/2' : 'top-1/3'}  `}
                                    aria-label={isConfirmPasswordVisible ? "Sembunyikan Password" : "Tampilkan Password"}
                                >
                                    {isConfirmPasswordVisible ? (
                                        <span role="img" aria-label="Hide password"><IoMdEyeOff /></span>
                                    ) : (
                                        <span role="img" aria-label="Show password"><IoMdEye /></span>
                                    )}
                                </button>
                                {password !== confirmpassword && confirmpassword.length > 0 && (
                                    <div className="flex w-full flex-col gap-2 mt-2">
                                        <Alert className='py-0 px-5' variant="filled">
                                            <Typography className="font-normal text-sm">
                                                <p className="text-red-500">Password dan Konfirmasi Password harus sama.</p>
                                            </Typography>
                                        </Alert>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                {activeStep === 2 && (
                    <div className="page-penerima space-y-6">
                        <div className="grid gap-6 lg:grid-cols-1 my-2 mt-12 ">
                            <h1 className="text-center text-xl text-black font-semibold uppercase shadow-lg border-b-4 border-secondary p-1.5 rounded-lg ">Informasi Pengiriman</h1>
                            <div>
                                <Input
                                    type="text"
                                    placeholder="Nama Lengkap Penerima"
                                    className="!border-2 !border-secondary bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                    labelProps={{ className: "hidden" }}
                                    containerProps={{ className: "min-w-[100px]" }}
                                    value={namalengkappenerima}
                                    onChange={(e) => setNamaLengkapPenerima(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                />
                            </div>
                            <div>
                                <Input
                                    type="tel"
                                    placeholder="Nomor Telepon Penerima"
                                    className="!border-2 !border-secondary bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                    labelProps={{
                                        className: "hidden",
                                    }}
                                    containerProps={{ className: "min-w-[100px]" }}
                                    value={nomorteleponpenerima}
                                    onChange={(e) => {
                                        let value = e.target.value;
                                        if (value === '') {
                                            setNomorTeleponPenerima('+62');
                                            return;
                                        }
                                        if (value.startsWith('+62')) {
                                            value = value.slice(3);
                                        } else if (value.length === 0) {
                                            return;
                                        }

                                        if (/^\d*$/.test(value) && value.length <= 11) {
                                            setNomorTeleponPenerima('+62' + value);
                                        }
                                    }}
                                    required
                                />
                                {nomorteleponpenerima.length > 0 && (nomorteleponpenerima.length < 11 || nomorteleponpenerima.length > 14) && (
                                    <div className="flex w-full flex-col gap-2 mt-0.5">
                                        <Alert className='py-0 px-5' variant="filled">
                                            <Typography className="font-normal text-sm">
                                                <p className="text-red-500">Nomor telepon harus berjumlah 10-13 digit.</p>
                                            </Typography>
                                        </Alert>
                                    </div>
                                )}
                            </div>
                            <div>
                                <Textarea
                                    type="text"
                                    placeholder="Alamat Penerima"
                                    className="!border-2 !border-secondary bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                    labelProps={{
                                        className: "hidden",
                                    }}
                                    containerProps={{ className: "min-w-[100px] h-[150px]" }}
                                    value={alamattagihanpenerima}
                                    onChange={(e) => setAlamatTagihanPenerima(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                )}
                <div className="mt-16 flex justify-between">
                    <p className="mt-4 text-center text-gray-500">Sudah punya akun? <a href="/Login" className="text-blue-500">Login</a></p>
                    <Button className='bg-black text-white' onClick={handlePrev} hidden={isFirstStep}>
                        Prev
                    </Button>
                    <Button className='bg-black text-white' onClick={handleNext} hidden={isLastStep}>
                        Next
                    </Button>
                    {activeStep === 2 && (
                        <Button className='button-effect' type='submit' disabled={sedangMemuatRegister}>
                            {sedangMemuatRegister ? (
                                <>
                                    <Spinner className="h-4 w-4" />
                                    <span>Sedang Mendaftar...</span>
                                </>
                            ) : (
                                'Daftar'
                            )}
                        </Button>
                    )}
                </div>
            </div>
        </form >
    )
};
export default useRegisterWithEmailPassword;