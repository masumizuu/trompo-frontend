import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { BsStars } from "react-icons/bs";

const Feature: React.FC = () => {
    const navigate = useNavigate();

    return (
        <>
            <motion.section
                className="bg-cover bg-center bg-no-repeat h-[50vh]"
                style={{
                    backgroundImage: "url('/pics/bg2.png')", // Background image
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="container mx-auto py-10 flex flex-col">
                    <motion.h1
                        className="text-3xl font-semibold text-tr-0 lg:text-4xl mt-10"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Why choose <span className="underline decoration-tr-0 font-bold italic">trompo</span>
                    </motion.h1>

                    <motion.p
                        className="text-gray-700 mt-2"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum
                        quam voluptatibus
                    </motion.p>

                    <div className="flex flex-row gap-4">

                        <motion.div
                            className="grid grid-cols-3 gap-8 mt-6 xl:mt-6 xl:gap-12"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            {/* First feature */}
                            <motion.div
                                className="p-8 space-y-3 border-2 border-tr-0 border-tr-0 rounded-xl"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                            <span className="inline-block text-tr-0">
                                <FaSearch className="h-8 w-8 text-tr-0"/>
                            </span>

                                <motion.h1
                                    className="text-2xl font-semibold text-gray-700 capitalize text-tr-0"
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                >
                                    Effortless Navigation & Search
                                </motion.h1>

                                <p className="text-gray-700">
                                    Our intuitive platform allows you to browse businesses by category, location, or services offered—so you can find exactly what you need in just a few clicks.
                                </p>

                            </motion.div>

                            {/* Second feature */}
                            <motion.div
                                className="p-8 space-y-3 border-2 border-tr-0 border-tr-0 rounded-xl"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                            <span className="inline-block text-tr-0">
                                <MdVerified className="h-8 w-8 text-tr-0"/>
                            </span>

                                <motion.h1
                                    className="text-2xl font-semibold text-gray-700 capitalize text-tr-0"
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                >
                                    Verified Listings & Reviews
                                </motion.h1>

                                <p className="text-gray-700">
                                    We prioritize quality and reliability by featuring verified businesses and authentic customer reviews, ensuring you make informed decisions.
                                </p>

                            </motion.div>

                            {/* Glassmorphism Content with Hover Effect */}
                            <motion.div
                                id="content-box"
                                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="relative flex flex-col z-1 p-8 space-y-3 rounded-2xl bg-white/10 shadow-lg border border-tr-0/20 backdrop-blur-lg text-center items-start justify-start"
                            >

                                <span className="inline-block text-tr-0">
                                <BsStars className="h-8 w-8 text-tr-0"/>
                            </span>

                                <motion.h1
                                    className="text-2xl font-semibold text-gray-700 capitalize text-tr-0"
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                >
                                    Browse & Discover with Ease
                                </motion.h1>

                                <p className="text-gray-700 text-left">
                                    Explore a diverse range of businesses, compare offerings, and make the best choice for your needs.
                                </p>

                                <motion.button
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8, duration: 0.8 }}
                                    className="py-2 rounded-full bg-transparent border-tr-0 hover:text-darkTR-0 text-tr-0 hover:border-darkTR-0 transition"
                                    onClick={() => navigate("/browse")}
                                >
                                    Browse
                                </motion.button>
                            </motion.div>

                        </motion.div>

                    </div>

                </div>
            </motion.section>

        </>
    );
};

export default Feature;
