import React from "react";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import HotelCard from "../hotels/components/HotelCard";

interface User {
  name: string;
}

interface Hotel {
  id: number;
  name: string;
  address: string;
  description: string;
  user: User;
}

const hotels: Hotel[] = [
  {
    id: 1,
    name: "Hotel Pasific",
    address: "123 Pacific St, Ocean City",
    description: "Hotel dengan kualitas yang menarik dari segi kualitas makanan hingga pelayanan terbaik se asia tenggara",
    user: { name: "John Doe" }
  },
  {
    id: 2,
    name: "Hotel Blue Sky",
    address: "456 Blue Sky Ave, Sky City",
    description: "A fantastic hotel for stargazers.",
    user: { name: "Jane Smith" }
  },
  {
    id: 3,
    name: "Hotel Berlin",
    address: "789 Berlin Rd, Germany",
    description: "A serene place to enjoy the night sky.",
    user: { name: "Hans Mueller" }
  },
  {
    id: 4,
    name: "Hotel Sunshine",
    address: "321 Sunshine Blvd, Sun City",
    description: "A lovely hotel with a sunny disposition.",
    user: { name: "Sunny Ray" }
  },
  {
    id: 5,
    name: "Hotel Moonlight",
    address: "654 Moonlight Ln, Moon Town",
    description: "A serene place to enjoy the night sky.",
    user: { name: "Luna Moon" }
  },
  {
    id: 6,
    name: "Hotel Starry",
    address: "987 Starry St, Star City",
    description: "A fantastic hotel for stargazers.",
    user: { name: "Stella Star" }
  },
];

const HotelChoices: React.FC = () => {
  // Group hotels into sets of 3
  const hotelGroups = hotels.reduce<Hotel[][]>((acc, hotel, index) => {
    if (index % 3 === 0) {
      acc.push(hotels.slice(index, index + 3));
    }
    return acc;
  }, []);

  return (
    <div className="container mx-auto my-20">
      <h2 className="text-4xl font-bold">Pilihan Hotel</h2>
      <div className="flex justify-between items-center mb-4">
        <p>Pilihan terbaik untuk hotel dari Bookingin!</p>
        <div className="flex space-x-2">
          <button className="p-3 bg-pink-400 text-2xl text-white rounded-md">
            <IoChevronBack />
          </button>
          <button className="p-3 bg-pink-400 text-2xl text-white rounded-md">
            <IoChevronForward />
          </button>
        </div>
      </div>
      <Carousel
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
      >
        {hotelGroups.map((hotelGroup, idx) => (
          <div key={idx} className="flex justify-around">
            {hotelGroup.map((hotel) => (
              <div key={hotel.id} className="w-1/3 px-2">
                <HotelCard hotel={hotel} />
              </div>
            ))}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HotelChoices;
