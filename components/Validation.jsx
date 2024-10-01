import React, { useState } from 'react';
import { Input, Typography } from '@/app/MTailwind';

const ValidationInput = ({ type, value, onChange, placeholder }) => {
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (event) => {
        const value = event.target.value;
        onChange(value);

        if (type === 'text') {
            if (/[^a-zA-Z\s]/.test(value)) {
                setHasError(true);
                setErrorMessage('Hanya huruf yang diperbolehkan');
                return;
            }
        } else if (type === 'email') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(value)) {
                setHasError(true);
                setErrorMessage('Format email tidak valid');
                return;
            }
        } else if (type === 'tel') {
            if (!/^\+62[0-9]*$/.test(value)) {
                setHasError(true);
                setErrorMessage('Nomor telepon harus dimulai dengan +62 dan hanya mengandung angka');
                return;
            }
            if (value.length < 12 || value.length > 16) {
                setHasError(true);
                setErrorMessage('Nomor telepon harus terdiri dari 10 hingga 13 angka setelah +62');
                return;
            }
        } else if (type === 'password') {
            const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_\.])[A-Za-z\d_\.]{8,}$/;
            if (!passwordPattern.test(value)) {
                setHasError(true);
                setErrorMessage('Password harus minimal 8 karakter, termasuk 1 huruf besar, 1 huruf kecil, 1 angka, dan 1 karakter unik (_ atau .)');
                return;
            }
        }

        setHasError(false);
        setErrorMessage('');
    };

    return (
        <div>
            <Input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={handleInputChange}
                className={`!border-2 ${hasError ? '!border-red-500' : '!border-secondary'} bg-blue-gray-100 text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10`}
                labelProps={{ className: "hidden" }}
                containerProps={{ className: "min-w-[100px] h-[50px]" }}
                error={hasError}
                success={!hasError && value !== ''}
            />
            {hasError && (
                <Typography variant="small" color="red" className="mt-1">
                    {errorMessage}
                </Typography>
            )}
        </div>
    );
};

export default ValidationInput;
