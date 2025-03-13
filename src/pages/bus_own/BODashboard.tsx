import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { getBusinessByOwner, deleteBusiness, deleteSellable } from "../../api";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { Business, Sellable } from "../../interfaces.ts";
import EditSellableModal from "./EditSellableModal";
import EditBusinessModal from "./EditBusinessModal";

function BusinessOwnerDashboard() {
    const [business, setBusiness] = useState<Business | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedSellable, setSelectedSellable] = useState<Sellable | null>(null);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isEditBusinessModalOpen, setEditBusinessModalOpen] = useState(false);
    const navigate = useNavigate();

    const user_id = localStorage.getItem("user_id") || "";
    const profile_photo = localStorage.getItem("profile_picture") || "/default-photo.jpg";

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
        if (window.confirm("Are you sure you want to delete your business? This action cannot be undone.")) {
            try {
                await deleteBusiness(business!.business_id, Number(user_id));
                alert("Business deleted successfully!");
                navigate("/");
            } catch (err: any) {
                alert("Error deleting business: " + err.message);
            }
        }
    };

    const handleEditSellable = (sellable: Sellable) => {
        setSelectedSellable(sellable);
        setEditModalOpen(true);
    };

    const handleDeleteSellable = async (sellable_id: number) => {
        if (window.confirm("Are you sure you want to delete this sellable?")) {
            try {
                await deleteSellable(sellable_id);
                setBusiness({
                    ...business!,
                    sellables: business?.sellables.filter(s => s.sellable_id !== sellable_id) || []
                });
                alert("Sellable deleted successfully!");
            } catch (err: any) {
                alert("Error deleting sellable: " + err.message);
            }
        }
    };

    if (loading) return <p className="text-white p-4">Loading...</p>;
    if (error) return <p className="text-red-500 p-4">{error}</p>;

    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="z-20 flex-shrink-0 hidden w-60 pl-2 overflow-y-auto md:block bg-tr-0">
                <div className="text-white">
                    <div className="flex p-2">
                        <div className="flex py-3 px-2 items-center">
                            <img src="/trompo.svg" alt="trompo" className="h-5 w-5" />
                            <p className="ml-2 font-semibold italic">TROMPO</p>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div>
                            <img className="h-24 w-24 rounded-full object-cover border-4 border-green-400" src={profile_photo} alt="Profile" />
                            <p className="text-base text-gray-100 pt-2 text-center w-24">Business Owner</p>
                        </div>
                    </div>
                    <div className="flex flex-row p-4 gap-2 text-gray-100 cursor-pointer hover:underline" onClick={() => navigate("/")}>
                        <span><CiLogout className="h-7 w-7 font-bold" /></span>
                        <span>Log Out</span>
                    </div>
                </div>
            </aside>

            <div className="flex flex-col flex-1 w-full overflow-y-auto">
                <header className="z-40 py-4 bg-tr-0">
                    <div className="flex items-center justify-between h-8 px-6 mx-auto">
                        <h2 className="text-white text-lg font-semibold">Business Dashboard</h2>
                    </div>
                </header>

                <main className="p-6 bg-gray-100 min-h-screen text-gray-800">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-2xl font-semibold text-gray-800">{business?.business_name}</h3>
                                <p className="text-gray-600 mt-2">{business?.description}</p>
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
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {business?.sellables.map(sellable => (
                                <tr key={sellable.sellable_id} className="hover:bg-gray-100 group">
                                    <td className="px-6 py-4 whitespace-nowrap">{sellable.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{sellable.type}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">₱{sellable.price}</td>
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

        </div>
    );
}

export default BusinessOwnerDashboard;