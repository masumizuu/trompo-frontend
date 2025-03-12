export interface User {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    user_type: string;
    is_verified: boolean;
    date_registered: string;
}

export interface Location {
    location_id: number;
    city: string;
    province: string;
    postal_code: string;
}

export interface Sellable {
    sellable_id: number;
    name: string;
    type: "PRODUCT" | "SERVICE";
    price: number;
    description: string;
    media: string[];
    is_active: boolean;
}

export interface Category {
    category_id: number;
    category_name: string;
}

export interface Business {
    business_id: number;
    business_name: string;
    description: string;
    Category: Category;
    address: string;
    contact_number: string;
    website_url: string;
    is_verified: boolean;
    Locations: Location[];
    sellables: Sellable[];
    user_id: number;
    date_registered: string;
}

export interface Dispute {
    dispute_id: number;
    transaction_id: number;
    complainant_id: number;
    reason: string;
    status: "PENDING" | "RESOLVED" | "DISMISSED";
    admin_response?: string;
    Complainant: User; // For frontend ease-of-use
}

export interface Review {
    review_id: number;
    user_id: number;
    business_id: number;
    rating: number; // 1-5 stars
    review_text?: string;
    media: string[]; // Array of image/video URLs
    review_date: string;
    is_verified: boolean;
    User: User; // For frontend ease-of-use
    Business: Business; // For frontend ease-of-use
}

export interface UserVerification {
    verification_id: number;
    user_id: number;
    id_image: string; // Path to uploaded ID image
    status: "PENDING" | "APPROVED" | "DENIED";
    reviewed_by?: number | null; // Admin ID (optional)
    response_date?: string | null; // ISO Date string
    denial_reason?: string | null;
    User?: {
        first_name: string;
        last_name: string;
    }; // Populated when fetching with User details
}

export interface VerificationRequest {
    request_id: number;
    business_id: number;
    status: "PENDING" | "APPROVED" | "DENIED";
    business_permit: string; // Image URL
    request_date: string;
    reviewed_by?: number;
    response_date?: string;
    denial_reason?: string;
    Business: Business; // For frontend ease-of-use
}

// COMPONENTS PROPS

export interface EditUserModalProps {
    user: {
        user_id: number;
        first_name: string;
        last_name: string;
        email: string;
        phone_number: string;
        user_type: string;
        is_verified: boolean;
    };
    onClose: () => void;
    onSave: (updatedUser: any) => void;
}

export interface DisputeModalProps {
    dispute: Dispute;
    onClose: () => void;
    onResolve: (disputeId: number, adminResponse: string) => void;
}

export interface ReviewModalProps {
    review: Review;
    onClose: () => void;
    onDelete: (reviewId: number, reason: string) => void;
}

export interface RequestModalProps {
    request: {
        request_id: number;
        Business: {
            business_name: string;
        };
        request_date: string;
        business_permit: string; // URL or path to the uploaded business permit
    };
    onClose: () => void;
    onAction: (requestId: number, action: "APPROVED" | "DENIED", reason?: string) => Promise<void>;
}

export interface UserVerificationModalProps {
    verification: UserVerification;
    onClose: () => void;
    onAction: (verificationId: number, status: "APPROVED" | "DENIED", reason?: string) => void;
}


