import { useState, useEffect } from 'react';
import { MenuRow } from '@/app/components';
import { ManagerHeader } from '../../components';

// The function implements the backend of Menu Items Page
export default function MenuItemsPage({ switchPage }) {
    // Declare state variables and functions to update it.          
    // The initial value of each state variables is set by useState.   
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(false); 
    const [ID, setID] = useState('');
    const [name, setName] = useState('');
    const [inventory,setInventory] = useState('');
    const [type, setType] = useState('');


    const handleGoBack = () => {
        switchPage('managerMainPage'); // Redirects back to the login page
    };

    const fetchData = async () => {
        try {
            setLoading(true)
            const res = await fetch('./pages/api/menu/read');
            if (!res.ok) {
                throw new Error('Failed to fetch menu');
            }
            const data = await res.json();
            setMenuItems(data); // Update the inventory state

        } catch (err) {
            console.error('Error:', err);
            setError(err.message);
        } finally {
            setLoading(false); // Set loading to false after the request is complete

        }
    };

    // This function sends the POST request for creating a new menu item. 
    async function addNew() {
        try {
            // The Path of API endpoint
            const response = await fetch("./pages/api/menu/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                // Defines the request body so that the server side can use relevant data. 
                body:JSON.stringify({
                    "ID":ID,
                    "name":name,
                    "inventory":inventory,
                    "type":type
                })
            });
            // Check if the server side works well. 
            if(response.ok) {
                console.log("Add Successful");
                fetchData();
            }
            else {
                console.log("Error: ", response.status);
            }
        }
        catch (error) {
            console.error('Error: ', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <p>Loading...</p>; // Display a loading message while fetching data
    }

    if (error) {
        return <p>Error: {error}</p>; // Display error message if fetching fails
    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-200">
            <ManagerHeader switchPage={switchPage}/>
            <h1 className="text-4xl font-bold mb-8 mt-32">Menu Items</h1>
            {menuItems.length > 0 ? (
                <table className='table-auto border-collapse border-gray-400'>
                    <thead>
                        <tr>
                            <th className="border border-gray-400 px-4 py-2">ID</th>
                            <th className="border border-gray-400 px-4 py-2">Name</th>
                            <th className="border border-gray-400 px-4 py-2">Inventory</th>
                            <th className="border border-gray-400 px-4 py-2">Type</th>
                            <th className="border border-gray-400 px-4 py-2">Save Change</th>
                            <th className="border border-gray-400 px-4 py-2">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menuItems.map((item) => (
                            <MenuRow key={item.item_id} item={item} fetchData={fetchData}></MenuRow>
                        ))}
                        <tr key={-1}>
                            <td className="border border-gray-400 px-4 py-2">
                                <input
                                    type="text"
                                    className='new'
                                    onChange={(e) => setID(e.target.value)}
                                />
                            </td>
                            <td className="border border-gray-400 px-4 py-2">
                                <input
                                    type="text"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </td>
                            <td className="border border-gray-400 px-4 py-2">
                                <input
                                    type="text"
                                    onChange={(e) => setInventory(e.target.value)}
                                />
                            </td>
                            <td className="border border-gray-400 px-4 py-2">
                                <input
                                    type="text"
                                    onChange={(e) => setType(e.target.value)}
                                />
                            </td>
                            <td className="border border-gray-400 px-4 py-2">
                                <button onClick={() => addNew()}>&#x2705;</button>
                            </td>
                            <td className="border border-gray-400 px-4 py-2">
                                <button>&#10060;</button>
                            </td>
                        </tr>  
                    </tbody>
                </table>

            ) : (
                <p>no menu items found </p>
            )}

            <button
                onClick={handleGoBack}
                className="mt-5 p-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
            >
                Back
            </button>
        </div>
    );
}