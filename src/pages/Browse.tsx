import { Business, Sellable } from "../interfaces";
import { getAllBusinesses } from "../api";
import React, { useState, useEffect } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { TbArrowWaveLeftUp, TbArrowWaveRightUp } from "react-icons/tb";
import { BsShopWindow } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Browse: React.FC = () => {
    const navigate = useNavigate();

    const [page, setPage] = useState(1); // Pagination: 1 for Businesses, 2 for Sellables

    // ✅ Business State
    const [businesses, setBusinesses] = useState<Business[]>([]);
    const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [provinces, setProvinces] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedProvince, setSelectedProvince] = useState<string>("");
    const [selectedCity, setSelectedCity] = useState<string>("");

    // ✅ Sellable State
    const [sellables, setSellables] = useState<Sellable[]>([]);
    const [filteredSellables, setFilteredSellables] = useState<Sellable[]>([]);
    const [selectedAvailability, setSelectedAvailability] = useState<string>("");
    const [minPrice, setMinPrice] = useState<number | "">("");
    const [maxPrice, setMaxPrice] = useState<number | "">("");

    // ✅ Fetch Verified Businesses
    useEffect(() => {
        const fetchBusinesses = async () => {
            try {
                const data = await getAllBusinesses();
                const verifiedBusinesses = data.filter((biz: Business) => biz.is_verified);

                setBusinesses(verifiedBusinesses);
                setFilteredBusinesses(verifiedBusinesses);

                // ✅ Ensure the values are always `string[]`
                const uniqueCategories: string[] = Array.from(new Set(
                    verifiedBusinesses.map((biz: Business) => biz.Category.category_name as string)
                ));

                const uniqueProvinces: string[] = Array.from(new Set(
                    verifiedBusinesses.flatMap((biz: Business) => biz.Locations.map(loc => loc.province as string))
                ));

                const uniqueCities: string[] = Array.from(new Set(
                    verifiedBusinesses.flatMap((biz: Business) => biz.Locations.map(loc => loc.city as string))
                ));

                setCategories(uniqueCategories);
                setProvinces(uniqueProvinces);
                setCities(uniqueCities);

                // ✅ Extract All Sellables from Businesses
                const extractedSellables: Sellable[] = verifiedBusinesses.flatMap((biz: Business) =>
                    biz.sellables.map((sellable: Sellable) => ({
                        ...sellable,
                        business_name: biz.business_name, // Attach business name
                        business_id: biz.business_id, // attach business id
                    }))
                );
                setSellables(extractedSellables);
                setFilteredSellables(extractedSellables);
            } catch (error) {
                console.error("Failed to fetch businesses:", error);
            }
        };

        fetchBusinesses();
    }, []);

    // ✅ Filter Businesses When Filters Change
    useEffect(() => {
        let filtered = businesses;

        if (selectedCategory) {
            filtered = filtered.filter(biz => biz.Category.category_name === selectedCategory);
        }
        if (selectedProvince) {
            filtered = filtered.filter(biz =>
                biz.Locations.some(loc => loc.province === selectedProvince)
            );
        }
        if (selectedCity) {
            filtered = filtered.filter(biz =>
                biz.Locations.some(loc => loc.city === selectedCity)
            );
        }

        setFilteredBusinesses(filtered);
    }, [selectedCategory, selectedProvince, selectedCity]);

    // ✅ Filter Sellables
    useEffect(() => {
        let filtered = sellables;

        if (selectedAvailability) {
            filtered = filtered.filter(sellable =>
                selectedAvailability === "In Stock" ? sellable.is_active : !sellable.is_active
            );
        }

        if (minPrice !== "" || maxPrice !== "") {
            filtered = filtered.filter(sellable =>
                sellable.price >= Number(minPrice) && sellable.price <= Number(maxPrice)
            );
        }

        setFilteredSellables(filtered);
    }, [selectedAvailability, minPrice, maxPrice]);

    return (
        <section>
            <div className="w-full sm:px-6 sm:py-12 lg:px-8 "
                 style={{
                     backgroundImage: "url('/pics/1.png')",
                     backgroundSize: "cover",
                     backgroundPosition: "center",
                 }}
            >
                <div className="relative z-10 px-20 py-20">
                    {/* header */}
                    <div className={`flex items-center w-full ${page === 1 ? "justify-start text-left" : "justify-end text-right"}`}>

                        <div className="flex flex-col">
                            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl mb-4">
                                {page === 1 ? "Business Listings" : "Sellable Listings"}
                            </h2>
                            <p className="mt - 4 max-w-md text-gray-500">
                                { page === 1 ? "Browse verified businesses in different locations and categories."
                                    : "Browse our catalogue of different products by small and local businesses."}
                            </p>
                        </div>
                    </div>

                    {/* ✅ Filters (Conditional Rendering) */}
                    {page === 1 ? (
                        // ✅ Business Filters
                        <div className="mt-8 flex flex-wrap gap-4">
                            {/* Category Filter */}
                            <div className="relative w-48">
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="h-10 w-full border-b-2 border-black text-black text-sm px-2 bg-transparent appearance-none focus:outline-none"
                                >
                                    <option value="">All Categories</option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                                <MdArrowDropDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black pointer-events-none"/>
                            </div>

                            {/* Province Filter */}
                            <div className="relative w-48">
                                <select
                                    value={selectedProvince}
                                    onChange={(e) => setSelectedProvince(e.target.value)}
                                    className="h-10 w-full border-b-2 border-black text-black text-sm px-2 bg-transparent appearance-none focus:outline-none"
                                >
                                    <option value="">All Provinces</option>
                                    {provinces.map((province) => (
                                        <option key={province} value={province}>{province}</option>
                                    ))}
                                </select>
                                <MdArrowDropDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black pointer-events-none"/>
                            </div>

                            {/* City Filter */}
                            <div className="relative w-48">
                                <select
                                    value={selectedCity}
                                    onChange={(e) => setSelectedCity(e.target.value)}
                                    className="h-10 w-full border-b-2 border-black text-black text-sm px-2 bg-transparent appearance-none focus:outline-none"
                                >
                                    <option value="">All Cities</option>
                                    {cities.map((city) => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>
                                <MdArrowDropDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black pointer-events-none"/>
                            </div>
                        </div>
                    ) : (
                        // ✅ Sellable Filters
                        <div className="mt-8 flex flex-wrap gap-4">
                            {/* Availability Filter */}
                            <div className="relative w-48">
                                <select
                                    value={selectedAvailability}
                                    onChange={(e) => setSelectedAvailability(e.target.value)}
                                    className="h-10 w-full border-b-2 border-black text-black text-sm px-2 bg-transparent appearance-none focus:outline-none"
                                >
                                    <option value="">All</option>
                                    <option value="In Stock">In Stock</option>
                                    <option value="Out of Stock">Out of Stock</option>
                                </select>
                                <MdArrowDropDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black pointer-events-none"/>
                            </div>

                            {/* Price Range Filter */}
                            <div className="flex gap-2 items-center">
                                {/* Min Price */}
                                <input
                                    type="number"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : "")}
                                    placeholder="Min Price"
                                    className="h-10 w-24 border-b-2 border-black text-black text-sm px-2 bg-transparent appearance-none focus:outline-none"
                                />

                                <span className="text-black">-</span>

                                {/* Max Price */}
                                <input
                                    type="number"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : "")}
                                    placeholder="Max Price"
                                    className="h-10 w-24 border-b-2 border-black text-black text-sm px-2 bg-transparent appearance-none focus:outline-none"
                                />
                            </div>
                        </div>
                    )}

                    {/* ✅ Pagination Buttons */}
                    <TbArrowWaveLeftUp className={`absolute top-44 left-46 text-5xl rounded ${page === 2 ? "text-black" : "opacity-0"}`}
                                       onClick={() => setPage(1)} />
                    <TbArrowWaveRightUp className={`absolute top-44 right-44 text-5xl rounded ${page === 1 ? "text-black" : "opacity-0"}`}
                                        onClick={() => setPage(2)} />

                    {/* ✅ Listings */}
                    <ul className={`mt-8 grid gap-4 ${page === 1 ? "sm:grid-cols-1 lg:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-4"}`} >
                        {page === 1
                            ? filteredBusinesses.map((business) => (
                                <li key={business.business_id}>
                                    <a  onClick={() => navigate(`/store/${business.business_id}`)}
                                        className="group block overflow-hidden">
                                        <img
                                            src={business.banner || "/default-banner.png"}
                                            alt={business.business_name}
                                            className="h-72 object-cover transition duration-500 group-hover:scale-105 rounded-lg"
                                        />

                                        <div className="relative bg-transparent pt-3">
                                            <h3 className="text-gray-700 group-hover:underline group-hover:underline-offset-4 group-hover:text-tr-0">
                                                {business.business_name}
                                            </h3>
                                            <p className="text-gray-500">{business.Category.category_name}</p>

                                            {/* ✅ Display All Locations */}
                                            <p className="text-gray-500">
                                                {business.Locations.map(loc => `${loc.city}, ${loc.province}`).join(" • ")}
                                            </p>
                                        </div>
                                    </a>
                                </li>
                            ))
                            : filteredSellables.map((sellable) => (
                                <li key={sellable.sellable_id}>
                                    <a onClick={() => navigate(`/store/${sellable.business_id}#sellables`)}
                                       className="group block overflow-hidden">
                                        <img
                                            src={sellable.media[0] || "/default-product.png"}
                                            alt={sellable.name}
                                            className="h-72 object-cover transition duration-500 group-hover:scale-105 rounded-lg"
                                        />

                                        <div className="relative bg-transparent pt-3 py-4">
                                            <h3 className="text-gray-700 group-hover:underline group-hover:underline-offset-4 group-hover:text-tr-0">
                                                {sellable.name}
                                            </h3>
                                            <p className="text-gray-500 mt-2">₱{sellable.price} • {sellable.is_active ? "In Stock" : "Out of Stock"}</p>

                                            <span className="flex flex-row gap-2 items-center text-gray-500 mt-2">
                                            <BsShopWindow className="text-xl" />
                                             <p className="text-sm">{sellable.business_name}</p>
                                        </span>
                                        </div>
                                    </a>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default Browse;