import React, { useEffect, useState } from 'react';
import { FaFileCircleCheck } from 'react-icons/fa6';
import { FaEdit, FaTrash, FaUserAlt, FaUserCheck } from 'react-icons/fa';
import { IoStorefront } from 'react-icons/io5';
import { TbMessageReportFilled } from 'react-icons/tb';
import { MdRateReview } from 'react-icons/md';
import { RiLogoutCircleLine } from "react-icons/ri";
import { editUser, deleteUser, getAllUsers, getAllBusinesses, resolveDispute, getAllDisputes, deleteReview, getAllReviews, reviewUserVerification, reviewBusinessVerification, getUserVerifications, getBusinessVerifications } from "../../api";
import EditUserModal from "./components/EditUserModal.tsx";
import DisputeModal from "./components/DisputeModal.tsx";
import ReviewModal from "./components/ReviewModal.tsx";
import RequestModal from "./components/RequestModal.tsx";
import { useNavigate } from "react-router-dom";
import { User, Business, Dispute, Review, UserVerification, VerificationRequest } from "../../interfaces";
import UserVerificationModal from "./components/UserVerificationModal.tsx";
import CustomAlert from "../components/CustomAlert";



const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();
    const id = localStorage.getItem("user_id");
    const adminId = Number(id);

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

    const [isUsers, setIsUsers] = useState<boolean>(true); // default
    const [isBusi, setIsBusi] = useState<boolean>(false);
    const [isDispute, setIsDispute] = useState<boolean>(false);
    const [isReviews, setIsReviews] = useState<boolean>(false);
    const [isVerifications, setIsVerifications] = useState<boolean>(false);
    const [isUserVerifications, setIsUserVerifications] = useState<boolean>(false);

    const [users, setUsers] = useState<User[]>([]);

    const [businesses, setBusinesses] = useState<Business[]>([]);

    const [disputes, setDisputes] = useState<Dispute[]>([]);
    const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);

    const [reviews, setReviews] = useState<Review[]>([]);
    const [selectedReview, setSelectedReview] = useState<Review | null>(null);

    const [userVerifications, setUserVerifications] = useState<UserVerification[]>([]);
    const [selectedVerification, setSelectedVerification] = useState<UserVerification | null>(null);
    const [businessVerifications, setBusinessVerifications] = useState<VerificationRequest[]>([]);
    const [selectedRequest, setSelectedRequest] = useState<VerificationRequest | null>(null);

    // displays
    useEffect(() => {
        if (isUsers) fetchUsers();
        if (isBusi) fetchBusinesses();
        if (isDispute) fetchDisputes();
        if (isReviews) fetchReviews();
        if (isUserVerifications) fetchUserVerifications();
        if (isVerifications) fetchBusinessVerifications();
}, [isUsers, isBusi, isDispute, isReviews, isUserVerifications, isVerifications]);

    const fetchUsers = async () => {
        try {
            const response = await getAllUsers();
            setUsers(response);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };
    const fetchBusinesses = async () => {
        try {
            const response = await getAllBusinesses();
            setBusinesses(response);
        } catch (error) {
            console.error('Failed to fetch businesses:', error);
        }
    };
    const fetchDisputes = async () => {
        try { setDisputes(await getAllDisputes()); } catch (error) {
            console.error('Failed to fetch disputes:', error);
        }
    };
    const fetchReviews = async () => {
        try { setReviews(await getAllReviews()); } catch (error) {
            console.error('Failed to fetch reviews:', error);
        }
    };
    const fetchUserVerifications = async () => {
        try { setUserVerifications(await getUserVerifications()); } catch (error) {
            console.error('Failed to fetch user verifications:', error);
        }
    };
    const fetchBusinessVerifications = async () => {
        try { setBusinessVerifications(await getBusinessVerifications()); } catch (error) {
            console.error('Failed to fetch business verifications:', error);
        }
    };

    const toggleView = (view: string) => {
        setIsUsers(view === 'users');
        setIsBusi(view === 'businesses');
        setIsDispute(view === 'disputes');
        setIsReviews(view === 'reviews');
        setIsVerifications(view === 'verifications');
        setIsUserVerifications(view === 'userVerifications');
    };

    // USERS
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const handleEditUser = (user: User) => {
        setSelectedUser(user);
    };
    const closeModal = () => setSelectedUser(null);
    const saveUser = async (updatedUser: Partial<User>) => {
        await editUser(selectedUser!.user_id, updatedUser);
        closeModal();
        fetchUsers();  // Refresh list
    };
    const handleDeleteUser = async (userId: number, userType: string) => {
        if (userType === 'BUSINESS_OWNER') {
            setAlert({
                title: "Action Not Allowed",
                message: "Cannot delete a business owner directly. Delete the business first.",
                onConfirm: () => setAlert(null),
            });
            return;
        }

        setAlert({
            title: "Delete User",
            message: "Are you sure you want to delete this user? This action cannot be undone.",
            onConfirm: async () => {
                try {
                    await deleteUser(userId);
                    setAlert({
                        title: "Success",
                        message: "User deleted successfully.",
                        onConfirm: () => {
                            setAlert(null);
                            fetchUsers(); // Refresh the list
                        },
                    });
                } catch (error: any) {
                    setAlert({
                        title: "Error",
                        message: error.message || "Failed to delete user.",
                        onConfirm: () => setAlert(null),
                    });
                }
            },
        });
    };

    // BUSINESSES

    // DISPUTES
    const closeDispute = () => setSelectedDispute(null);
    const handleResolveDispute = async (disputeId: number, adminResponse: string) => {
        try {
            await resolveDispute(disputeId, "RESOLVED", adminResponse);
            fetchDisputes();
            closeDispute();
        } catch (error) {
            console.error("Error resolving dispute:", error);
        }
    };

    return (
        <div className="h-full w-full flex overflow-hidden antialiased text-gray-800 bg-white min-h-screen">
            {/* Sidebar */}
            <nav className="flex-none flex flex-col items-center text-center bg-white text-gray-400 border-r">
                <div className="h-16 flex items-center w-full">
                    <img className="h-6 w-6 mx-auto" src="/trompo.svg" alt="Logo" />
                </div>
                <div className="flex flex-col items-center p-6">
                    <ul className="w-full">
                        <SidebarItem icon={<FaUserAlt />} onClick={() => toggleView('users')} />
                        <SidebarItem icon={<IoStorefront />} onClick={() => toggleView('businesses')} />
                        <SidebarItem icon={<TbMessageReportFilled />} onClick={() => toggleView('disputes')} />
                        <SidebarItem icon={<MdRateReview />} onClick={() => toggleView('reviews')} />
                        <SidebarItem icon={<FaUserCheck />} onClick={() => toggleView('userVerifications')} />
                        <SidebarItem icon={<FaFileCircleCheck />} onClick={() => toggleView('verifications')} />
                        <SidebarItem icon={<RiLogoutCircleLine />} onClick={handleLogout} />
                    </ul>
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <header className="flex h-16 bg-gray-100 border-t px-4 items-center">
                    <h1 className="font-semibold text-lg">Admin Dashboard</h1>
                </header>
                <main className="flex-grow flex min-h-0 border-t">
                    {isUsers && (
                        <section className="p-4 w-full">
                            <h2 className="font-bold text-tr-0 mb-4">Users</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow">
                                    <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <tr>
                                        <th className="py-3 px-6 text-left">Name</th>
                                        <th className="py-3 px-6 text-left">Email</th>
                                        <th className="py-3 px-6 text-left">Phone</th>
                                        <th className="py-3 px-6 text-left">Role</th>
                                        <th className="py-3 px-6 text-left">Verified</th>
                                        <th className="py-3 px-6 text-left">Registered Date</th>
                                        <th className="py-3 px-6 text-left">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody className="text-gray-600 text-sm">
                                    {users.map((user) => (
                                        <tr key={user.user_id} className="border-b hover:bg-gray-100 group">
                                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                                {user.first_name} {user.last_name}
                                            </td>
                                            <td className="py-3 px-6 text-left">{user.email}</td>
                                            <td className="py-3 px-6 text-left">{user.phone_number}</td>
                                            <td className="py-3 px-6 text-left">{user.user_type}</td>
                                            <td className="py-3 px-6 text-left">
                                                {user.is_verified ? "✅" : "❌"}
                                            </td>
                                            <td className="py-3 px-6 text-left">
                                                {new Date(user.date_registered).toLocaleDateString()}
                                            </td>
                                            <td className="py-3 px-6 text-left">
                                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        className="text-green-500 hover:text-green-700"
                                                        onClick={() => handleEditUser(user)}
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                    <button
                                                        className="text-red-500 hover:text-red-700"
                                                        onClick={() => handleDeleteUser(user.user_id, user.user_type)}
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                    {selectedUser && (
                                        <EditUserModal
                                            user={selectedUser}
                                            onClose={closeModal}
                                            onSave={saveUser}
                                        />
                                    )}
                                </table>
                            </div>
                        </section>
                    )}
                    {isBusi && (
                        <section className="p-4 w-full">
                            <h2 className="font-bold text-tr-0 mb-4">Businesses</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow">
                                    <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <tr>
                                        <th className="py-3 px-6 text-left">Name</th>
                                        <th className="py-3 px-6 text-left">Owned by</th>
                                        <th className="py-3 px-6 text-left">Description</th>
                                        <th className="py-3 px-6 text-left">Category</th>
                                        <th className="py-3 px-6 text-left">Address</th>
                                        <th className="py-3 px-6 text-left">Contact Number</th>
                                        <th className="py-3 px-6 text-left">Verified</th>
                                        <th className="py-3 px-6 text-left">Registered Date</th>
                                    </tr>
                                    </thead>
                                    <tbody className="text-gray-600 text-sm">
                                    {businesses.map((business) => (
                                        <tr key={business.business_id} className="border-b hover:bg-gray-100 group">
                                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                                {business.business_name}
                                            </td>
                                            <td className="py-3 px-6 text-left">{business.user_id}</td>
                                            <td className="py-3 px-6 text-left">{business.description}</td>
                                            <td className="py-3 px-6 text-left">{business.Category.category_name}</td>
                                            <td className="py-3 px-6 text-left">{business.address}</td>
                                            <td className="py-3 px-6 text-left">{business.contact_number}</td>
                                            <td className="py-3 px-6 text-left">
                                                {business.is_verified ? "✅" : "❌"}
                                            </td>
                                            <td className="py-3 px-6 text-left">
                                                {new Date(business.date_registered).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    )}
                    {isDispute && (
                        <section className="p-4 w-full">
                            <h2 className="font-bold text-tr-0 mb-4">Disputes</h2>
                            <table className="min-w-full bg-white border rounded-lg shadow">
                                <thead className="bg-gray-200">
                                <tr>
                                    <th className="py-3 px-6 text-left">Complainant</th>
                                    <th className="py-3 px-6 text-left">Transaction ID</th>
                                    <th className="py-3 px-6 text-left">Reason</th>
                                    <th className="py-3 px-6 text-left">Status</th>
                                    <th className="py-3 px-6 text-left">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {disputes.map((dispute) => (
                                    <tr key={dispute.dispute_id} className="border-b hover:bg-gray-100 group">
                                        <td className="py-3 px-6 text-left">{dispute.Complainant.first_name} {dispute.Complainant.last_name}</td>
                                        <td className="py-3 px-6 text-left">{dispute.transaction_id}</td>
                                        <td className="py-3 px-6 text-left">{dispute.reason}</td>
                                        <td className="py-3 px-6 text-left">{dispute.status}</td>
                                        <td className="py-3 px-6 text-left">
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                {dispute.status === "PENDING" && ( // ✅ Only show button if status is PENDING
                                                    <button
                                                        className="text-green-500 hover:text-green-700"
                                                        onClick={() => setSelectedDispute(dispute)}
                                                    >
                                                        Resolve
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            {selectedDispute && (
                                <DisputeModal
                                    dispute={selectedDispute}
                                    onClose={() => setSelectedDispute(null)}
                                    onResolve={handleResolveDispute}
                                />
                            )}
                        </section>
                    )}
                    {isReviews && (
                        <section className="p-4 w-full">
                            <h2 className="font-bold mb-4">Reviews</h2>
                            <table className="min-w-full bg-white border rounded-lg shadow">
                                <thead className="bg-gray-200">
                                <tr>
                                    <th className="py-3 px-6">Reviewer</th>
                                    <th className="py-3 px-6">Business</th>
                                    <th className="py-3 px-6">Rating</th>
                                    <th className="py-3 px-6">Review</th>
                                    <th className="py-3 px-6">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {reviews.map((review) => (
                                    <tr key={review.review_id} className="border-b hover:bg-gray-100 group">
                                        <td className="py-3 px-6">{review.User.first_name} {review.User.last_name}</td>
                                        <td className="py-3 px-6">{review.Business.business_name}</td>
                                        <td className="py-3 px-6">{review.rating}</td>
                                        <td className="py-3 px-6">{review.review_text}</td>
                                        <td className="py-3 px-6">
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    className="text-blue-500 hover:text-blue-700"
                                                    onClick={() => setSelectedReview(review)}
                                                >
                                                    View
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            {selectedReview && (
                                <ReviewModal
                                    review={selectedReview}
                                    onClose={() => setSelectedReview(null)}
                                    onDelete={async (reviewId: number, reason: string) => {
                                        await deleteReview(reviewId, adminId, reason);
                                        fetchReviews();
                                        setSelectedReview(null);
                                    }}
                                />
                            )}
                        </section>
                    )}
                    {isUserVerifications && (
                        <section className="p-4 w-full">
                            <h2 className="font-bold mb-4 text-tr-0">User Verifications</h2>
                            <table className="min-w-full bg-white border rounded-lg shadow">
                                <thead className="bg-gray-200">
                                <tr>
                                    <th className="py-3 px-6 text-left">User</th>
                                    <th className="py-3 px-6 text-left">Status</th>
                                    <th className="py-3 px-6 text-left">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {userVerifications.map((verification) => (
                                    <tr key={verification.verification_id} className="border-b hover:bg-gray-100 group">
                                        <td className="py-3 px-6 text-left">
                                            {verification.User?.first_name} {verification.User?.last_name}
                                        </td>
                                        <td className="py-3 px-6 text-left">{verification.status}</td>
                                        <td className="py-3 px-6 text-left">
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    className="text-tr-0 hover:border-tr-0"
                                                    onClick={() => setSelectedVerification(verification)}
                                                >
                                                    View
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>

                            {selectedVerification && (
                                <UserVerificationModal
                                    verification={selectedVerification}
                                    onClose={() => setSelectedVerification(null)}
                                    onAction={async (verificationId: number, status: "APPROVED" | "DENIED", reason?: string) => {
                                        await reviewUserVerification(verificationId, status, adminId, reason);
                                        fetchUserVerifications();
                                        setSelectedVerification(null);
                                    }}
                                />
                            )}
                        </section>
                    )}
                    {isVerifications && (
                        <section className="p-4 w-full">
                            <h2 className="font-bold mb-4 text-tr-0">Business Verification Requests</h2>
                            <table className="min-w-full bg-white border rounded-lg shadow">
                                <thead className="bg-gray-200">
                                <tr>
                                    <th className="py-3 px-6 text-left">Business</th>
                                    <th className="py-3 px-6 text-left">Status</th>
                                    <th className="py-3 px-6 text-left">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {businessVerifications.map((request) => (
                                    <tr key={request.request_id} className="border-b hover:bg-gray-100 group">
                                        <td className="py-3 px-6 text-left">{request.Business?.business_name}</td>
                                        <td className="py-3 px-6 text-left">{request.status}</td>
                                        <td className="py-3 px-6 text-left">
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    className="text-tr-0 hover:border-tr-0"
                                                    onClick={() => setSelectedRequest(request)}
                                                >
                                                    View
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>

                            {selectedRequest && (
                                <RequestModal
                                    request={selectedRequest}
                                    onClose={() => setSelectedRequest(null)}
                                    onAction={async (requestId: number, status: "APPROVED" | "DENIED", reason?: string) => {
                                        await reviewBusinessVerification(requestId, status, adminId, reason);
                                        fetchBusinessVerifications();
                                        setSelectedRequest(null);
                                    }}
                                />
                            )}
                        </section>
                    )}
                </main>
            </div>

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
};

const SidebarItem: React.FC<{ icon: React.ReactNode; onClick: () => void }> = ({ icon, onClick }) => (
    <li
        className="font-semibold text-tr-0 hover:bg-gray-300 hover:rounded-2xl p-2 cursor-pointer flex flex-row items-center py-4"
        onClick={onClick}
    >
        {icon}
    </li>
);

export default AdminDashboard;