import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { firestore } from "@/lib/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { formatHuruf } from "@/utils/utilsHanyaHuruf";
import { formatNoTelepon } from '@/utils/utilsNoTelepon';

const useProfileEdit = (initialData) => {
    const [isEditable, setIsEditable] = useState(false);
    const [profileData, setProfileData] = useState(initialData);

    useEffect(() => {
        setProfileData(initialData);
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (["Nama_Lengkap_Penerima", "Nama_Lengkap"].includes(name)) {
            const formattedInput = formatHuruf(value);
            setProfileData((prev) => ({
                ...prev,
                [name]: formattedInput,
            }));
            return;
        }
        if (["No_Telepon_Penerima", "No_Telepon"].includes(name)) {
            const formattedInput = formatNoTelepon(value);
            setProfileData((prev) => ({
                ...prev,
                [name]: formattedInput,
            }));
            return;
        }
        setProfileData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEditClick = () => {
        setIsEditable(!isEditable);
    };

    const handleSave = async () => {
        setIsEditable(false);

        try {
            const auth = getAuth();
            const user = auth.currentUser;

            if (!user) {
                throw new Error("User is not authenticated");
            }

            const userRef = doc(firestore, "pengguna", user.uid);
            await setDoc(userRef, { ...profileData }, { merge: true });

            toast.success("Update Profile Berhasil!");
        } catch (err) {
            toast.error("Gagal update profile. Silahkan coba lagi.");
            console.error("Error updating profile:", err);
        }
    };

    const handleCancel = () => {
        setProfileData(initialData);
        setIsEditable(false);
    };

    return {
        isEditable,
        profileData,
        handleChange,
        handleEditClick,
        handleSave,
        handleCancel,
    };
};

export default useProfileEdit;
