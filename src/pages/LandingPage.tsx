function LandingPage() {
    return (
        <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4 md:px-16 lg:px-32 text-center bg-[#fcfbf7]">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                Search. Connect.<br />Enable.
            </h1>
            <p className="mt-4 text-gray-600">
                The directory for small and local businesses in the Philippines.
            </p>

            <button className="mt-6 px-6 py-2 border-2 border-tr-0 rounded-full text-white hover:bg-tr-0 hover:border-tr-0 hover:text-white transition">
                Browse
            </button>

            {/* Floating Product Images */}
            <div className="absolute top-[30%] left-[10%] w-80 h-80">
                <img src="/gifs/lp2.gif" alt="Watch" className="w-full h-full object-contain" />
            </div>

            <div className="absolute top-[30%] right-[10%] w-80 h-80">
                <img src="/gifs/lp1.gif" alt="Headphones" className="w-full h-full object-contain" />
            </div>

            <div className="absolute -top-16 right-0 w-80 h-80">
                <img src="/gifs/lp3.gif" alt="Headphones" className="w-full h-full object-contain" />
            </div>

            <div className="absolute -bottom-16 left-0 w-96 h-96">
                <img src="/gifs/lp4.gif" alt="Headphones" className="w-full h-full object-contain" />
            </div>

        </div>
    );
}

export default LandingPage
