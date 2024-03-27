import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import { FaCheckCircle } from "react-icons/fa";

const PostPayments = () => {
  return (
    <div>
      <Navbar />
      <div className="my-24 flex justify-center">
        <div className="bg-gray-200 rounded-lg px-10 py-8 text-center">
          <h2 className="font-bold text-green-500 text-xl mb-4">
            Pemesanan Tiket Sukses !!
          </h2>
          <p className="mb-4">Terima kasih telah memesan tiket!</p>
          <div className="text-5xl text-green-500 mb-4 flex justify-center">
            <FaCheckCircle />
          </div>
          <p className="mb-2">
            <span className="font-bold">ID Pesanan:</span> ABC123
          </p>
          <p className="mb-2">
            <span className="font-bold">Nama Pesanan:</span> TSX
          </p>
          <p className="mb-2">
            <span className="font-bold">Tanggal Mulai:</span> 1/1/2024
          </p>
          <p className="mb-2">
            <span className="font-bold">Tanggal Selesai:</span> 2/1/2024
          </p>
        </div>
      </div>
      <div className="fixed bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default PostPayments;
