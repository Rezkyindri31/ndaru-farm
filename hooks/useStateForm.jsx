import { useState } from 'react';

const useStateForm = () => {
    const [nik, setNik] = useState('');
    const [namalengkap, setNamaLengkap] = useState('');
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

    return {
        nik, setNik, namalengkap, setNamaLengkap, nomortelepon, setNomorTelepon
        , tanggallahir, setTanggalLahir, alamattagihan, setAlamatTagihan
        , email, setEmail, password, setPassword, confirmpassword, setConfirmPassword
        , namalengkappenerima, setNamaLengkapPenerima, nomorteleponpenerima, setNomorTeleponPenerima
        , alamattagihanpenerima, setAlamatTagihanPenerima, isValidPassword, hasUpperCase, hasLowerCase,
        hasNumber, hasSpecialChar, sedangMemuatRegister, setSedangMemuatRegister
    };
}

export default useStateForm;