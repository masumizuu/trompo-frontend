import {Business} from "./interfaces.ts";

const API_BASE_URL = "http://localhost:5300/api";

/////////////////////////////////////////////////////////
// AUTH CALLS
/////////////////////////////////////////////////////////

export const registerUser = async (userData: {
    first_name: string;
    last_name: string;
    email?: string;
    phone_number?: string;
    password: string;
    user_type: "CUSTOMER" | "BUSINESS_OWNER";
}) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Registration failed");
    }

    // ✅ Store user session details in localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("user_id", data.user.user_id.toString());
    localStorage.setItem("user_type", data.user.user_type);
    localStorage.setItem("profile_picture", data.user.profile_picture || "/default-profile.jpg");

    return data;
};


// ✅ Login User (Store user_id, token, and user_type in localStorage)
export const loginUser = async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();

    // Store user data in localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("user_id", data.user.user_id.toString());
    localStorage.setItem("user_type", data.user.user_type);
    localStorage.setItem("profile_picture", data.user.profile_picture);

    return data;
};

// ✅ Fetch all users
export const getAllUsers = async () => {
    const response = await fetch(`${API_BASE_URL}/auth/all`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Fetching all users failed.");
    }

    return await response.json();
};

// ✅ Fetch User by ID
export const getUserById = async (user_id: number) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/auth/${user_id}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch user data.");
    }

    return await response.json();
};

// ✅ Edit User
export const editUser = async (user_id: number, userData: Partial<{
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    user_type: string;
    is_verified: boolean;
}>) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/auth/${user_id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update user.");
    }

    return await response.json();
};

// ✅ Delete User
export const deleteUser = async (user_id: number) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/auth/${user_id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete user.");
    }

    return await response.json();
};

/////////////////////////////////////////////////////////
// USER VERIFICATION CALLS
/////////////////////////////////////////////////////////

// ✅ User Submits ID for Verification
export const submitUserVerification = async (formData: FormData, userId: string) => {
    // Append the user ID to the FormData
    formData.append("user_id", userId);

    const response = await fetch(`${API_BASE_URL}/users/verify`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit user verification.");
    }

    return await response.json();
};

// ✅ Admin Fetches All Pending User Verifications
export const getUserVerifications = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/users/verifications`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch user verifications.");
    }

    return await response.json();
};

// ✅ Admin Approves or Denies User Verification
export const reviewUserVerification = async (verificationId: number, status: "APPROVED" | "DENIED", adminId: number, denialReason?: string) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/users/verifications/${verificationId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ status, admin_id: adminId, denial_reason: denialReason }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to review user verification.");
    }

    return await response.json();
};

/////////////////////////////////////////////////////////
// BUSINESS CALLS
/////////////////////////////////////////////////////////

// ✅ Fetch Business by Owner (user_id)
export const getBusinessByOwner = async (user_id: string) => {
    const response = await fetch(`${API_BASE_URL}/businesses/owner/${user_id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch business.");
    }

    return await response.json();
};

// ✅ Get Business by ID (Includes Sellables with Media)
export const getBusinessById = async (businessId: number): Promise<Business> => {
    const response = await fetch(`${API_BASE_URL}/businesses/${businessId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch business details.");
    }

    return await response.json();
};

// ✅ Fetch all users
export const getAllBusinesses = async () => {
    const response = await fetch(`${API_BASE_URL}/businesses/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Fetching all users failed.");
    }

    return await response.json();
};

// ✅ Update Business (Only Owner or Admin)
export const updateBusiness = async (business_id: number, user_id: number, businessData: Partial<{
    business_name: string;
    description: string;
    category_id: number;
    address: string;
    contact_number: string;
    website_url?: string;
}>) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/businesses/${business_id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id, ...businessData }),
    });

    if (!response.ok) {
        throw new Error("Failed to update business.");
    }

    return await response.json();
};

// ✅ Delete Business (Only Owner or Admin)
export const deleteBusiness = async (business_id: number, user_id: number) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/businesses/${business_id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id }),
    });

    if (!response.ok) {
        throw new Error("Failed to delete business.");
    }

    return await response.json();
};

// ✅ Business Owner Submits Business Verification Request
export const submitBusinessVerification = async (formData: FormData, businessId: string) => {
    // Append the business ID to the FormData
    formData.append("business_id", businessId);

    const token = localStorage.getItem("token");  // Get the token from localStorage
    const response = await fetch(`${API_BASE_URL}/businesses/verify`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
        body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit business verification.");
    }

    return await response.json();
};

// ✅ Admin Fetches All Pending Business Verifications
export const getBusinessVerifications = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/businesses/verifications/all`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch business verifications.");
    }

    return await response.json();
};

// ✅ Admin Approves or Denies Business Verification
export const reviewBusinessVerification = async (verificationId: number, status: "APPROVED" | "DENIED", adminId: number, denialReason?: string) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/businesses/verifications/${verificationId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ status, admin_id: adminId, denial_reason: denialReason }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to review business verification.");
    }

    return await response.json();
};

// ✅ Add a new sellable (product/service)
export const addSellable = async (business_id: number, sellableData: any) => {
    const response = await fetch(`${API_BASE_URL}/sellables`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ business_id, ...sellableData }),
    });
    if (!response.ok) throw new Error("Failed to add sellable.");
    return response.json();
};

export const editSellable = async (sellable_id: number, user_id: string, updatedData: any) => {
    const token = localStorage.getItem("token"); // ✅ Retrieve token from localStorage

    const response = await fetch(`http://localhost:5300/api/businesses/sellable/${sellable_id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // ✅ Send token
        },
        body: JSON.stringify({ user_id, ...updatedData }),
    });

    if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Failed to edit sellable.");
    }

    return response.json();
};

