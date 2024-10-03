import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Dialog, DialogHeader, DialogBody, Typography, Input, Button, IconButton } from "@/app/MTailwind";
import Image from "next/image";
import toast, { Toaster } from 'react-hot-toast';

const AccountDeletionDialog = ({ open, handleOpen }) => {
    const Logo = require("@/assets/img/logo.png");
    const [confirmationInput, setConfirmationInput] = useState("");
    const router = useRouter();

    const handleInputChange = (e) => {
        setConfirmationInput(e.target.value);
    };

    const handleDeleteAccount = async () => {
        if (confirmationInput === "Hapus Akun") {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userDocRef = doc(db, 'pengguna', user.uid);
                    await deleteDoc(userDocRef);
                    await user.delete();
                    console.log("Akun berhasil dihapus!");
                    toast.success("Akun Berhasil di Hapus");
                    router.push("/Login");
                }
            } catch (error) {
                console.error("Error deleting account: ", error);
                toast.error("Gagal Menghapus Akun. Pastikan Anda mengetikkan 'Hapus Akun' dengan benar.");
            }
        } else {
            console.log("Input konfirmasi tidak sesuai.");
            toast.error("Konfirmasi Input Tidak Sesuai");
        }
    };

    return (
        <div className="page-delete flex w-full m-10 items-center justify-center text-center">
            <section className="place-items-center h-screen hidden">
                <Dialog className="p-4" size="md" open={open} handler={handleOpen}>
                    <div className="text-base justify-center text-center font-bold" >
                        <Toaster
                            position="top-right"
                            reverseOrder={false}
                        />
                    </div>
                    <DialogHeader className="justify-between">
                        <Image src={Logo} alt="" className="w-14 h-14" />
                        <IconButton color="gray" size="sm" variant="text" onClick={handleOpen}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </IconButton>
                    </DialogHeader>
                    <DialogBody className="overflow-y-scroll">
                        <Typography color="blue-gray" className="mb-1 font-bold">
                            Penghapusan Akun
                        </Typography>
                        <Typography variant="paragraph" className="font-normal text-gray-600 max-w-lg">
                            Apakah anda yakin ingin menghapus akun anda? Semua data mengenai diri anda akan hilang dan tidak dapat dipulihkan kembali.
                        </Typography>
                        <div>
                            <Typography variant="small" className="mt-6 mb-2 text-gray-600 font-normal">
                                Mohon ketikkan{" "}
                                <strong className="text-gray-900">&quot;Hapus Akun&quot;</strong>{" "}
                                untuk mengkonfirmasi penghapusan anda.
                            </Typography>
                            <div className="flex flex-col md:flex-row gap-2">
                                <Input
                                    color="gray"
                                    label="Hapus Akun"
                                    size="lg"
                                    value={confirmationInput}
                                    onChange={handleInputChange}
                                    className="w-full md:max-w-lg"
                                />
                                <Button color="red" className="w-full lg:max-w-[15rem]" onClick={handleDeleteAccount}>
                                    Hapus Akun Sekarang
                                </Button>
                            </div>
                        </div>
                    </DialogBody>
                </Dialog>
            </section>
        </div>
    );
};

export default AccountDeletionDialog;
