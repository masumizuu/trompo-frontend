import VanillaTilt from "vanilla-tilt";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Feature from "./components/Feature.tsx";

function LandingPage() {
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        // Initialize VanillaTilt for the content div
        const content = document.querySelector("#content-box");
        if (content) {
            // @ts-ignore
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
        <div className="min-h-[150vh]">

            <div className="flex flex-col">
                {/* Cursor Glow Effect */}
                <div
                    className="pointer-events-none fixed top-0 left-0 h-full z-10"
                    style={{
                        background: `radial-gradient(circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(255, 0, 0, 0.9) 0%, 
            rgba(255, 0, 0, 0.6) 8%, 
            rgba(255, 0, 0, 0.3) 14%, 
            rgba(255, 0, 0, 0) 20%)`,
                        mixBlendMode: "soft-light",
                        transition: "background 0.05s ease-out",
                    }}
                ></div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/pics/bg.png')",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                    }}
                >

                </motion.div>

                <Feature />
            </div>

        </div>

    );
}

export default LandingPage;