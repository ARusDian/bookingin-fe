import React, { useState } from "react";
import Modal from "react-modal";
import Login from "./auth/Login";
import accounting from 'accounting';
import Register from "./auth/Register";
import Topup_Form from "./user/topup/Topup_Form";
import Riwayat_Transaksi from "./user/riwayat_transaksi/Riwayat_Transaksi";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);
  const [isTransactionHistoryModalOpen, setIsTransactionHistoryModalOpen] =
    useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    setShowLogin(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsTopUpModalOpen(false);
    setIsTransactionHistoryModalOpen(false);
  };

  const toggleModalContent = () => {
    setShowLogin(!showLogin);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const saldo = 456789;

  const openTopUpModal = () => {
    setIsTopUpModalOpen(true);
  };

  const openTransactionHistoryModal = () => {
    setIsTransactionHistoryModalOpen(true);
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
          <div className="relative ml-4">
            <button
              className="bg-pink-400 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded"
              onClick={openModal}
            >
              Masuk
            </button>
            <div
              className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-md w-48 z-10"
              style={{ display: isDropdownOpen ? "block" : "none" }}
            >
              <ul>
                <li className="py-2 px-4 text-green-500 font-bold hover:bg-gray-100">
                Saldo: <span>{accounting.formatMoney(saldo, "Rp ", 0, ".", ",")}</span>
                </li>
                <li
                  className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                  onClick={openTopUpModal}
                >
                  Top Up
                </li>
                <li
                  className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                  onClick={openTransactionHistoryModal}
                >
                  Riwayat Transaksi
                </li>
                <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                  Keluar
                </li>
              </ul>
            </div>
            <button className="text-pink-400 ml-2" onClick={toggleDropdown}>
              Hi, Dimas Pramudya
            </button>
          </div>
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

      <Modal
        isOpen={isTopUpModalOpen}
        onRequestClose={() => setIsTopUpModalOpen(false)}
        contentLabel="Top Up Modal"
        ariaHideApp={false}
        className="modal"
      >
        <div className="p-8">
          <div className="flex justify-between">
            <div className="font-bold">Top Up Saldo</div>
            <div>
              <button
                className="text-gray-500 text-md hover:text-gray-700 mr-2"
                onClick={() => setIsTopUpModalOpen(false)}
              >
                X
              </button>
            </div>
          </div>
          <Topup_Form />
        </div>
      </Modal>

      <Modal
        isOpen={isTransactionHistoryModalOpen}
        onRequestClose={() => setIsTransactionHistoryModalOpen(false)}
        contentLabel="Transaction History Modal"
        ariaHideApp={false}
        className="modal mt-2"
      >
        <div className="p-8">
          <div className="flex justify-between">
            <div>
              <h1 className="font-bold text-2xl">Riwayat Transaksi</h1>
            </div>
            <div>
              <button
                className="text-gray-500 text-md hover:text-gray-700 mr-2"
                onClick={() => setIsTransactionHistoryModalOpen(false)}
              >
                X
              </button>
            </div>
          </div>
            <Riwayat_Transaksi />
        </div>
      </Modal>
    </nav>
  );
};

export default Navbar;
