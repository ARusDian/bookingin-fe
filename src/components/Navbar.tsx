const Navbar = () => {
  return (
    <nav className="h-20 w-full bg-white shadow-md fixed top-0 left-0">
      <div className="container mx-auto flex items-center justify-between h-full">
        <div className="text-2xl font-bold">Logo</div>
        <div>
          <ul className="flex space-x-4">
            <li className="text-pink-400">Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
