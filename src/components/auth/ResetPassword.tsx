import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Footer from "@components/Footer";
import Navbar from "@components/Navbar";

const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleResetPassword = () => {
        if (!email || !password || !confirmPassword) {
            setErrorMessage("Please fill in all fields.");
        } else if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
        } else {
            console.log("Reset password logic");
            // Perform reset password logic here
        }
    };

    return (
        <>
            <Navbar />
            <div className="py-36 bg-gray-100 h-screen flex justify-center items-center">
                <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
                    <h2 className="text-2xl mb-4">Reset Password</h2>
                    {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                            <input type="email" id="email" className="mt-1 p-2 border rounded w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password:</label>
                            <div className="relative">
                                <input type={showPassword ? "text" : "password"} id="password" className="mt-1 p-2 border rounded w-full" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <button type="button" className="absolute top-0 right-0 mt-4 mr-2" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FiEyeOff /> : <FiEye />}
                                </button>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password:</label>
                            <div className="relative">
                                <input type={showConfirmPassword ? "text" : "password"} id="confirmPassword" className="mt-1 p-2 border rounded w-full" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                <button type="button" className="absolute top-0 right-0 mt-4 mr-2" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                                </button>
                            </div>
                        </div>
                        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={handleResetPassword}>Reset Password</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ResetPassword;
