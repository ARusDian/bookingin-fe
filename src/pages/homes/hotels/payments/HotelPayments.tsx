import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import HotelCardPayments from "./components/HotelCardPayments";
import HotelForm from "./components/HotelForm";

interface Hotel {
  id: number;
  image: string;
  name: string;
  availability: number;
  location: string;
  roomType: string;
  price: number;
}

const HotelPayments = () => {
  const hotels: Hotel[] = [
    {
      id: 1,
      image: "hotel1.jpg",
      name: "Example Hotel 1",
      availability: 2,
      location: "asdasd",
      roomType: "asdad",
      price: 150,
    },
  ];
  return (
    <>
      <Navbar />
      <div className="p-8">
        <h1 className="text-6xl mt-24 font-bold mb-10">Bookingin Sekarang!</h1>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          {hotels.map((hotel) => (
            <HotelCardPayments key={hotel.id} hotel={hotel} />
            ))}
        </div>
            <HotelForm />
      </div>

      <Footer />
    </>
  );
};

export default HotelPayments;
