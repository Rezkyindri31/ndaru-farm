import React, { useState } from "react";
import { auth, db } from "@/config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';

const useProfileSetting = () => {
    const Logo = require("@/assets/img/logo.png");
    const DefaultProfile = require("@/assets/img/Icon/DefaultProfile.jpeg");
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [avatarFile, setAvatarFile] = useState(DefaultProfile);
    const toggleEdit = () => setIsEditing((cur) => !cur);
    const [userDetails, setUserDetails] = useState({
        NIK: "",
        Nama_Lengkap: "",
        Email: "",
        Nomor_Telepon: "",
        Tanggal_Lahir: "",
        Alamat_Tagihan: "",
        Nama_Lengkap_Penerima: "",
        Nomor_Telepon_Penerima: "",
        Alamat_Tagihan_Penerima: "",
    });

    const userDetailsLabels = {
        NIK: "NIK",
        Nama_Lengkap: "Nama Lengkap",
        Email: "Email Pengguna",
        Nomor_Telepon: "Nomor Telepon Pengguna",
        Tanggal_Lahir: "Tanggal Lahir Pengguna",
        Alamat_Tagihan: "Alamat Pengguna",
    };

    const userDetailsLabels1 = {
        Nama_Lengkap_Penerima: "Nama Lengkap Penerima",
        Nomor_Telepon_Penerima: "Nomor Telepon Penerima",
        Alamat_Tagihan_Penerima: "Alamat Penerima",
    };

    const defaultValues = {
        NIK: "Not Available",
        Nama_Lengkap: "Not Available",
        Email: "Not Available",
        Nomor_Telepon: "Not Available",
        Tanggal_Lahir: "Not Available",
        Alamat_Tagihan: "Not Available",
    };

    const defaultValues1 = {
        Nama_Lengkap_Penerima: "Not Available",
        Nomor_Telepon_Penerima: "Not Available",
        Alamat_Tagihan_Penerima: "Not Available",
    };

    const getValue = (key) => {
        return userDetails?.[key] || "Not Available";
    };


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const img = new Image();
                img.src = reader.result;
                img.onload = () => {
                    setAvatarFile(reader.result);
                };
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let updatedValue = value;

        if (name === "NIK") {
            updatedValue = value.replace(/\D/g, '').slice(0, 16);
        }

        if (name === "Nama_Lengkap" || name === "Nama_Lengkap_Penerima") {
            updatedValue = value.replace(/[^a-zA-Z\s]/g, '');
        }
        if (name === "Email") {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(value) && value !== '') {
                updatedValue = value;
            }
        }
        if (name === "Nomor_Telepon" || name === "Nomor_Telepon_Penerima") {
            updatedValue = value.replace(/[^0-9+]/g, '');
            if (updatedValue.startsWith('+62')) {
                if (updatedValue.length < 12 || updatedValue.length > 15) {
                    updatedValue = updatedValue.slice(0, 15);
                }
            } else if (updatedValue.length > 0) {
                updatedValue = '+62' + updatedValue.replace(/^\+62/g, '');
            }
        }
        if (name === "Tanggal_Lahir") {
            const datePattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
            if (datePattern.test(value) || value === '') {
                updatedValue = value;
            } else {
                updatedValue = value;
            }
        }
        if (name === "Alamat_Tagihan" || name === "Alamat_Tagihan_Penerima") {
            updatedValue = value;
        }

        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [name]: updatedValue,
        }));
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = auth.currentUser;

        if (user) {
            try {
                const docRef = doc(db, "pengguna", user.uid);
                await updateDoc(docRef, userDetails);
                console.log("Document successfully updated!");
                router.push('/ProfileSetting');
                toast.success('Data Berhasil di Perbaharui', {
                    duration: 3000,
                });
            } catch (error) {
                console.error("Error updating document: ", error);
                toast.success('Data Gagal di Perbaharui', {
                    duration: 3000,
                });
            }
        }
    };

    return {
        isEditing, setIsEditing, avatarFile, setAvatarFile, toggleEdit, handleFileChange,
        userDetails, setUserDetails, Logo, DefaultProfile, handleInputChange, handleSubmit, userDetailsLabels,
        userDetailsLabels1, defaultValues, defaultValues1, getValue
    };
};
export default useProfileSetting;