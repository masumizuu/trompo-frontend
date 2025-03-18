import { Outlet } from "react-router-dom";
import CustomFooter from "./components/CustomFooter";
import CustomHeader from "./components/CustomHeader";

function TrompoLayout() {

    return (
        <div className="w-screen min-h-screen flex flex-col overflow-x-hidden">
            {/* Navbar */}
            <header className="absolute top-0 w-full z-10">
                <CustomHeader />
            </header>

            {/* Main Content */}
            <main className="flex-1 w-full">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="z-1">
                <CustomFooter />
            </footer>
        </div>
    );
}

export default TrompoLayout;