import React, { useEffect, useState } from "react";
import { getUserById, getBusinessByOwner } from "../api";
import { User, Business } from "../interfaces";

const Profile: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [businesses, setBusinesses] = useState<Business[]>([]);
    const userId = localStorage.getItem("user_id") || "";

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUserById(Number(userId));
                setUser(userData);

                if (userData.user_type === "BUSINESS_OWNER") {
                    const userBusiness = await getBusinessByOwner(userId);

                    console.log("Business owned:", userBusiness); // ✅ Debugging

                    // Ensure it's a valid object before setting state
                    setBusinesses(userBusiness && typeof userBusiness === "object" ? [userBusiness] : []);
                }
            } catch (error) {
                console.error("Failed to fetch user or business:", error);
            }
        };

        fetchUser();
    }, [userId]);



    return (
        <main className="profile-page">
            {/* ✅ Profile Banner */}
            <section className="relative block h-60 bg-[#bc1823]">
                <div className="absolute top-0 w-full h-full bg-[#bc1823]"></div>
                <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16">
                    <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2560 100">
                        <polygon className="text-white fill-current" points="2560 0 2560 100 0 100"></polygon>
                    </svg>
                </div>
            </section>

            {/* ✅ Profile Details */}
            <section className="relative py-16 bg-gray-200">
                <div className="container mx-auto px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-40">
                        <div className="py-10">

                            {/* ✅ User Picture */}
                            <div className="flex flex-wrap justify-center">
                                {/* ✅ Profile Picture */}
                                <div className="w-full px-4 flex justify-center items-center">
                                    <div className="relative">
                                        <img
                                            alt="Profile"
                                            src={user?.profile_picture || "/default-profile.jpg"}
                                            className="shadow-xl rounded-full h-36 w-36 border-4 border-white mt-4"
                                        />
                                    </div>
                                </div>

                                {/* edit profile button */}
                                <button className="absolute top-6 right-6 bg-black text-white font-bold px-4 py-2 rounded hover:shadow-md transition-all">
                                    Edit Profile
                                </button>
                            </div>

                            {/* ✅ User Details */}
                            <div className="text-center mb-12">
                                <h3 className="text-4xl font-semibold leading-normal text-gray-700">
                                    {user?.first_name} {user?.last_name}
                                </h3>
                                <p className="text-sm text-gray-500 font-bold uppercase mt-2">
                                    {user?.email}
                                </p>
                                <p className="text-gray-600 mt-2">
                                    <i className="fas fa-briefcase mr-2"></i>
                                    {user?.user_type === "BUSINESS_OWNER" ? "Business Owner" : "Customer"}
                                </p>
                            </div>

                            {/* ✅ Business Section for Business Owners */}
                            {user?.user_type === "BUSINESS_OWNER" && businesses.length > 0 && (
                                <div className="mt-6 bg-gray-100 rounded-lg shadow-md p-6 mx-6">
                                    <h4 className="text-xl font-semibold text-gray-700 mb-4">
                                        My Business
                                    </h4>

                                    <div className="flex flex-col sm:flex-row items-center bg-white p-4 rounded-lg shadow">
                                        {/* ✅ Business Logo */}
                                        <img
                                            src={businesses[0].logo || "/default-logo.png"}
                                            alt={`${businesses[0].business_name} Logo`}
                                            className="h-20 w-20 object-cover rounded-full border border-gray-300"
                                        />

                                        {/* ✅ Business Details */}
                                        <div className="ml-4 text-center sm:text-left">
                                            <h5 className="text-lg font-bold text-gray-900">
                                                {businesses[0].business_name}
                                            </h5>
                                            <p className="text-sm text-gray-600">{businesses[0].address}</p>
                                            <p className="text-sm text-gray-600">📞 {businesses[0].contact_number || "No contact info"}</p>
                                        </div>
                                    </div>

                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Profile;