import { Outlet, useNavigate } from "react-router-dom";

function TrompoLayout() {
    const navigate = useNavigate();

    return (
        <div className="w-screen min-h-screen flex flex-col overflow-x-hidden">
        {/* Navbar */}
            <header className="w-full flex justify-between items-center py-4 px-8 bg-white shadow-md z-50">
                <div className="flex">
                    <img src="/logo.svg" alt="logo" className="h-10" />
                </div>
                <div className="flex gap-6">
                    <button className="px-4 py-2 border rounded-md text-sm" onClick={() => navigate("/login")}>Login</button>
                    <button className="px-4 py-2 border rounded-md text-sm" onClick={() => navigate("/signup")}>Signup</button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 w-full">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="w-full bg-[#fcfbf7] text-gray-800 py-8 z-50">
                <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
                    {/* About Us */}
                    <div>
                        <h3 className="font-semibold mb-2">About us</h3>
                        <p className="text-gray-600">
                            Trompo is one of the best platforms that helps small and local businesses get discovered.
                            Support local, support <em>trompo</em>! 🎀
                        </p>
                    </div>

                    {/* Important */}
                    <div>
                        <h3 className="font-semibold mb-2">Important</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-600 hover:underline">Who we are</a></li>
                            <li><a href="#" className="text-gray-600 hover:underline">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-600 hover:underline">Terms and Conditions</a></li>
                            <li><a href="#" className="text-gray-600 hover:underline">Technical Support</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold mb-2">Connect</h3>
                        <p className="text-gray-600">Mobile: <a className="cursor-pointer hover:underline">+63 960 452 7480</a></p>
                        <p className="text-gray-600">Mail: <a className="cursor-pointer hover:underline">support@trompo.com</a></p>
                    </div>

                    {/* Mobile Apps */}
                    <div>
                        <h3 className="font-semibold mb-2">FAQs</h3>
                        <div className="flex space-x-3">
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default TrompoLayout;