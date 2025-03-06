const API_BASE_URL = "http://localhost:5300/api";

/////////////////////////////////////////////////////////
// AUTH CALLS
/////////////////////////////////////////////////////////

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