// ✅ Delete a sellable
export const deleteSellable = async (sellable_id: number) => {
    const response = await fetch(`${API_BASE_URL}/businesses/sellable/${sellable_id}`, {
        method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete sellable.");
    return response.json();
};

/////////////////////////////////////////////////////////
// DISPUTE CALLS
/////////////////////////////////////////////////////////

// ✅ File a Dispute
export const fileDispute = async (user_id: number, transaction_id: number, reason: string) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/disputes/file`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id, transaction_id, reason }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to file dispute.");
    }

    return await response.json();
};

// ✅ Get all pending disputes (Admin only)
export const getPendingDisputes = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/disputes/pending`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch pending disputes.");
    }

    return await response.json();
};

// ✅ Get all disputes (Admin only)
export const getAllDisputes = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/disputes/all`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch all disputes.");
    }

    return await response.json();
};

// ✅ Resolve a dispute (Admin only)
export const resolveDispute = async (dispute_id: number, status: string, admin_response: string) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/disputes/${dispute_id}/resolve`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ status, admin_response }),
    });

    if (!response.ok) {
        throw new Error("Failed to resolve dispute.");
    }

    return await response.json();
};

/////////////////////////////////////////////////////////
// REVIEW CALLS
/////////////////////////////////////////////////////////

// ✅ Create a Review
export const createReview = async (user_id: number, business_id: number, rating: number, review_text: string, media: string[]) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/reviews/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id, business_id, rating, review_text, media }),
    });

    if (!response.ok) {
        throw new Error("Failed to submit review.");
    }

    return await response.json();
};

// ✅ Get all reviews for a business
export const getBusinessReviews = async (business_id: number) => {
    const response = await fetch(`${API_BASE_URL}/reviews/${business_id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch business reviews.");
    }

    return await response.json();
};

// ✅ Get all reviews (Admin only)
export const getAllReviews = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/reviews`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch all reviews.");
    }

    return await response.json();
};

// ✅ Delete a Review (Admin Only)
export const deleteReview = async (review_id: number, admin_id: number, reason: string) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/reviews/${review_id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ admin_id, reason }),
    });

    if (!response.ok) {
        throw new Error("Failed to delete review.");
    }

    return await response.json();
};

/////////////////////////////////////////////////////////
// TRANSACTION CALLS
/////////////////////////////////////////////////////////

// ✅ Create a Transaction
export const createTransaction = async (customer_id: number, business_id: number, items: { sellable_id: number; quantity: number }[]) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/transactions/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ customer_id, business_id, items }),
    });

    if (!response.ok) {
        throw new Error("Failed to create transaction.");
    }

    return await response.json();
};

// ✅ Get transactions for a specific user
export const getUserTransactions = async (user_id: number) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/transactions/${user_id}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch user transactions.");
    }

    return await response.json();
};

// ✅ Business Owner Marks Transaction as Completed
export const markTransactionCompleted = async (transaction_id: number, user_id: number) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/transactions/${transaction_id}/complete`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id }),
    });

    if (!response.ok) {
        throw new Error("Failed to complete transaction.");
    }

    return await response.json();
};

// ✅ Customer Confirms Completion or Marks as Incomplete
export const confirmOrRejectTransaction = async (transaction_id: number, user_id: number, status: "FINISHED" | "INCOMPLETE", reason_incomplete?: string) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/transactions/${transaction_id}/confirm`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id, status, reason_incomplete }),
    });

    if (!response.ok) {
        throw new Error("Failed to update transaction status.");
    }

    return await response.json();
};

// ✅ Get all transactions (Admin only)
export const getAllTransactions = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/transactions`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch all transactions.");
    }

    return await response.json();
};

/////////////////////////////////////////////////////////
// CHAT CALLS
/////////////////////////////////////////////////////////

// Fetch the chat history between two users
export const getChatHistory = async (senderId: string, receiverId: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/chats/${senderId}/${receiverId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // Include authorization if needed (e.g., Bearer token)
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
        if (!response.ok) {
            throw new Error("Failed to fetch chat history.");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching chat history:", error);
        throw error;
    }
};

// Send a message from the sender to the receiver
export const sendMessage = async (senderId: string, receiverId: string, message: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/chats/send`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                senderId,
                receiverId,
                message
            })
        });
        if (!response.ok) {
            throw new Error("Failed to send message.");
        }
        return await response.json(); // Return the sent message data
    } catch (error) {
        console.error("Error sending message:", error);
        throw error;
    }
};

export const getUnreadMessages = async (businessId: string) => {
    try {
        const token = localStorage.getItem("token"); // Assuming your token is stored in localStorage
        if (!token) {
            throw new Error("No token found. Please log in.");
        }

        const response = await fetch(`${API_BASE_URL}/chats/unread/${businessId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // Include the token in the Authorization header
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch unread chats.");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching unread messages:", error);
        throw error;
    }
};
