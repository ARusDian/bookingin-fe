import { LuPlane, LuHotel } from "react-icons/lu";

const PartnerHome = () => {
  return (
    <div className="flex flex-col space-y-4 justify-center items-center w-full h-dashboard-outlet">
      {/* <h1 className="text-3xl font-roboto"></h1> */}
      <div className="flex gap-2 justify-around items-center w-full">
        <div className="w-2/5 h-[600px] border border-purple-200 rounded-xl shadow-lg flex flex-col">
          <div className="w-full h-full rounded-t-xl flex flex-col justify-center items-center">
            <LuPlane className="text-[100px]" />
          </div>
          {/* <div className="w-full h-1/3 rounded-b-xl"></div> */}
        </div>
        <div className="w-2/5 h-[600px] border border-purple-200 rounded-xl shadow-lg">
          <div className="w-full h-full rounded-t-xl flex flex-col justify-center items-center">
            <LuHotel className="text-[100px]" />
          </div>
          {/* <div className="w-full h-1/3 rounded-b-xl"></div> */}
        </div>
      </div>
    </div>
  );
};

export default PartnerHome;
