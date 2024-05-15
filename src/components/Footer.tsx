const Footer = () => {
  return (
    <div className="h-[300px] bg-gray-800 w-full text-white py-8">
      <p className="text-center text-2xl font-semibold mb-4 ">BookingIn</p>
      <div className="max-w-screen-sm mx-auto space-y-4">
        <p className="text-center text-sm">
          Book your next flight and hotel with ease! Enjoy hassle-free
          reservations and exclusive deals for an unforgettable travel
          experience.
        </p>

        <div className="flex space-x-2 text-sm">
          <div className="flex flex-col gap-4">
            <p>Home</p>
            <p>Room Suites</p>
          </div>
          <div className="flex flex-1 justify-center">
            <div className="flex flex-col gap-4">
              <p>About Us</p>
              <p>Events</p>
              <p>Gallery</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p>Our Team</p>
            <p>Blog</p>
            <p>Contact Us</p>
            <p>Careers</p>
          </div>
        </div>
      </div>
      <p className="text-xs text-center">
        Copyright Institut Teknologi Kalimantan @2024
      </p>
    </div>
  );
};

export default Footer;
