import Navbar from "@components/Navbar";
import HotelListPage from "./components/HotelListPage";

const Hotel = () => {
  return (
    <>
      <Navbar />
      <div className="relative w-full h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-gray-800 z-[-1]">
          <img className="h-screen w-screen" src="public/image/hotel.jpg" />
        </div>
        <div className="h-full flex flex-col justify-center text-center drop-shadow-2xl relative">
          <h1 className="text-white text-7xl font-extrabold -mt-8">Hotel</h1>
          <div>
            <p className="text-white text-2xl pt-2 font-medium text-center">
              Kami menyediakan pemesanan tiket untuk kalian !
            </p>
          </div>
        </div>
      </div>
      <HotelListPage />
    </>
  );
};

export default Hotel;
