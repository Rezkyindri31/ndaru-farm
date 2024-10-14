"use client";
import Image from "next/image";
import { usePath } from '@/components/PathContext';

function HeaderTemplate() {
    const { currentPath } = usePath();

    const content = {
        '/Produk': {
            desc: 'Segar dan Organik',
            title: 'Etalase Produk'
        },
        '/Jasa': {
            desc: 'Layanan Berkualitas',
            title: 'Etalase Jasa'
        },
        '/SaranaPertanian': {
            desc: 'Sarana Pertanian Bermutu',
            title: 'Etalase Sarana Pertanian'
        },
        '/Berita': {
            desc: 'Informasi Seputar Tanaman Organik',
            title: 'Artikel Berita'
        },
        '/TentangKami': {
            desc: 'Informasi terkait Bisnis Kami',
            title: 'Tentang Kami'
        },
        '/KontakKami': {
            desc: 'Dapatkan Dukungan dalam 24 / 7',
            title: 'Kontak Kami'
        },
        '/Pemesanan': {
            desc: 'Nota Pemesanan Produk',
            title: 'Pemesanan Produk'
        },
        '/KonfirmasiPesanan': {
            desc: 'Penyelesaian Pemesanan Produk',
            title: 'Konfirmasi Pemesanan'
        },
        '/ProfileSetting': {
            desc: 'Setting Profile Anda',
            title: 'Pengaturan Profile'
        },
        '/TrackingPesanan': {
            desc: 'Pelacakan Pesanan Anda',
            title: 'Histori Pemesanan'
        },
    };

    const currentContent = content[currentPath] || {
        desc: 'Default Deskripsi',
        title: 'Default Judul'
    };

    return (
        <div className="relative z-10">
            <Image
                src={require("@/assets/img/breadcrumb-bg.jpg")}
                alt="image 2"
                className="h-110 w-full object-cover brightness-50"
                priority
            />
            <div className="absolute top-0 left-0 w-full h-full bg-[rgba(7,33,46,0.8)] blur-[10px] z-2"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 text-white text-xl font-bold animate-slide-fade-in">
                <div className="uppercase text-center tracking-widest px-10 lg:px-0">
                    <h3 className="text-base lg:text-lg text-primary uppercase">
                        {currentContent.desc}
                    </h3>
                    <h3 className="text-base lg:text-5xl text-white capitalize">
                        {currentContent.title}
                    </h3>
                </div>
            </div>
        </div>
    );
}

export default HeaderTemplate;
