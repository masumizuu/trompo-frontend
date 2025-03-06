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
