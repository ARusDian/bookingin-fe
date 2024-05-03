const Riwayat_Transaksi = () => {
  return (
    <div className="w-full my-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">Transaksi A</h3>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <p>ID Tiket: 123456789</p>
            <p>Status: Berhasil</p>
          </div>
          <p>Hotel Blue Sky</p>
          <p>Jl. Sultan Hasanuddin</p>
          <p>Pemesanan Kamar Hotel hotel1 - type1 dari 13/03/2024 sampai 14/03/2024</p>
          <p>Check in:<span>01 Januari 2023</span></p>
          <p>Check out: 03 Januari 2023</p>
          <p className="text-green-500 font-bold">Rp 1.000.000 </p>
        </div>
      </div>
    </div>
  );
};

export default Riwayat_Transaksi;
