import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="h-screen pt-20">
      <div className="container mx-auto h-full flex">
        <div className="flex flex-col space-y-8 justify-center w-[55%] pr-4">
          <h1 className="text-7xl font-bold leading-tight">
            Website Booking Terbaik di Alam Semesta
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            doloremque ipsam facilis, consectetur voluptas maxime pariatur
            nesciunt fugiat! Ipsam, est.
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
        <div className="bg-gray-800 flex-1"></div>
      </div>
    </div>
  );
};

export default Banner;
