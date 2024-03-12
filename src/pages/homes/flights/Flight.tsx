import Navbar from "@components/Navbar";
import FlightListPage from "./components/FlightListPage";

const Flight = () => {
  return (
    <>
      <Navbar />
      <div className="relative w-full h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-gray-800 z-[-1]"></div>
        <div className="h-full flex flex-col justify-center text-center drop-shadow-2xl relative">
          <h1 className="text-white text-7xl font-extrabold -mt-8">
            Penerbangan
          </h1>
          <div>
            <p className="text-white text-2xl pt-2 font-medium text-center">
              Kami menyediakan jasa penerbangan keseluruh penjuru dunia !
            </p>
          </div>
        </div>
      </div>
      <FlightListPage />
    </>
  );
};

export default Flight;
