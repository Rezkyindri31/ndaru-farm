import { useState } from 'react';
const useStateForm = () => {
    const [nik, setNik] = useState('');
    const [namalengkap, setNamaLengkap] = useState('');
    const [jenisKelamin, setJenisKelamin] = useState('Laki-laki');
    const [nomortelepon, setNomorTelepon] = useState('');
    const [tanggallahir, setTanggalLahir] = useState('');
    const [alamattagihan, setAlamatTagihan] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [namalengkappenerima, setNamaLengkapPenerima] = useState('');
    const [nomorteleponpenerima, setNomorTeleponPenerima] = useState('');
    const [alamattagihanpenerima, setAlamatTagihanPenerima] = useState('');
    const [sedangMemuatRegister, setSedangMemuatRegister] = useState(false);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[.,_/@!#$%^&*]/.test(password);
    const isValidPassword = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
    const hitungUmur = (tanggallahir) => {
        const today = new Date();
        const birthDate = new Date(tanggallahir);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        const dayDifference = today.getDate() - birthDate.getDate();
        if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
            age--;
        }
        const totalMonths = (monthDifference < 0 ? 12 + monthDifference : monthDifference);
        const totalDays = (dayDifference < 0 ? 30 + dayDifference : dayDifference);
        const decimalAge = age + (totalMonths / 12) + (totalDays / 365);
        const roundedAge = decimalAge % 1 > 0.6 ? Math.ceil(decimalAge) : Math.floor(decimalAge);
        return roundedAge;
    };

    return {
        nik, setNik, namalengkap, setNamaLengkap, jenisKelamin, setJenisKelamin,
        nomortelepon, setNomorTelepon, tanggallahir, setTanggalLahir, alamattagihan,
        setAlamatTagihan, email, setEmail, password, setPassword, confirmpassword, setConfirmPassword
        , namalengkappenerima, setNamaLengkapPenerima, nomorteleponpenerima, setNomorTeleponPenerima
        , alamattagihanpenerima, setAlamatTagihanPenerima, isValidPassword, hasUpperCase, hasLowerCase,
        hasNumber, hasSpecialChar, sedangMemuatRegister, setSedangMemuatRegister, hitungUmur
    };
}

export default useStateForm;