import React, { useState } from "react";
import Modal from "react-modal";
import Login from "./auth/Login";
import Register from "./auth/Register";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [showLogin, setShowLogin] = React.useState(true);

  const openModal = () => {
    setIsModalOpen(true);
    setShowLogin(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleModalContent = () => {
    setShowLogin(!showLogin);
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
            Masuk
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Card Details"
        ariaHideApp={false}
        className="modal mt-2"
      >
        <div className="flex justify-end">
          <button
            className="text-gray-500 text-md hover:text-gray-700 mr-2"
            onClick={closeModal}
          >
            X
          </button>
        </div>
        <div className="p-8">
          {showLogin ? (
            <>
              <Login />
              <div>
                <h1 onClick={toggleModalContent}>
                  <span className="hover:italic hover:text-pink-400 cursor-pointer">
                    Belum daftar akun ?
                  </span>
                </h1>
              </div>
            </>
          ) : (
            <>
              <Register />
              <div>
                <h1 onClick={toggleModalContent}>
                  <span className="hover:italic hover:text-pink-400 cursor-pointer">
                    Masuk ?
                  </span>
                </h1>
              </div>
            </>
          )}
        </div>
      </Modal>
    </nav>
  );
};

export default Navbar;
