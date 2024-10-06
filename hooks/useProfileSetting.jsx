import React, { useState, useEffect, useRef } from "react";
import { auth, db, storage } from "@/lib/firebaseConfig";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const useProfileSetting = () => {
    const router = useRouter();
    const Logo = require("@/assets/img/logo.png");
    const DefaultProfile = require("@/assets/img/Icon/DefaultProfile.jpeg");
    const [avatarFile, setAvatarFile] = useState(DefaultProfile);
    const [isImageVisible, setIsImageVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState(null);
    const [fileName, setFileName] = useState('');
    const [fileSize, setFileSize] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileUrl, setFileUrl] = useState("");
    const fileInputRef = useRef(null);
    const [sedangUbahProfile, setSedangUbahProfile] = useState(false);
    const [isDialogDeleteAccountOpen, setDeleteAccountOpen] = useState(false);
    const [openUpdateProfile, setOpenUpdateProfile] = useState(false);
    const handleOpenUpdateProfile = () => {
        console.log("Dialog open state before toggle:", openUpdateProfile);
        setOpenUpdateProfile(!openUpdateProfile);
        console.log("Dialog open state after toggle:", !openUpdateProfile);
    };
    const handleOpenDialogDeleteAccount = () => {
        setDeleteAccountOpen(true);
    };
    const handleCloseDialogDeleteAccount = () => {
        setDeleteAccountOpen(false);
    };

    const handleChooseFileClick = () => {
        console.log('Choose file button clicked');
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        console.log('File input changed. Files:', event.target.files);
        const file = event.target.files[0];
        if (file) {
            console.log('File selected:', file);
            setFileName(file.name);
            setFileSize((file.size / 1024).toFixed(2) + ' KB');
            console.log(`File "${file.name}" of size ${file.size} bytes has been selected.`);

            const fileUrl = URL.createObjectURL(file);
            setAvatarFile(fileUrl);
            setSelectedFile(file);
            console.log("selectedFile set to:", file);
            setIsImageVisible(true);
        } else {
            console.log('No file selected');
        }
    };

    const handleDelete = () => {
        setIsImageVisible(false);
        fileInputRef.current.value = null;
    };

    const handleUpload = async () => {
        if (selectedFile) {
            if (!user) {
                toast.error('User not found. Please log in.', { duration: 1000 });
                return;
            }

            const storageRef = ref(storage, `Gambar_Profile/${user.uid}/${selectedFile.name}`);

            try {
                const snapshot = await uploadBytes(storageRef, selectedFile);
                console.log("File uploaded successfully!");
                toast.success('File uploaded successfully!', { duration: 1000 });
                setIsImageVisible(false);

                const downloadURL = await getDownloadURL(snapshot.ref);
                setFileUrl(downloadURL);
                setAvatarFile(downloadURL);
                console.log("File available at:", downloadURL);

                const userRef = doc(db, "pengguna", user.uid);
                await updateDoc(userRef, {
                    Gambar_Profile: downloadURL,
                });
                console.log("User document updated with gambar_profile!");
                window.location.reload();
            } catch (error) {
                console.error("Error uploading file:", error);
                toast.error(`Error uploading file: ${error.message}`, { duration: 1000 });
            }
        } else {
            toast.error('Please select a file first!', { duration: 1000 });
        }
    };

    useEffect(() => {
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

        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            if (user) {
                fetchUserData(user);
            } else {
                setAvatarFile(DefaultProfile);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const toggleEdit = () => setIsEditing((cur) => !cur);
    const [userDetails, setUserDetails] = useState({
        NIK: "",
        Nama_Lengkap: "",
        Email: "",
        Jenis_Kelamin: "",
        Umur: "",
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
        Jenis_Kelamin: "Jenis Kelamin Pengguna",
        Umur: "Umur Pengguna",
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
        Jenis_Kelamin: "Not Available",
        Umur: "Not Available",
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
            const inputDate = new Date(value);
            const today = new Date();

            if (!isNaN(inputDate.getTime()) && inputDate <= today) {
                updatedValue = value;
                const age = calculateAge(inputDate, today);
                updateUserAgeInDatabase(age);
            } else {
                updatedValue = '';
            }
        }

        if (name === "Alamat_Tagihan" || name === "Alamat_Tagihan_Penerima") {
            updatedValue = value;
        }
        if (name === "Jenis_Kelamin") {
            updatedValue = value;
        }
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [name]: updatedValue,
        }));
    };

    const calculateAge = (birthDate, currentDate) => {
        const ageDiff = currentDate - birthDate;
        const ageInYears = ageDiff / (1000 * 60 * 60 * 24 * 365.25);
        const roundedAge = Math.round(ageInYears);
        return roundedAge;
    };

    const updateUserAgeInDatabase = async (age) => {
        try {
            const userRef = doc(db, 'pengguna', user.uid);
            await updateDoc(userRef, {
                Umur: age,
            });
            console.log("Umur berhasil diperbarui:", age);
        } catch (error) {
            console.error("Error memperbarui umur:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = auth.currentUser;

        if (user) {
            setSedangUbahProfile(true);
            try {
                const docRef = doc(db, "pengguna", user.uid);
                const age = calculateAge(new Date(userDetails.Tanggal_Lahir), new Date());
                userDetails.Umur = age;
                await updateDoc(docRef, userDetails);
                console.log("Document successfully updated!");
                toast.success('Data Berhasil di Perbaharui', {
                    duration: 3000,
                });
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } catch (error) {
                console.error("Error updating document: ", error);
                toast.error('Data Gagal di Perbaharui', {
                    duration: 3000,
                });
            } finally {
                setSedangUbahProfile(false);
            }
        }
    };

    return {
        isEditing, setIsEditing, toggleEdit,
        userDetails, setUserDetails, Logo, DefaultProfile, handleInputChange, handleSubmit, userDetailsLabels,
        userDetailsLabels1, defaultValues, defaultValues1, getValue, sedangUbahProfile, setSedangUbahProfile, router,
        isDialogDeleteAccountOpen, setDeleteAccountOpen, handleOpenDialogDeleteAccount, handleCloseDialogDeleteAccount,
        handleOpenUpdateProfile, setOpenUpdateProfile, openUpdateProfile, handleChooseFileClick, fileInputRef, handleFileChange,
        fileName, fileSize, handleDelete, avatarFile, setAvatarFile, isImageVisible, setIsImageVisible, fileName, fileSize, handleDelete,
        selectedFile, setSelectedFile, fileUrl, setFileUrl, handleUpload
    };
};
export default useProfileSetting;