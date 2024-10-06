import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';

const useAuth = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                if (user.emailVerified && !user.verificationUpdated) {
                    try {
                        const verificationDate = new Date();
                        await updateDoc(doc(db, 'pengguna', user.uid), {
                            Tanggal_Verifikasi: verificationDate,
                            verificationUpdated: true
                        });
                        console.log('Email verified and Tanggal_Verifikasi updated');
                    } catch (err) {
                        console.error('Error updating verification date:', err);
                    }
                }
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return user;
};

export default useAuth;
