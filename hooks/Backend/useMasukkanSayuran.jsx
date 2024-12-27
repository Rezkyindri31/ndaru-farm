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
            // Step 1: Upload image to Firebase Storage
            const storageRef = ref(storage, `Gambar_Sayuran/${gambarFile.name}`);
            const uploadTask = uploadBytesResumable(storageRef, gambarFile);

            await uploadTask;

            const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);

            // Step 4: Add data to Firestore
            const documentData = {
                ...data,
                Gambar: imageUrl, // Store the image URL in Firestore
            };

            const docRef = await addDoc(collection(firestore, 'sayuran'), documentData);
            return docRef.id; // Return the document ID after successful addition
        } catch (err) {
            setError(err.message); // Set error message if something goes wrong
            console.error("Error uploading or saving document: ", err);
            throw new Error('Gagal menyimpan data. Silakan coba lagi.');
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return { tambahData, loading, error };
};

export default useMasukanSayuran;
