"use client";
import React, { useState, useEffect } from "react";
import {
    Card,
    CardBody,
    Typography,
    Textarea,
    Button,
    Input,
    Stepper,
    Step
} from "@/app/MTailwind";
import Image from "next/image";
import { GrContactInfo } from "react-icons/gr";
import { FaPen, FaTrashAlt, FaUser, FaBuilding } from "react-icons/fa";
import { auth, db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import toast, { Toaster } from 'react-hot-toast';
import useProfileSetting from "@/hooks/useProfileSetting";
import useStepper from '@/hooks/useStepper';
import useValidationForm from '@/hooks/useValidationForm';
import DeleteAccount from '@/hooks/useDeleteAccount';

function ProfileSet() {
    const { isEditing, setIsEditing,
        avatarFile, setAvatarFile,
        toggleEdit, handleFileChange, userDetails,
        setUserDetails, Logo, DefaultProfile,
        handleInputChange, handleSubmit, userDetailsLabels,
        userDetailsLabels1, defaultValues, defaultValues1, getValue } = useProfileSetting();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };
    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const { activeStep, setActiveStep, isLastStep,
        setIsLastStep, isFirstStep, setIsFirstStep,
        handleNext, handlePrev } = useStepper();

    const { handleKeyPress } = useValidationForm();

    const fetchUserData = async (user) => {
        if (user) {
            const docRef = doc(db, "pengguna", user.uid);
            try {
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserDetails(docSnap.data());
                    console.log("Document data:", docSnap.data());
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        } else {
            setUserDetails(null);
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(fetchUserData);
        return () => unsubscribe();
    }, []);

    return (
        <div className="h-full m-16 relative">
            <div className="text-base justify-center text-center font-bold" >
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div>
            <Card className="shadow-2xl border-blue-gray-500 overflow-hidden">
                <CardBody>
                    <div className="grid grid-cols-1 lg:gap-0 gap-6 justify-center items-center">
                        < div className="grid grid-cols-1 items-center justify-items-center gap-y-7 text-center relative group">
                            <Image
                                src={avatarFile || DefaultProfile}
                                alt="avatar"
                                variant="rounded"
                                width={256}
                                height={256}
                                className="w-72 h-72 border rounded-lg border-blue-gray-400 shadow-xl shadow-gray-400/50 ring-4 ring-blue-gray-500/30 transition-all duration-300 ease-in-out group-hover:blur-sm"
                            />
                            <div className="absolute top-1/3 items-center justify-center group-hover:flex hidden transition-opacity duration-300 ease-in-out">
                                <label className="cursor-pointer flex items-center justify-center p-2 bg-white rounded-full shadow-lg">
                                    <FaPen className="text-gray-600" />
                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                </label>
                            </div>
                            {userDetails ? (
                                <div>
                                    <Typography color="blue-gray" variant="h4">
                                        {userDetails.Nama_Lengkap}
                                    </Typography>
                                    <Typography variant="h5" className="font-normal text-gray-600 italic">
                                        {userDetails.Email}
                                    </Typography>
                                </div>
                            ) : (
                                <div>
                                    <Typography color="blue-gray" variant="h4">
                                        Null
                                    </Typography>
                                    <Typography variant="h5" className="font-normal text-gray-600 italic">
                                        Null
                                    </Typography>
                                </div>
                            )}
                        </div>
                        < div className="flex flex-row-reverse items-end justify-items-end text-end gap-10">
                            <div>
                                <Button
                                    variant="outlined"
                                    className="border-red-900 bg-red-800 flex items-center gap-3 text-sm text-white hover:bg-red-900"
                                    onClick={handleOpenDialog}
                                >
                                    <span>Hapus Akun</span> <FaTrashAlt className="text-sm" />
                                </Button>
                            </div>
                            {!isEditing ? (
                                <div>
                                    <Button
                                        variant="outlined"
                                        className="border-yellow-900 bg-yellow-800 flex items-center gap-3 text-sm text-white hover:bg-yellow-900"
                                        onClick={toggleEdit}
                                    >
                                        <span>Edit</span> <FaPen className="text-sm" />
                                    </Button>
                                </div>
                            ) : (
                                <div>
                                    <Button
                                        variant="outlined"
                                        className="border-primary bg-secondary flex items-center gap-3 text-sm text-white hover:bg-primary"
                                        onClick={toggleEdit}
                                    >
                                        <FaUser className="text-sm" /> <span>Profile </span>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Profile Page */}
                    {!isEditing && (
                        <div className="page-profile m-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="space-y-6 px-20 mt-8">
                                <div className="flex items-center gap-6 text-center justify-center text-2xl text-secondary font-semibold uppercase shadow-lg border-b-4 border-secondary p-1.5 rounded-lg">
                                    <GrContactInfo />
                                    <h1>
                                        Informasi Pribadi
                                    </h1>
                                </div>
                                {userDetails ? (
                                    <div className="grid gap-x-16 gap-y-5 lg:grid-cols-2 text-center">
                                        {Object.entries(userDetailsLabels).map(([key, label]) => (
                                            <React.Fragment key={key}>
                                                <div>
                                                    <Typography variant="h6" className="text-end">{label}</Typography>
                                                </div>
                                                <div>
                                                    <Typography variant="h6" className="text-start">{getValue(key)}</Typography>
                                                </div>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="grid gap-x-16 gap-y-5 lg:grid-cols-2 text-center">
                                        {Object.entries(defaultValues).map(([key, value]) => (
                                            <React.Fragment key={key}>
                                                <div>
                                                    <Typography variant="h6" className="text-end">{userDetailsLabels[key]}</Typography>
                                                </div>
                                                <div>
                                                    <Typography variant="h6" className="text-start">{value}</Typography>
                                                </div>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="space-y-6 px-20 mt-8">
                                <div className="flex items-center gap-6 text-center justify-center text-2xl text-secondary font-semibold uppercase shadow-lg border-b-4 border-secondary p-1.5 rounded-lg">
                                    <GrContactInfo />
                                    <h1>
                                        Informasi Penerima
                                    </h1>
                                </div>
                                {userDetails ? (
                                    <div className="grid gap-x-16 gap-y-5 lg:grid-cols-2 text-center">
                                        {Object.entries(userDetailsLabels1).map(([key, label]) => (
                                            <React.Fragment key={key}>
                                                <div>
                                                    <Typography variant="h6" className="text-end">{label}</Typography>
                                                </div>
                                                <div>
                                                    <Typography variant="h6" className="text-start">{getValue(key)}</Typography>
                                                </div>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="grid gap-x-16 gap-y-5 lg:grid-cols-2 text-center">
                                        {Object.entries(defaultValues1).map(([key, value]) => (
                                            <React.Fragment key={key}>
                                                <div>
                                                    <Typography variant="h6" className="text-end">{userDetailsLabels1[key]}</Typography>
                                                </div>
                                                <div>
                                                    <Typography variant="h6" className="text-start">{value}</Typography>
                                                </div>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Edit Page */}
                    {isEditing && (
                        <form onSubmit={handleSubmit}>
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
                                                    name="NIK"
                                                    placeholder="NIK"
                                                    className="!border-2 !border-secondary bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                                    labelProps={{
                                                        className: "hidden",
                                                    }}
                                                    containerProps={{ className: "min-w-[100px]" }}
                                                    value={userDetails.NIK}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Input
                                                    type="text"
                                                    name="Nama_Lengkap"
                                                    placeholder="Nama Lengkap"
                                                    className="!border-2 !border-secondary bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                                    labelProps={{ className: "hidden" }}
                                                    containerProps={{ className: "min-w-[100px]" }}
                                                    value={userDetails.Nama_Lengkap}
                                                    onChange={handleInputChange}
                                                    onKeyPress={handleKeyPress}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Input
                                                    type="email"
                                                    name="Email"
                                                    placeholder="Email Pengguna"
                                                    className="!border-2 !border-secondary bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                                    labelProps={{
                                                        className: "hidden",
                                                    }}
                                                    containerProps={{ className: "min-w-[100px]" }}
                                                    value={userDetails.Email}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Input
                                                    type="tel"
                                                    name="Nomor_Telepon"
                                                    placeholder="Nomor Telepon Pengguna"
                                                    className="!border-2 !border-secondary bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                                    labelProps={{
                                                        className: "hidden",
                                                    }}
                                                    containerProps={{ className: "min-w-[100px]" }}
                                                    value={userDetails.Nomor_Telepon}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Input
                                                    type="date"
                                                    name="Tanggal_Lahir"
                                                    placeholder="Tanggal Lahir Pengguna"
                                                    className="!border-2 !border-secondary bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                                    labelProps={{
                                                        className: "hidden",
                                                    }}
                                                    containerProps={{ className: "min-w-[100px]" }}
                                                    value={userDetails.Tanggal_Lahir}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Textarea
                                                    type="text"
                                                    name="Alamat_Tagihan"
                                                    placeholder="Alamat Tagihan"
                                                    className="!border-2 !border-secondary bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                                    labelProps={{
                                                        className: "hidden",
                                                    }}
                                                    containerProps={{ className: "min-w-[100px] h-[150px]" }}
                                                    value={userDetails.Alamat_Tagihan}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {activeStep === 1 && (
                                    <div className="page-penerima space-y-6">
                                        <div className="grid gap-6 lg:grid-cols-1 my-2 mt-12 ">
                                            <h1 className="text-center text-xl text-black font-semibold uppercase shadow-lg border-b-4 border-secondary p-1.5 rounded-lg ">Informasi Pengiriman</h1>
                                            <div>
                                                <Input
                                                    type="text"
                                                    name="Nama_Lengkap_Penerima"
                                                    placeholder="Nama Lengkap Penerima"
                                                    className="!border-2 !border-secondary bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                                    labelProps={{ className: "hidden" }}
                                                    containerProps={{ className: "min-w-[100px]" }}
                                                    value={userDetails.Nama_Lengkap_Penerima}
                                                    onChange={handleInputChange}
                                                    onKeyPress={handleKeyPress}
                                                />
                                            </div>
                                            <div>
                                                <Input
                                                    type="tel"
                                                    name="Nomor_Telepon_Penerima"
                                                    placeholder="Nomor Telepon Penerima"
                                                    className="!border-2 !border-secondary bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                                    labelProps={{
                                                        className: "hidden",
                                                    }}
                                                    containerProps={{ className: "min-w-[100px]" }}
                                                    value={userDetails.Nomor_Telepon_Penerima}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Textarea
                                                    type="text"
                                                    name="Alamat_Tagihan_Penerima"
                                                    placeholder="Alamat Penerima"
                                                    className="!border-2 !border-secondary bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                                    labelProps={{
                                                        className: "hidden",
                                                    }}
                                                    containerProps={{ className: "min-w-[100px] h-[150px]" }}
                                                    value={userDetails.Alamat_Tagihan_Penerima}
                                                    onChange={handleInputChange}
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
                                    {activeStep === 1 && (
                                        <Button className='button-effect' type='submit'>
                                            Simpan Perubahan
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </form>
                    )}
                    {/* Delete Dialog */}
                    <DeleteAccount open={isDialogOpen} handleOpen={handleCloseDialog} />
                </CardBody>
            </Card>
        </div >
    );
}

export default ProfileSet;
