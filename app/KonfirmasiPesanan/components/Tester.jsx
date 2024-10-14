import React from 'react';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { Button, Typography } from '@/app/MTailwind';
import useProfileSetting from "@/hooks/useProfileSetting";
import useCart from "@/hooks/useCart";
import toast, { Toaster } from 'react-hot-toast';

const OrderDetails = () => {
    const pengarah = useRouter();
    const { userDetails } = useProfileSetting();
    const { cartContent, isLoading, handleConfirmOrder, formattedTotalPrice } = useCart();
    return (
        <div className="my-10 p-6 max-w-7xl mx-auto bg-white shadow-lg rounded-lg z-10 relative">
            <div className="text-base justify-center text-center font-bold" >
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div>
            <h1 className="text-5xl font-semibold mb-2">Detail Pemesanan</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <div className="grid grid-cols-1 justify-between items-center mb-4 text-blue-gray-400">
                        <Typography variant="paragraph">Konfirmasi Kembali Pesananan Anda</Typography>
                        <Typography variant="paragraph">Harap Cek Apakah Pesanan Sudah Sesuai</Typography>
                    </div>
                    <div className="mt-4">
                        {/* Product List */}
                        <div className="border-t pt-4">
                            {isLoading ? (
                                <div className="flex items-center mb-4">
                                    <div className="ml-4">
                                        <h3 className="font-semibold">Loading ...</h3>
                                    </div>
                                </div>
                            ) : cartContent.length > 0 ? (
                                cartContent.map(({ Nama, Gambar, Harga, Jumlah_Pesanan, Kategori, Total_perItem }, index) => (
                                    <div className="flex items-center mb-8" key={index}>
                                        <Image
                                            src={Gambar}
                                            alt="Premium Suit"
                                            className="w-16 h-16 object-cover"
                                            width={500}
                                            height={300}
                                        />
                                        <div className="ml-4 flex-grow space-y-4">
                                            <div className='grid grid-cols-2 justify-between'>
                                                <h3 className="font-semibold text-start">{Nama}</h3>
                                                <p className='text-end'>x{Jumlah_Pesanan}</p>
                                            </div>
                                            <p className="text-gray-500">{Kategori}</p>
                                            <div className='grid grid-cols-2 justify-between'>
                                                <p className="font-bold">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Harga)}/item</p>
                                                <p className="font-bold text-end">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Total_perItem)}</p>
                                            </div>
                                        </div>
                                    </div>

                                ))
                            ) : (
                                <div className="flex items-center mb-4">
                                    <div className="ml-4">
                                        <h3 className="font-semibold">No items in cart</h3>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
                {/* Right Column */}
                <div>
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
                        <h2 className="font-semibold mb-4">Ringkasan Pesanan</h2>
                        <div className="flex justify-between mb-2">
                            <span>Shipping estimate</span>
                            <span>Rp 0</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Tax estimate</span>
                            <span>Rp 0</span>
                        </div>
                        <div className="flex justify-between font-bold">
                            <span>Total</span>
                            <span> {formattedTotalPrice}</span>
                        </div>
                    </div>
                    {/* Shipping Address */}
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="font-semibold">Alamat Pengiriman</h2>
                            <Button color="red" size="sm" variant="text" onClick={() => pengarah.push("/ProfileSetting")}>
                                Edit
                            </Button>
                        </div>
                        {userDetails ? (
                            <div>
                                <p>{userDetails.Nama_Lengkap_Penerima}</p>
                                <p>{userDetails.Alamat_Tagihan_Penerima}</p>
                                <p>{userDetails.Nomor_Telepon_Penerima}</p>
                            </div>
                        ) : (
                            <div>
                                <p>Null</p>
                                <p>Null</p>
                                <p>Null</p>
                                <p>Null</p>
                                <p>Null</p>
                            </div>
                        )}
                    </div>

                    {/* Billing Address */}
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="font-semibold">Alamat Tagihan</h2>
                            <Button color="red" size="sm" variant="text" onClick={() => pengarah.push("/ProfileSetting")}>
                                Edit
                            </Button>
                        </div>
                        {userDetails ? (
                            <div>
                                <p>{userDetails.Nama_Lengkap}</p>
                                <p>{userDetails.Alamat_Tagihan}</p>
                                <p>{userDetails.Email}</p>
                                <p>{userDetails.Nomor_Telepon}</p>
                            </div>
                        ) : (
                            <div>
                                <p>Null</p>
                                <p>Null</p>
                                <p>Null</p>
                                <p>Null</p>
                                <p>Null</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className='flex justify-end mt-6'>
                <Button className='button-effect' onClick={handleConfirmOrder}>
                    Lakukan Pemesanan
                </Button>
            </div>
        </div>
    );
};

export default OrderDetails;
