import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import Banner from "./components/Banner";
import HotelChoices from "./components/HotelChoices";
import FlightList from "./components/FlightList";

const Home = () => {
  return (
    <div className="bg-white">
      <Navbar />
      <Banner />
      <HotelChoices />
      <FlightList />
      <Footer />
    </div>
  );
};

export default Home;
