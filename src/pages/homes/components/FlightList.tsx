import { Link } from "react-router-dom";

const FlightList = () => {
  return (
    <div className="my-20 container mx-auto">
      <h1 className="text-4xl text-center font-bold mb-8">Penerbangan</h1>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col space-y-4">
          <div className="h-28 border rounded-lg flex flex-col justify-center px-8 py-8 shadow">
            <div className="flex justify-between items-center h-full">
              <div className="flex flex-col justify-between h-full">
                <p className="text-slate-400 italic">Guest</p>
                <p className="font-bold text-lg">50</p>
              </div>
              <div className="flex flex-col justify-between h-full w-52">
                <p className="text-slate-400 italic">Date</p>
                <p className="font-bold text-lg">12 - 13 December 2021</p>
              </div>
              <div className="flex flex-col justify-between h-full w-52">
                <p className="text-slate-400 italic">Maskapai</p>
                <p className="font-bold text-lg">Premium Lion King</p>
              </div>
              <div className="flex flex-col justify-between h-full">
                <p className="text-slate-400 italic">Harga</p>
                <p className="font-bold text-lg">Rp1.000.000</p>
              </div>
              
            </div>
          </div>
          <div className="h-28 border rounded-lg flex flex-col justify-center px-8 py-8 shadow">
            <div className="flex justify-between items-center h-full">
              <div className="flex flex-col justify-between h-full">
                <p className="text-slate-400 italic">Guest</p>
                <p className="font-bold text-lg">50</p>
              </div>
              <div className="flex flex-col justify-between h-full w-52">
                <p className="text-slate-400 italic">Date</p>
                <p className="font-bold text-lg">12 - 13 December 2021</p>
              </div>
              <div className="flex flex-col justify-between h-full w-52">
                <p className="text-slate-400 italic">Maskapai</p>
                <p className="font-bold text-lg">AirCity Bus</p>
              </div>
              <div className="flex flex-col justify-between h-full">
                <p className="text-slate-400 italic">Harga</p>
                <p className="font-bold text-lg">Rp1.000.000</p>
              </div>
              
            </div>
          </div>
          <div className="h-28 border rounded-lg flex flex-col justify-center px-8 py-8 shadow">
            <div className="flex justify-between items-center h-full">
              <div className="flex flex-col justify-between h-full">
                <p className="text-slate-400 italic">Guest</p>
                <p className="font-bold text-lg">50</p>
              </div>
              <div className="flex flex-col justify-between h-full w-52">
                <p className="text-slate-400 italic">Date</p>
                <p className="font-bold text-lg">12 - 13 December 2021</p>
              </div>
              <div className="flex flex-col justify-between h-full w-52">
                <p className="text-slate-400 italic">Maskapai</p>
                <p className="font-bold text-lg">AirCity Bus</p>
              </div>
              <div className="flex flex-col justify-between h-full">
                <p className="text-slate-400 italic">Harga</p>
                <p className="font-bold text-lg">Rp1.000.000</p>
              </div>
              
            </div>
          </div>
          <div className="h-28 border rounded-lg flex flex-col justify-center px-8 py-8 shadow">
            <div className="flex justify-between items-center h-full">
              <div className="flex flex-col justify-between h-full">
                <p className="text-slate-400 italic">Guest</p>
                <p className="font-bold text-lg">50</p>
              </div>
              <div className="flex flex-col justify-between h-full w-52">
                <p className="text-slate-400 italic">Date</p>
                <p className="font-bold text-lg">12 - 13 December 2021</p>
              </div>
              <div className="flex flex-col justify-between h-full w-52">
                <p className="text-slate-400 italic">Maskapai</p>
                <p className="font-bold text-lg">AirCity Bus</p>
              </div>
              <div className="flex flex-col justify-between h-full">
                <p className="text-slate-400 italic">Harga</p>
                <p className="font-bold text-lg">Rp1.000.000</p>
              </div>
              
            </div>
          </div>
          <Link to="/flight" className="text-center text-sm text-pink-500 underline underline-offset-2">
            Lihat Selengkapnya
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FlightList;
