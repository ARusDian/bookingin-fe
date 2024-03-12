import { useState } from 'react';
import Modal from 'react-modal';
import Login from './auth/Login';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <nav className="h-20 w-full bg-white shadow-md fixed top-0 left-0">
      <div className="container mx-auto flex items-center justify-between h-full">
        <div className="text-2xl font-bold">Logo</div>
        <div className="flex items-center">
          <ul className="flex space-x-4">
            <li className="text-pink-400">Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
          <button
            className="ml-4 bg-pink-400 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded"
            onClick={openModal}
          >
            Sign In
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <div>
          <h2>Modal Content</h2>
          <p>Put your modal content here.</p>
          <Login />
          <button onClick={closeModal}>Close Modal</button>
        </div>
      </Modal>
    </nav>
  );
};

export default Navbar;
