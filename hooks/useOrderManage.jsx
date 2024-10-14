import { useState } from 'react';

const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(value);
};

const useOrderManager = () => {
    const [contentPesanan, setContentPesanan] = useState([]);

    const handleQuantityChange = (index, value) => {
        const updatedContent = [...contentPesanan];
        const newQuantity = value < 1 ? 1 : value;
        updatedContent[index].kuantitas = newQuantity;
        updatedContent[index].total = formatCurrency(updatedContent[index].hargaNumerical * newQuantity);
        setContentPesanan(updatedContent);
    };

    const handleRemove = (index) => {
        const updatedContent = contentPesanan.filter((_, i) => i !== index);
        setContentPesanan(updatedContent);
    };

    const calculateTotals = () => {
        const total = contentPesanan.reduce((sum, item) => sum + item.hargaNumerical * item.kuantitas, 0);
        return {
            total: formatCurrency(total)
        };
    };

    const { total } = calculateTotals();

    const CountTotal = [
        { desc: "Total", harga: total },
    ];

    return {
        contentPesanan,
        setContentPesanan,
        handleQuantityChange,
        handleRemove,
        CountTotal,
    };
};

export default useOrderManager;
