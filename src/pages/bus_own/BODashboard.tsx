import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { getBusinessByOwner, deleteBusiness, deleteSellable, getUserById } from "../../api";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { Business, Sellable } from "../../interfaces.ts";
import EditSellableModal from "./EditSellableModal";
import EditBusinessModal from "./EditBusinessModal";
import CustomAlert from "../components/CustomAlert.tsx";

function BusinessOwnerDashboard() {
    const [business, setBusiness] = useState<Business | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedSellable, setSelectedSellable] = useState<Sellable | null>(null);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isEditBusinessModalOpen, setEditBusinessModalOpen] = useState(false);
    const navigate = useNavigate();

    const [alert, setAlert] = useState<{ title: string; message: string; onConfirm: () => void } | null>(null);

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
    const [userName, setUserName] = useState<string>("Owner Name");
    const user_id = localStorage.getItem("user_id") || "";

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userData = await getUserById(Number(user_id));
                setProfilePhoto(userData.profile_picture || "/pfp/default-photo.jpg");
                setUserName(userData.first_name + " " + userData.last_name || "Owner Name");
                console.log(userData.profile_picture);
            } catch (error) {
                console.error("Error fetching profile photo:", error);
            }
        };

        fetchUserProfile();
    }, [user_id]);

    useEffect(() => {
        const fetchBusiness = async () => {
            try {
                const data = await getBusinessByOwner(user_id);
                setBusiness(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBusiness();
    }, [user_id]);

    const lineChartOptions = {
        series: [
            { name: "TEAM A", type: "area", data: [44, 55, 31, 47, 31, 43, 26, 41, 31, 47, 33] },
            { name: "TEAM B", type: "line", data: [55, 69, 45, 61, 43, 54, 37, 52, 44, 61, 43] }
        ],
        chart: { height: 350, type: "line" },
        stroke: { curve: "smooth" },
        fill: { type: "solid", opacity: [0.35, 1] },
        labels: ["Dec 01", "Dec 02", "Dec 03", "Dec 04", "Dec 05", "Dec 06", "Dec 07", "Dec 08", "Dec 09", "Dec 10", "Dec 11"],
    };

    const pieChartOptions = {
        series: [44, 55, 67, 83],
        chart: { height: 350, type: "radialBar" },
        plotOptions: {
            radialBar: {
                dataLabels: { total: { show: true, label: "Total", formatter: () => 249 } }
            }
        },
        labels: ["Apples", "Oranges", "Bananas", "Berries"],
    };

    const handleEditBusiness = () => {
        setEditBusinessModalOpen(true);
    };

    const handleDeleteBusiness = async () => {
        setAlert({
            title: "Delete Business",
            message: "Are you sure you want to delete your business? This action cannot be undone.",
            onConfirm: async () => {
                try {
                    await deleteBusiness(business?.business_id || 0, Number(user_id));
                    setBusiness(null); // ✅ Reset business state to null after deletion

                    alert("Business deleted successfully!"); // ✅ Call alert BEFORE clearing state

                    setAlert(null); // ✅ Clear alert after user sees the message

                    navigate("/");
                } catch (err: any) {
                    alert("Error deleting business: " + err.message); // ✅ Ensure alert is executed first
                    setAlert(null); // ✅ Clear alert only after showing the message
                }
            },
        });
    };

    const handleEditSellable = (sellable: Sellable) => {
        setSelectedSellable(sellable);
        setEditModalOpen(true);
    };

    const handleDeleteSellable = async (sellable_id: number) => {
        setAlert({
            title: "Delete Sellable",
            message: "Are you sure you want to delete this sellable?",
            onConfirm: async () => {
                try {
                    await deleteSellable(sellable_id);

                    // ✅ Ensure business is NOT null before updating state
                    setBusiness((prevBusiness) => {
                        if (!prevBusiness) return prevBusiness; // If null, do nothing

                        return {
                            ...prevBusiness,
                            sellables: prevBusiness.sellables?.filter(s => s.sellable_id !== sellable_id) || []
                        };
                    });

                    setAlert(null); // Close alert
                    alert("Sellable deleted successfully!");
                } catch (err: any) {
                    setAlert(null);
                    alert("Error deleting sellable: " + err.message);
                }
            },
        });
    };

    if (loading) return <p className="text-white p-4">Loading...</p>;
    if (error) return <p className="text-red-500 p-4">{error}</p>;

    return (
        <div className="flex h-screen bg-gray-100 pt-20">

            <div className="flex flex-col flex-1 w-full mb-4 overflow-y-auto">
                <header className="z-1 py-4 bg-tr-0">
                    <div className="flex items-center justify-between h-8 px-6 mx-auto">
                        <h2 className="text-white text-lg font-semibold">Business Dashboard</h2>
                    </div>
                </header>

                <main className="p-6 bg-gray-100 min-h-screen text-gray-800">
                    <div className="bg-white rounded-lg shadow-lg p-6">

                        {/* ✅ Business Banner at the Top */}
                        {business?.banner && (
                            <img
                                src={business.banner}
                                alt="Business Banner"
                                className="w-full max-w-[1200px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] object-contain rounded-lg mx-auto"
                            />
                        )}

                        <div className="flex justify-between items-center my-2">
                            <div className="flex items-center">

                                {/* ✅ Business Logo beside the Business Name */}
                                {business?.logo && (
                                    <img
                                        src={business.logo}
                                        alt="Business Logo"
                                        className="h-16 w-16 object-cover rounded-full mr-4"
                                    />
                                )}

                                <div>
                                    <h3 className="text-2xl font-semibold text-gray-800">{business?.business_name}</h3>
                                    <p className="text-gray-600 mt-2">{business?.description}</p>
                                </div>
                            </div>
                            <div>
                                <button onClick={handleEditBusiness}
                                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Edit</button>
                                <button onClick={handleDeleteBusiness} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                            </div>
                        </div>
                        <p>Category: {business?.Category?.category_name}</p>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <h6 className="text-gray-800 font-bold"> Shop Analytics </h6>
                                <Chart options={lineChartOptions} series={lineChartOptions.series} type="line" height={350} />
                            </div>

                            <div className="flex flex-col">
                                <h6 className="text-gray-800 font-bold"> Products Sold / Services Availed </h6>
                                <Chart options={pieChartOptions} series={pieChartOptions.series} type="radialBar" height={350} />
                            </div>
                        </div>

                        <h4 className="text-xl font-semibold mt-6">Locations</h4>
                        <ul className="mt-2 space-y-2">
                            {business?.Locations.map(location => (
                                <li key={location.location_id} className="bg-gray-200 p-2 rounded">
                                    {business?.address}, {location.city}, {location.province} - {location.postal_code}
                                </li>
                            ))}
                        </ul>

                        <h4 className="text-xl font-semibold mt-6">Sellables</h4>
                        <table className="min-w-full divide-y divide-gray-200 mt-2">
                            <thead>
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {business?.sellables.map(sellable => (
                                <tr key={sellable.sellable_id} className="hover:bg-gray-100 group">

                                    {/* ✅ Sellable Image */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <img
                                            src={sellable.media.length > 0 ? sellable.media[0] : "/default-placeholder.png"}
                                            alt={sellable.name}
                                            className="h-16 w-16 object-cover rounded-md border border-gray-300"
                                        />
                                    </td>

                                    {/* ✅ Sellable Details */}
                                    <td className="px-6 py-4 whitespace-nowrap">{sellable.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{sellable.type}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">₱{sellable.price}</td>

                                    {/* ✅ Actions */}
                                    <td className="px-6 py-4 whitespace-nowrap flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => handleEditSellable(sellable)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                                        <button onClick={() => handleDeleteSellable(sellable.sellable_id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>

            {isEditModalOpen && selectedSellable && (
                <EditSellableModal
                    sellable={selectedSellable}
                    onClose={() => setEditModalOpen(false)}
                    onUpdate={(updatedSellable: Sellable) => {
                        setBusiness((prevBusiness) => {
                            if (!prevBusiness) return null;

                            // ✅ Create a **new array** so React detects changes
                            const updatedSellables = prevBusiness.sellables.map((s) =>
                                s.sellable_id === updatedSellable.sellable_id ? { ...s, ...updatedSellable } : s
                            );

                            return { ...prevBusiness, sellables: updatedSellables };
                        });
                    }}
                />
            )}

            {isEditBusinessModalOpen && business && (
                <EditBusinessModal
                    business={business}
                    user_id={user_id}
                    onClose={() => setEditBusinessModalOpen(false)}
                    onUpdate={(updatedBusiness: Business) =>
                        setBusiness(prevBusiness => ({
                            ...prevBusiness!,
                            ...updatedBusiness,
                            sellables: updatedBusiness.sellables || prevBusiness?.sellables || [] // Ensure sellables is always defined
                        }))
                    }
                />
            )}

            {alert && (
                <CustomAlert
                    title={alert.title}
                    message={alert.message}
                    onConfirm={alert.onConfirm}
                    onCancel={() => setAlert(null)}
                />
            )}

        </div>

    );
}

export default BusinessOwnerDashboard;