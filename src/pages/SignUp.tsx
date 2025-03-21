import { FaGoogle, FaPhoneAlt } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { registerUser } from "../api.ts";

function SignUpForm() {
    const navigate = useNavigate();

    const [isNum, setIsNum] = useState(false);
    const [isEmail, setIsEmail] = useState(true); // Default state for email

    const [error, setError] = useState<string | null>(null); // Error state
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        password: '',
        user_type: 'CUSTOMER', // Default user type
    });

    // Handle switching between email and phone sign-in
    const numButton = () => {
        setIsNum(true);
        setIsEmail(false);
    };
    const emButton = () => {
        setIsNum(false);
        setIsEmail(true);
    };

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle sign-up
    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await registerUser({
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: isEmail ? formData.email : undefined,
                phone_number: isNum ? formData.phone_number : undefined,
                password: formData.password,
                user_type: formData.user_type as "CUSTOMER" | "BUSINESS_OWNER",
            });

            navigate(-1);
        } catch (error: any) {
            setError(error.message); // Show error message in UI
        }
    };

    return (
        <section className="min-h-screen flex items-stretch text-white">
            {/* Left Side - Image Section */}
            <div
                className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center"
                style={{ backgroundImage: 'url(/pics/trompo.png)' }}
            >
                <div className="p-6">
                    <IoArrowBackCircleOutline
                        className="text-gray-800 w-16 h-16 cursor-pointer"
                        onClick={() => navigate("/")}
                    />
                </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0 bg-[#fcfbf7]">
                <div className="w-full py-6 z-20">
                    <div className="flex items-center justify-center">
                        <img src="/logo.svg" alt="logo" className="h-20" />
                    </div>

                    <p className="text-tr-0">{error}</p>

                    {/* Social and Phone/Email Buttons */}
                    <div className="py-6 flex space-x-4 justify-center">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray-800">
                            <FaGoogle className="text-gray-800 cursor-pointer" />
                        </div>
                        <div className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray-800">
                            <MdMail className="text-gray-800 cursor-pointer" onClick={emButton} />
                        </div>
                        <div className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray-800">
                            <FaPhoneAlt className="text-gray-800 cursor-pointer" onClick={numButton} />
                        </div>
                    </div>

                    <p className="text-gray-800">Sign up and join trompo now!</p>

                    {/* Email Sign Up Form */}
                    {isEmail && (
                        <form className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto" onSubmit={handleSignUp}>
                            <div className="pb-2 pt-4">
                                <input
                                    type="text"
                                    name="first_name"
                                    id="first_name"
                                    placeholder="First Name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    className="block w-full p-4 text-lg rounded-sm bg-tr-0 text-gray-100 placeholder-gray-100"
                                />
                            </div>
                            <div className="pb-2 pt-4">
                                <input
                                    type="text"
                                    name="last_name"
                                    id="last_name"
                                    placeholder="Last Name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    className="block w-full p-4 text-lg rounded-sm bg-tr-0 text-gray-100 placeholder-gray-100"
                                />
                            </div>
                            <div className="pb-2 pt-4">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="block w-full p-4 text-lg rounded-sm bg-tr-0 text-gray-100 placeholder-gray-100"
                                />
                            </div>
                            <div className="pb-2 pt-4">
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="block w-full p-4 text-lg rounded-sm bg-tr-0 text-gray-100 placeholder-gray-100"
                                />
                            </div>

                            <p className="text-tr-0 pt-4">What are you joining <em><b>trompo</b></em> for?</p>
                            <div className="grid grid-cols-2 gap-2 w-full max-w-screen-sm">
                                <div className="pb-2 pt-4 text-tr-0">
                                    <input
                                        className="hidden"
                                        id="radio_1"
                                        type="radio"
                                        name="radio"
                                        checked={formData.user_type === "CUSTOMER"}
                                        onChange={() => setFormData({ ...formData, user_type: "CUSTOMER" })}
                                    />
                                    <label className="flex flex-col p-4 border-2 border-gray-400 cursor-pointer" htmlFor="radio_1">
                                        <span className="text-xs font-semibold uppercase">Customer</span>
                                        <span className="text-xl font-bold mt-2">To shop</span>
                                    </label>
                                </div>
                                <div className="pb-2 pt-4 text-tr-0">
                                    <input
                                        className="hidden"
                                        id="radio_2"
                                        type="radio"
                                        name="radio"
                                        checked={formData.user_type === "BUSINESS_OWNER"}
                                        onChange={() => setFormData({ ...formData, user_type: "BUSINESS_OWNER" })}
                                    />
                                    <label className="flex flex-col p-4 border-2 border-gray-400 cursor-pointer" htmlFor="radio_2">
                                        <span className="text-xs font-semibold uppercase">Business Owner</span>
                                        <span className="text-xl font-bold mt-2">To sell</span>
                                    </label>
                                </div>
                            </div>

                            <div className="px-4 pb-2 pt-4">
                                <button
                                    type="submit"
                                    className="uppercase block w-full p-4 text-lg rounded-full bg-tr-0 hover:border-gray-800 focus:outline-none"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Phone Number Sign Up Form */}
                    {isNum && (
                        <form className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto" onSubmit={handleSignUp}>
                            <div className="pb-2 pt-4">
                                <input
                                    type="text"
                                    name="first_name"
                                    id="first_name"
                                    placeholder="First Name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    className="block w-full p-4 text-lg rounded-sm bg-tr-0 text-gray-100 placeholder-gray-100"
                                />
                            </div>
                            <div className="pb-2 pt-4">
                                <input
                                    type="text"
                                    name="last_name"
                                    id="last_name"
                                    placeholder="Last Name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    className="block w-full p-4 text-lg rounded-sm bg-tr-0 text-gray-100 placeholder-gray-100"
                                />
                            </div>
                            <div className="pb-2 pt-4">
                                <input
                                    type="tel"
                                    name="phone_number"
                                    placeholder="Phone Number"
                                    value={formData.phone_number}
                                    onChange={handleChange}
                                    className="block w-full p-4 text-lg rounded-sm bg-tr-0 text-gray-100 placeholder-gray-100"
                                />
                            </div>
                            <div className="pb-2 pt-4">
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="block w-full p-4 text-lg rounded-sm bg-tr-0 text-gray-100 placeholder-gray-100"
                                />
                            </div>

                            <p className="text-tr-0 pt-4">What are you joining <em><b>trompo</b></em> for?</p>
                            <div className="grid grid-cols-2 gap-2 w-full max-w-screen-sm">
                                <div className="pb-2 pt-4 text-tr-0">
                                    <input
                                        className="hidden"
                                        id="radio_1"
                                        type="radio"
                                        name="radio"
                                        checked={formData.user_type === "CUSTOMER"}
                                        onChange={() => setFormData({ ...formData, user_type: "CUSTOMER" })}
                                    />
                                    <label className="flex flex-col p-4 border-2 border-gray-400 cursor-pointer" htmlFor="radio_1">
                                        <span className="text-xs font-semibold uppercase">Customer</span>
                                        <span className="text-xl font-bold mt-2">To shop</span>
                                    </label>
                                </div>
                                <div className="pb-2 pt-4 text-tr-0">
                                    <input
                                        className="hidden"
                                        id="radio_2"
                                        type="radio"
                                        name="radio"
                                        checked={formData.user_type === "BUSINESS_OWNER"}
                                        onChange={() => setFormData({ ...formData, user_type: "BUSINESS_OWNER" })}
                                    />
                                    <label className="flex flex-col p-4 border-2 border-gray-400 cursor-pointer" htmlFor="radio_2">
                                        <span className="text-xs font-semibold uppercase">Business Owner</span>
                                        <span className="text-xl font-bold mt-2">To sell</span>
                                    </label>
                                </div>
                            </div>

                            <div className="px-4 pb-2 pt-4">
                                <button
                                    type="submit"
                                    className="uppercase block w-full p-4 text-lg rounded-full bg-tr-0 hover:border-gray-800 focus:outline-none"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    )}

                </div>
            </div>
        </section>
    );
}

export default SignUpForm;