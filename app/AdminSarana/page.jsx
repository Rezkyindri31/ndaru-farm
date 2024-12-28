"use client";
import { useState } from 'react';
import { Button, Input, Textarea } from '@material-tailwind/react';
import useMasukanSaranaPertanian from '@/hooks/Backend/useMasukkanSaranaPertanian';

const FormInputData = () => {
    const [nama, setNama] = useState('');
    const [jenis, setJenis] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [gambar, setGambar] = useState(null);
    const [harga, setHarga] = useState('');
    const [kategori, setKategori] = useState('');

    const { tambahData, loading, error } = useMasukanSaranaPertanian();

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!gambar) {
            alert("Gambar harus dipilih!");
            return;
        }
        const data = {
            Nama: nama,
            Jenis: jenis,
            Deskripsi: deskripsi,
            Harga: parseInt(harga),
            Kategori: kategori,
            Tanggal_Dibuat: new Date().toISOString(),
        };

        try {
            const id = await tambahData(data, gambar);
            alert(`Data berhasil disimpan dengan ID: ${id}`);
            setNama('');
            setJenis('');
            setDeskripsi('');
            setHarga('');
            setKategori('');
            setGambar(null);
        } catch (error) {
            alert(error.message || 'Gagal menyimpan data. Silakan coba lagi.');
        }
    };

    return (
        <div className="container mx-auto mt-5">
            <h2 className="mb-4 text-2xl font-bold">Form Input Data</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nama" className="block text-sm font-medium">Nama</label>
                    <Input
                        id="nama"
                        type="text"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        placeholder="Masukkan Nama"
                        required
                        className="w-full"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="nama" className="block text-sm font-medium">Jenis</label>
                    <Input
                        id="jenis"
                        type="text"
                        value={jenis}
                        onChange={(e) => setJenis(e.target.value)}
                        placeholder="Masukkan Nama"
                        required
                        className="w-full"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="deskripsi" className="block text-sm font-medium">Deskripsi</label>
                    <Textarea
                        id="deskripsi"
                        value={deskripsi}
                        onChange={(e) => setDeskripsi(e.target.value)}
                        placeholder="Masukkan Deskripsi"
                        rows="3"
                        className="w-full"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="gambar" className="block text-sm font-medium">Gambar</label>
                    <Input
                        id="gambar"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setGambar(e.target.files[0])}
                        required
                        className="w-full"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="harga" className="block text-sm font-medium">Harga (Rp)</label>
                    <Input
                        id="harga"
                        type="number"
                        value={harga}
                        onChange={(e) => setHarga(e.target.value)}
                        placeholder="Masukkan Harga"
                        required
                        className="w-full"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="kategori" className="block text-sm font-medium">Kategori</label>
                    <Input
                        id="kategori"
                        type="text"
                        value={kategori}
                        onChange={(e) => setKategori(e.target.value)}
                        placeholder="Masukkan Kategori"
                        required
                        className="w-full"
                    />
                </div>

                <Button type="submit" className="mt-4" disabled={loading}>
                    {loading ? 'Menyimpan...' : 'Simpan'}
                </Button>

                {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
        </div>
    );
};

export default FormInputData;
