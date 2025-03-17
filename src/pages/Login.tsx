import { FaGoogle, FaPhoneAlt } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { IoArrowBackCircleOutline} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../api";

function LoginForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const data = await loginUser(email, password);

            // Store token and user type in localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("user_type", data.user.user_type);
            localStorage.setItem("profile_photo", data.user.profile_photo);
            localStorage.setItem("user_id", data.user.user_id.toString());

            // Redirect based on user_type
            if (data.user.user_type === "ADMIN") {
                navigate("/admin-dashboard"); // Placeholder - replace with actual route
            } else if (data.user.user_type === "BUSINESS_OWNER") {
                navigate("/business-dashboard"); // Placeholder - replace with actual route
            } else if (data.user.user_type === "CUSTOMER") {
                navigate("/customer-home"); // Placeholder - replace with actual route
            }
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <section className="min-h-screen flex items-stretch text-white">
            {/* Left Side - Image Section */}
            <div className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center"
                 style={{ backgroundImage: 'url(/pics/trompo.png)' }}>

                <div className="p-6">
                    <IoArrowBackCircleOutline className="text-gray-800 w-16 h-16 cursor-pointer" onClick={() => navigate("/")}/>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0 bg-[#fcfbf7]">

                <div className="w-full py-6 z-20">
                    <div className="flex items-center justify-center">
                        <img src="/logo.svg" alt="logo" className="h-20"/>
                    </div>
                    <div className="py-6 flex space-x-4 justify-center">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray-800">
                            <FaGoogle className="text-gray-800" />
                        </div>
                        <div className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray-800">
                            <MdMail className="text-gray-800" />
                        </div>
                        <div className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray-800">
                            <FaPhoneAlt className="text-gray-800" />
                        </div>
                    </div>

                    <p className="text-gray-800">Login with your account.</p>

                    <form className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto" onSubmit={handleLogin}>
                        <div className="pb-2 pt-4">
                            <input type="email" name="email" id="email" placeholder="Email"
                                   onChange={(e) => setEmail(e.target.value)}
                                   className="block w-full p-4 text-lg rounded-sm bg-tr-0 text-gray-100 placeholder-gray-100"/>
                        </div>
                        <div className="pb-2 pt-4">
                            <input type="password" name="password" id="password" placeholder="Password"
                                   onChange={(e) => setPassword(e.target.value)}
                                   className="block w-full p-4 text-lg rounded-sm bg-tr-0 text-gray-100 placeholder-gray-100"/>
                        </div>
                        <div className="text-right text-tr-0 hover:underline">
                            <a href="#">Forgot your password?</a>
                        </div>
                        <div className="px-4 pb-2 pt-4">
                            <button type="submit"
                                className="uppercase block w-full p-4 text-lg rounded-full bg-tr-0 hover:border-gray-800 focus:outline-none">
                                Log In
                            </button>
                        </div>

                        {error && (
                            <p className="text-red-500">{error}</p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
}

export default LoginForm;