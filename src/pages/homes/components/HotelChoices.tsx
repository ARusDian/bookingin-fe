import { IoChevronForward } from "react-icons/io5";
import { IoChevronBack } from "react-icons/io5";

const HotelChoices = () => {
  return (
    <div className="container mx-auto my-20">
      <h2 className="text-4xl font-bold">Pilihan Hotel</h2>
      <div className="flex justify-between items-center mb-4 ">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor,
          soluta.
        </p>
        <div className="flex space-x-2">
          <button className="p-3 bg-pink-400 text-2xl text-white rounded-md">
            <IoChevronBack />
          </button>
          <button className="p-3 bg-pink-400 text-2xl text-white rounded-md">
            <IoChevronForward />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-8">
        <div className="h-[500px] rounded-lg flex flex-col space-y-4">
          <div className="h-3/4 bg-gray-800 rounded-t-lg"></div>
          <div className="">
            <h3 className="text-2xl font-bold">Hotel 1</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint amet
              optio officiis ratione dolorem fugit sit quo provident, est alias!
            </p>
          </div>
        </div>
        <div className="h-[500px] rounded-lg flex flex-col space-y-4">
          <div className="h-3/4 bg-gray-800 rounded-t-lg"></div>
          <div className="">
            <h3 className="text-2xl font-bold">Hotel 2</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint amet
              optio officiis ratione dolorem fugit sit quo provident, est alias!
            </p>
          </div>
        </div>
        <div className="h-[500px] rounded-lg flex flex-col space-y-4">
          <div className="h-3/4 bg-gray-800 rounded-t-lg"></div>
          <div className="">
            <h3 className="text-2xl font-bold">Hotel 3</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint amet
              optio officiis ratione dolorem fugit sit quo provident, est alias!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelChoices;
