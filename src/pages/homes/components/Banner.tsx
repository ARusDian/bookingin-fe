import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="h-screen pt-20">
      <div className="container mx-auto w-full h-full flex ">
        <div className="flex flex-col space-y-8 justify-center pr-10 w-[55%] ">
          <h1 className="text-7xl font-bold leading-tight">
            Website Booking Terbaik di Alam Semesta
          </h1>
          <p>
          Website terbaik untuk memesan tiket hotel dan pesawat sesuai tujuan anda untuk keseluruh dunia !
          </p>
          <div className="flex space-x-4">
            <Link to="/flight">
              <button className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-400">
                Booking Tiket Pesawat
              </button>
            </Link>
            <Link to="/hotel">
              <button className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-400">
                Booking Kamar Hotel
              </button>
            </Link>
          </div>
        </div>
        <div className="bg-gray-700 flex-1 ">
          <img className="h-full w-full" src="public/image/banner.png"/>
        </div>
      </div>
    </div>
  );
};

export default Banner;
