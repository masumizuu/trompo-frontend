import { useNavigate } from "react-router-dom";
import VanillaTilt from "vanilla-tilt";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function LandingPage() {
    const navigate = useNavigate();
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        // Initialize VanillaTilt for the content div
        const content = document.querySelector("#content-box");
        if (content) {
            VanillaTilt.init(content, {
                max: 15,
                speed: 400,
                glare: true,
                "max-glare": 0.2,
            });
        }

        // Mouse move effect
        const handleMouseMove = (e: MouseEvent) => {
            setCursorPos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center w-full"
            style={{
                backgroundImage: "url('/pics/bg.png')",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
            }}
        >
            {/* Cursor Glow Effect */}
            <div
                className="pointer-events-none fixed top-0 left-0 w-full h-full z-50"
                style={{
                    background: `radial-gradient(circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(255, 0, 0, 0.9) 0%, 
            rgba(255, 0, 0, 0.6) 8%, 
            rgba(255, 0, 0, 0.3) 14%, 
            rgba(255, 0, 0, 0) 20%)`,
                    mixBlendMode: "soft-light",
                    transition: "background 0.05s ease-out",
                }}
            ></div>

            {/* Glassmorphism Content with Hover Effect */}
            {/*<motion.div*/}
            {/*    id="content-box"*/}
            {/*    initial={{ opacity: 0, y: 50, scale: 0.9 }}*/}
            {/*    animate={{ opacity: 1, y: 0, scale: 1 }}*/}
            {/*    transition={{ duration: 1, ease: "easeOut" }}*/}
            {/*    className="relative z-1 p-2 rounded-2xl bg-white/10 shadow-lg border border-white/20 backdrop-blur-lg text-center"*/}
            {/*>*/}

            {/*    <motion.button*/}
            {/*        initial={{ opacity: 0, y: 10 }}*/}
            {/*        animate={{ opacity: 1, y: 0 }}*/}
            {/*        transition={{ delay: 0.8, duration: 0.8 }}*/}
            {/*        className="px-6 py-2 rounded-full bg-transparent border-0 hover:text-tr-0 text-tr-0 transition"*/}
            {/*        onClick={() => navigate("/browse")}*/}
            {/*    >*/}
            {/*        Browse*/}
            {/*    </motion.button>*/}


            {/*</motion.div>*/}
        </motion.div>
    );
}

export default LandingPage;