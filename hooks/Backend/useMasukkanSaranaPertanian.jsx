import { useState } from 'react';
import { storage, firestore } from '@/lib/firebaseConfig'; // Import the firestore and storage instances
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const useMasukanSayuran = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const tambahData = async (data, gambarFile) => {
        setLoading(true);
        setError(null);

        try {
            const storageRef = ref(storage, `Gambar_Sarana_Pertanian/${gambarFile.name}`);
            const uploadTask = uploadBytesResumable(storageRef, gambarFile);
            await uploadTask;
            const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
            const documentData = {
                ...data,
                Gambar: imageUrl,
            };

            const docRef = await addDoc(collection(firestore, 'sarana_pertanian'), documentData);
            return docRef.id;
        } catch (err) {
            setError(err.message);
            console.error("Error uploading or saving document: ", err);
            throw new Error('Gagal menyimpan data. Silakan coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    return { tambahData, loading, error };
};

export default useMasukanSayuran;
