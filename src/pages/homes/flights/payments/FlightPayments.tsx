import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import FlightCardPayments from "./components/FlightCardPayments";
import FlightForm from "./components/FlightForm";

interface Flight {
  id: number;
  guest: string;
  date: string;
  airline: string;
  price: number;
}

const FlightPayments = () => {
  const flights: Flight[] = [
    {
      id: 1,
      guest: "Guest",
      date: "12 - 13 December 2021",
      airline: "Premium Lion King",
      price: 150,
    },
  ];
  return (
    <>
      <Navbar />
      <div className="p-8 h-screen">
        <h1 className="text-6xl mt-24 font-bold mb-10">Bookingin Sekarang!</h1>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          {flights.map((flight) => (
            <FlightCardPayments key={flight.id} flight={flight} />
          ))}
        </div>
        <FlightForm />
      </div>

      <Footer />
    </>
  );
};

export default FlightPayments;
