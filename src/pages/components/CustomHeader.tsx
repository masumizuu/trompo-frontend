import { useEffect, useState } from "react";
import { getUserById } from "../../api"; // Adjust based on actual API path
import {Link, useNavigate} from "react-router-dom";
import CustomAlert from "./CustomAlert";
import { CiCircleChevDown } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { PiChatCircleTextLight } from "react-icons/pi";
import logo from "../../../public/trompo.svg";

const CustomHeader = () => {

    const navigate = useNavigate();
    const [alert, setAlert] = useState<{title: string; message: string; onConfirm: () => void } | null>(null);

    const handleLogout = () => {
        setAlert({
            title: "Logout",
            message: "Are you sure you want to log out?",
            onConfirm: () => {
                localStorage.clear();
                setTimeout(() => {
                    navigate("/");
                    setAlert(null);
                }, 1000); // ✅ Adds delay before navigating
            },
        });
    };

    const [profilePhoto, setProfilePhoto] = useState<string>("/pfp/default-photo.jpg");
    const [userName, setUserName] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string>("");
    const [userType, setUserType] = useState<string>("");
    const [userData, setUserData] = useState<any>(null); // Store user data here
    const user_id = localStorage.getItem("user_id") || "";

    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (!user_id) return;
            try {
                const userData = await getUserById(Number(user_id));
                setUserData(userData); // Update userData state

            } catch (error) {
                console.error("Error fetching profile photo:", error);
            }
        };

        fetchUserProfile(); // Re-fetch when user_id changes
    }, [user_id]); // Dependency on user_id ensures it fetches when user_id changes

    useEffect(() => {
        // Update profile information when userData changes
        if (userData) {
            setProfilePhoto(userData.profile_picture || "/pfp/default-photo.jpg");
            setUserName(`${userData.first_name} ${userData.last_name}`);
            setUserEmail(userData.email || "user@email.com");
            setUserType(userData.user_type);
        }
    }, [userData]); // Re-run when userData changes

    return (
        <>

            <header className="flex flex-row items-center h-20 px-6 sm:px-8 bg-white/50 shadow-lg border border-white/20 backdrop-blur-lg w-full justify-between">

                {/* logo */}
                <div className="relative w-full max-w-md mr-2 flex flex-row gap-4">

                    <img src={logo} alt="logo" className="h-10 cursor-pointer" onClick={() => navigate("/")}/>

                    <input
                        type="text"
                        placeholder="Search..."
                        className={`py-2 pl-6 pr-4 w-full border-2 placeholder-gray-600 focus:bg-gray-50 rounded-lg text-gray-500 bg-transparent border-tr-0 
                    ${user_id ? "opacity-100" : "opacity-0 disabled cursor-default"}`}
                    />
                </div>

                <div className="flex">
                    {user_id ? (
                        <div className="flex items-center">
                            <div className="hidden md:flex md:flex-row md:items-center md:leading-tight text-tr-0">
                            <span className="flex flex-col text-right">
                                <span className="font-semibold">{userName}</span>
                                <span className="text-sm text-gray-600">{userEmail}</span>
                            </span>
                                <span className="h-12 w-12 ml-2 sm:ml-3 mr-2 bg-gray-100 rounded-full overflow-hidden">
                                <img src={profilePhoto} alt="user profile photo"
                                     className="h-full w-full object-cover"/>
                            </span>

                                <div className="cursor-pointer"
                                     onClick={() => setDropdownOpen(!dropdownOpen)}
                                >
                                    <span className="text-3xl"><CiCircleChevDown/></span>

                                    {dropdownOpen && (
                                        <div className="absolute right-6 mt-2 w-40 bg-white border border-gray-300 shadow-lg rounded-md">
                                            <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                                Profile
                                            </Link>

                                            {/* ✅ Conditionally Show "Dashboard" Based on User Type */}
                                            {(userType === "ADMIN" || userType === "BUSINESS_OWNER") && (
                                                <Link
                                                    to={userType === "ADMIN" ? "/admin-dashboard" : "/business-dashboard"}
                                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                                >
                                                    Dashboard
                                                </Link>
                                            )}

                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-tr-0 border-0 bg-transparent"
                                            >
                                                Log Out
                                            </button>
                                        </div>
                                    )}

                                </div>

                                <div className="border-l pl-3 ml-3 space-x-1">

                                    <button
                                        className="relative p-2 bg-transparent text-tr-0 hover:bg-gray-100 hover:text-darkTR-0 focus:bg-gray-100 focus:text-darkTR-0 rounded-full border-transparent hover:border-transparent">
                                        <span className="sr-only">Notifications</span>
                                        <span className="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full"></span>
                                        <span className="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full animate-ping"></span>
                                        <IoIosNotificationsOutline className="text-3xl text-tr-0"/>
                                    </button>

                                    <button
                                        className="relative p-2 bg-transparent text-tr-0 hover:bg-gray-100 hover:text-darkTR-0 focus:bg-gray-100 focus:text-darkTR-0 rounded-full border-transparent hover:border-transparent"
                                        onClick={() => navigate(`/chat/${user_id}`)}>
                                        <span className="sr-only">Chats</span>
                                        <span className="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full"></span>
                                        <span className="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full animate-ping"></span>
                                        <PiChatCircleTextLight className="text-3xl text-tr-0"/>
                                    </button>

                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex gap-6">
                            <button className="px-4 py-2 border rounded-md text-sm hover:border-tr-0 hover:bg-tr-0"
                                    onClick={() => navigate("/login")}>Login
                            </button>
                            <button className="px-4 py-2 border rounded-md text-sm hover:border-tr-0 hover:bg-tr-0"
                                    onClick={() => navigate("/signup")}>Signup
                            </button>
                        </div>
                    )}
                </div>


            </header>

            {alert && (
                <CustomAlert
                    title={alert.title}
                    message={alert.message}
                    onConfirm={alert.onConfirm}
                    onCancel={() => setAlert(null)}
                />
            )}

        </>

    );
};

export default CustomHeader;
