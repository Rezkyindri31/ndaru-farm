import { useRouter } from "next/navigation";
import { RxCross2 } from "react-icons/rx";
import toast, { Toaster } from "react-hot-toast";
import Image from 'next/image';

import Selada from '@/assets/img/Produk/Selada.jpeg';

const PemesananProduk = () => {
    const router = useRouter();

    const products = [
        { id: 1, name: 'Produk 1', price: 100, quantity: 2, imageUrl: Selada },
        { id: 2, name: 'Produk 2', price: 150, quantity: 1, imageUrl: Selada },
        { id: 3, name: 'Produk 3', price: 200, quantity: 3, imageUrl: Selada },
    ];

    const subtotal = products.reduce((total, product) => total + product.price * product.quantity, 0);
    const shippingCost = 50;
    const total = subtotal + shippingCost;
    const handleKonfirmasi = () => {
        router.push('/KonfirmasiPesanan');
    };

    return (
        <div className="z-10 relative mt-8">
            <div className="text-base justify-center text-center font-bold">
                <Toaster position="top-right" reverseOrder={false} />
            </div>
            <div className="w-full justify-center flex items-center">
                <table className="w-full table-auto text-left mx-64 shadow-lg rounded-xl">
                    <thead className="bg-[#738E5BCC] rounded-t-xl">
                        <tr>
                            <th className="font-bold px-6 py-4 text-center" colSpan={2}>Nama Produk</th>
                            <th className="font-bold px-6 py-4 text-center">Harga</th>
                            <th className="font-bold px-6 py-4 text-center">Kuantitas</th>
                            <th className="font-bold px-6 py-4 text-end">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} className="">
                                <td className="px-6 py-4">
                                    <div className="w-6 h-6 bg-lightgray bg-opacity-40 items-center justify-center flex rounded-lg cursor-pointer">
                                        <RxCross2 size={12} color="black" className="w-4 h-4" />
                                    </div>
                                </td>
                                <td className="px-6 py-4 flex items-center">
                                    <Image src={product.imageUrl} alt={product.name} className="w-12 h-12 object-cover mr-4" />
                                    {product.name}
                                </td>
                                <td className="px-6 py-4 text-center">{product.price}</td>
                                <td className="px-6 py-4 text-center">{product.quantity}</td>
                                <td className="px-6 py-4 text-end">{product.price * product.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="w-full my-4 flex justify-end">
                <div className="w-[400px] mr-64">
                    <div className="w-full max-w-4xl bg-white shadow-md p-4 rounded-lg">
                        <div className="flex justify-between items-center pb-3">
                            <span className="font-medium text-lg">Subtotal</span>
                            <span className="font-bold">{subtotal}</span>
                        </div>
                        <div className="flex justify-between items-center border-b py-3">
                            <span className="font-medium text-lg">Biaya Kirim</span>
                            <span className="font-bold">{shippingCost}</span>
                        </div>
                        <div className="flex justify-between items-center py-3">
                            <span className="font-medium text-lg">Total</span>
                            <span className="font-bold text-xl">{total}</span>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={handleKonfirmasi}
                                className="px-6 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition"
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default PemesananProduk;
