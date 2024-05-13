import { useEffect, useState, useRef } from "react";
import api from "@lib/api";
import Modal from "react-modal";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Topup_Form from "./user/topup/Topup_Form";
import Riwayat_Transaksi from "./user/riwayat_transaksi/Riwayat_Transaksi";
import ResetPassword from "./auth/ResetPassword";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../zustand/auth";
import { useCookies } from "react-cookie";
import { IoIosLogOut } from "react-icons/io";
import { currencyFormatter } from "@utils/currency_formatter";
import ResetPasswordForm from "./auth/ResetPasswordForm";
import { Link } from "react-router-dom";
import { UserForm } from "@lib/model";

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  balance: number;
  role: string;
};

type UserResponse = {
  data: User[];
};

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cookies] = useCookies(["token"]);
  const [showLogin, setShowLogin] = useState(true);
  const [, , removeCookie] = useCookies(["token"]);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);
  const [isTransactionHistoryModalOpen, setIsTransactionHistoryModalOpen] =
    useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    setShowLogin(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsTopUpModalOpen(false);
    setIsTransactionHistoryModalOpen(false);
    setIsResetPasswordModalOpen(false);
  };

  const toggleModalContent = () => {
    setShowLogin(!showLogin);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const openTopUpModal = () => {
    setIsTopUpModalOpen(true);
  };

  const openTransactionHistoryModal = () => {
    setIsTransactionHistoryModalOpen(true);
  };

  const openResetPasswordModal = () => {
    setIsResetPasswordModalOpen(true);
  };

  const {
    data: { data = [] } = {},
    isError,
    isRefetching,
    isLoading,
    refetch,
  } = useQuery<UserForm>({
    queryKey: ["users"],
    queryFn: () =>
      api
        .get("/me", {
          headers: { Authorization: `Bearer ${cookies.token}` },
        })
        .then((res) => res.data),
    placeholderData: keepPreviousData,
  });

  const profileData = data || [];

  console.log(profileData);

  return (
    <nav className="h-14 w-full bg-white shadow-md fixed top-0 left-0 z-40 shadow-lg">
      <div className="container mx-auto flex items-center justify-between h-full">
        <Link to="/" className="text-2xl font-bold flex">
          <img className="h-14 w-20 mb-2 ml-2" src="public/image/logo2.png" />
          <img className="h-12 w-48 mt-3" src="public/image/logo.png" />
        </Link>
        <div className="flex items-center">
          <ul className="flex space-x-4">
            <Link to="/" className="hover:text-pink-500">
              Home
            </Link>
            <Link to="/flight" className="hover:text-pink-500">
              Penerbangan
            </Link>
            <Link to="/hotel" className="hover:text-pink-500">
              Hotel
            </Link>
          </ul>
          <div className="relative ml-4">
            {data &&
            (data.role === "USER" ||
              data.role === "PARTNER" ||
              data.role === "ADMIN") ? (
              <button className="text-pink-400 ml-2" onClick={toggleDropdown}>
                Hi, {data.name}
              </button>
            ) : (
              <button
                className="bg-pink-400 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded"
                onClick={openModal}
              >
                Masuk
              </button>
            )}
            <div
              className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-md w-48 z-10"
              style={{ display: isDropdownOpen ? "block" : "none" }}
            >
              <ul>
                <li className="py-2 px-4 text-green-500 font-bold hover:bg-gray-100">
                  Saldo: <span>{currencyFormatter(data.balance)}</span>
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
                  <button
                    onClick={() => {
                      logout();
                      removeCookie("token");
                    }}
                    className="px-4 py-2 flex gap-2 items-center cursor-pointer"
                  >
                    <IoIosLogOut className="text-xl group-hover:text-red-500" />
                    <p className="group-hover:text-red-500">Logout</p>
                  </button>
                </li>
              </ul>
            </div>
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
                <h1 onClick={openResetPasswordModal}>
                  <span className="hover:italic hover:text-pink-400 cursor-pointer">
                    Lupa Password ?
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
        isOpen={isResetPasswordModalOpen}
        onRequestClose={() => setIsResetPasswordModalOpen(false)}
        contentLabel="Reset Password Modal"
        ariaHideApp={false}
        className="modal"
      >
        <div className="p-8">
          <div className="flex justify-between">
            <div className="font-bold text-2xl`">Reset Password</div>
            <div>
              <button
                className="text-gray-500 text-md hover:text-gray-700 mr-2"
                onClick={() => setIsResetPasswordModalOpen(false)}
              >
                X
              </button>
            </div>
          </div>
          <ResetPasswordForm />
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
        <div className="p-8 bg-pink-100 rounded-lg">
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
