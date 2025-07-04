import Image from 'next/image';

// This function defines and displays the header and titles of the Manager view interface. 
export default function ManagerHeader({ switchPage }) {
    // This handleGoBack function implements the function of switching to another page. 
    const handleGoBack = () => {
        switchPage('loginPage'); // Redirects back to the login page
    };
    
    // Display on the frontend interface. 
    return (
        <header className="flex justify-between items-center h-32 bg-red-600 text-white px-6 fixed top-0 left-0 w-full z-50">
            {/* Left side: Logo and title */}
            <div className="flex items-center">
                <Image 
                    src="/PELogo.png" 
                    alt="Panda Express Logo" 
                    width={80} 
                    height={80} 
                    className="mr-4"
                />
                <h1 className="text-2xl text-white font-semibold ml-5">
                    Manager View
                </h1>
            </div>

            {/* Right side: Manager View */}
            <button 
                onClick={handleGoBack} 
                className="bg-red-600 text-white font-semibold py-3 px-4 rounded-lg border-2 border-white hover:bg-red-700"
            >
                Log Out
            </button>
            {/* <h2 className="text-lg font-semibold">
                Manager View
            </h2> */}
        </header>
    );
}