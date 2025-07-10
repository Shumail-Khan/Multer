import { useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = ({data, fetchData}) => {
    const navigate = useNavigate();
    const [editing, setEditing] = useState(null); // holds the entry being edited
    const [editForm, setEditForm] = useState({ username: '', age: '', file: null });

    

    const deleteEntry = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/remove/${id}`);
            alert("Entry deleted successfully");
            fetchData();
        } catch (error) {
            console.error("Error deleting entry:", error);
        }
    };

    // Show the edit form with current data
    const startEdit = (item) => {
        setEditing(item._id);
        setEditForm({ username: item.username, age: item.age, file: null });
    };

    // Handle edit form changes
    const handleEditChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'file') {
            setEditForm({ ...editForm, file: files[0] });
        } else {
            setEditForm({ ...editForm, [name]: value });
        }
    };

    // Submit the update
    const submitEdit = async (id) => {
        const form = new FormData();
        form.append('username', editForm.username);
        form.append('age', editForm.age);
        if (editForm.file) form.append('file', editForm.file);

        try {
            await axios.put(`http://localhost:8000/api/update/${id}`, form, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert('Entry updated successfully');
            setEditing(null);
            fetchData();
        } catch (error) {
            console.error("Error updating entry:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8">
            <h1 className="text-3xl font-bold mb-6 text-blue-700">Home Page</h1>
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Form Data</h2>
                {data.length === 0 ? (
                    <p className="text-gray-500">No data available</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse">
                            <thead>
                                <tr className="bg-blue-100">
                                    <th className="border border-gray-300 p-3 text-left">Sr.No</th>
                                    <th className="border border-gray-300 p-3 text-left">Username</th>
                                    <th className="border border-gray-300 p-3 text-left">Age</th>
                                    <th className="border border-gray-300 p-3 text-left">File</th>
                                    <th className="border border-gray-300 p-3 text-left">Update</th>
                                    <th className="border border-gray-300 p-3 text-left">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-500 transition" 
                                        onClick={() => navigate(`/${item._id}`)}
                                    >
                                        <td className="border border-gray-300 p-3">{index + 1}</td>
                                        <td className="border border-gray-300 p-3">{item.username}</td>
                                        <td className="border border-gray-300 p-3">{item.age}</td>
                                        <td className="border border-gray-300 p-3">
                                            <img
                                                src={`http://localhost:8000/images/${item.file}`}
                                                alt={item.username}
                                                className="h-16 w-16 object-cover rounded shadow"
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-3">
                                            <button
                                                className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-black'
                                                onClick={e => {
                                                    e.stopPropagation(); // Prevent row click
                                                    startEdit(item);
                                                }}>
                                                Update
                                            </button>
                                        </td>
                                        <td className="border border-gray-300 p-3">
                                            <button
                                                className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-black'
                                                onClick={e => {
                                                    e.stopPropagation(); // Prevent row click
                                                    deleteEntry(item._id);
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Edit Modal/Form */}
                {editing && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                            <h3 className="text-lg font-bold mb-4">Update Entry</h3>
                            <form
                                onSubmit={e => {
                                    e.preventDefault();
                                    submitEdit(editing);
                                }}
                                className="flex flex-col gap-4"
                            >
                                <label>
                                    Username:
                                    <input
                                        type="text"
                                        name="username"
                                        value={editForm.username}
                                        onChange={handleEditChange}
                                        className="border p-2 rounded w-full"
                                        required
                                    />
                                </label>
                                <label>
                                    Age:
                                    <input
                                        type="number"
                                        name="age"
                                        value={editForm.age}
                                        onChange={handleEditChange}
                                        className="border p-2 rounded w-full"
                                        required
                                    />
                                </label>
                                <label>
                                    File:
                                    <input
                                        type="file"
                                        name="file"
                                        onChange={handleEditChange}
                                        className="border p-2 rounded w-full"
                                    />
                                </label>
                                <div className="flex gap-2">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    >
                                        Update
                                    </button>
                                    <button
                                        type="button"
                                        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                                        onClick={() => setEditing(null)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;