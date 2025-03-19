import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBusinessById, getUserById } from "../api";
import { Business, Sellable, User } from "../interfaces";
import { BsShopWindow } from "react-icons/bs";

const StoreView: React.FC = () => {
    const navigate = useNavigate();
    const { businessId } = useParams();
    const [business, setBusiness] = useState<Business | null>(null);
    const [sellables, setSellables] = useState<Sellable[]>([]);
    const [owner, setOwner] = useState<User | null>(null); // ✅ Owner state

    useEffect(() => {
        const fetchBusiness = async () => {
            try {
                const businessData = await getBusinessById(Number(businessId));
                console.log("Fetched Business Data:", businessData); // ✅ Debugging
                setBusiness(businessData);
                setSellables(businessData.sellables || []);

                // ✅ Fetch owner details using user_id from business
                if (businessData.user_id) {
                    const ownerData = await getUserById(businessData.user_id);
                    setOwner(ownerData);
                }
            } catch (error) {
                console.error("Failed to fetch business details:", error);
            }
        };

        fetchBusiness();
    }, [businessId]);

    if (!business) return <p className="text-center text-gray-500 py-10">Loading business details...</p>;

    return (
        <main className="store-view">
            {/* ✅ Business Banner */}
            <section className="relative block h-60 bg-gray-300">
                <img src={business.banner || "/default-banner.png"} alt="Business Banner"
                     className="absolute w-full h-full object-cover"/>
                <div className="absolute top-0 w-full h-full bg-black/30"></div>
                <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16">
                    <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 2560 100">
                        <polygon className="text-white fill-current" points="2560 0 2560 100 0 100"></polygon>
                    </svg>
                </div>
            </section>

            {/* ✅ Business Details */}
            <section className="relative py-16 bg-gray-200">
                <div className="container mx-auto px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-40">
                        <div className="py-10">

                            {/* ✅ Business Logo */}
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full px-4 flex justify-center items-center">
                                    <div className="relative">
                                        <img
                                            alt="Business Logo"
                                            src={business.logo || "/default-logo.png"}
                                            className="shadow-xl rounded-full h-36 w-36 border-4 border-white mt-4"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* ✅ Business Details */}
                            <div className="text-center mb-12">
                                <h3 className="text-4xl font-semibold leading-normal text-gray-700">
                                    {business.business_name}
                                </h3>
                                <p className="text-sm text-gray-500 font-bold uppercase mt-2">
                                    {business.Category.category_name || "No category"}
                                </p>
                                <p className="text-gray-600 mt-2">
                                    <i className="fas fa-map-marker-alt mr-2"></i>
                                    {business.address}
                                </p>
                                <p className="text-gray-600 mt-2">
                                    📞 {business.contact_number || "No contact info"}
                                </p>
                                {/* ✅ Owner Details */}
                                <p className="text-gray-600 mt-2">
                                    🏠 Owned by: {owner ? `${owner.first_name} ${owner.last_name}` : "Loading..."}
                                </p>
                            </div>

                            {/* ✅ Sellables Grid */}
                            <div id="sellables" className="mt-6 bg-gray-100 rounded-lg shadow-md p-6 mx-6">
                                <h4 className="text-xl font-semibold text-gray-700 mb-4">
                                    Products & Services
                                </h4>

                                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {sellables.map((sellable) => (
                                        <li key={sellable.sellable_id}>
                                            <a href="#" className="group block overflow-hidden">
                                                <img
                                                    src={sellable.media[0] || "/default-product.png"}
                                                    alt={sellable.name}
                                                    className="h-72 object-cover transition duration-500 group-hover:scale-105 rounded-lg"
                                                />
                                                <div className="relative bg-transparent pt-3 py-4">
                                                    <h3 className="text-gray-700 group-hover:underline group-hover:underline-offset-4 group-hover:text-tr-0">
                                                        {sellable.name}
                                                    </h3>
                                                    <p className="text-gray-500 mt-2">
                                                        ₱{sellable.price} • {sellable.is_active ? "In Stock" : "Out of Stock"}
                                                    </p>
                                                    <span className="flex flex-row gap-2 items-center text-gray-500 mt-2">
                                                        <BsShopWindow className="text-xl"/>
                                                        <p className="text-sm">{business.business_name}</p>
                                                    </span>
                                                </div>
                                            </a>
                                        </li>
                                    ))}
                                </ul>

                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default StoreView;