import { useParams } from "react-router-dom"
import {QRCodeSVG} from "qrcode.react"

const Entry = ({ data }) => {
    const id = useParams().id;
    const entry = data.find(item => item._id === id);

    if (!entry) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-md">
                    <h3 className="font-bold text-2xl text-blue-600 mb-4 text-center">Loading...</h3>
                    <p className="text-gray-700 text-center">Please wait while the information loads or it may not exist.</p>
                </div>
            </div>
        );
    }
    const imageUrl = `http://localhost:8000/images/${entry.file}`;
    // Prepare all data as JSON
    const qrData = JSON.stringify({
        username: entry.username,
        age: entry.age,
        file: imageUrl,
        id: entry._id
    });

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
                <img
                    src={`http://localhost:8000/images/${entry.file}`}
                    alt={entry.username}
                    className="h-32 w-32 object-cover rounded-full shadow mb-6 border-4 border-blue-200"
                />
                <h1 className="text-3xl font-bold text-blue-700 mb-2">{entry.username}</h1>
                <h2 className="text-xl text-gray-600 mb-4">Age: <span className="font-semibold">{entry.age}</span></h2>
                <div className="mt-4">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                        Entry ID: {entry._id}
                    </span>
                </div>
                <div className="mt-8 flex flex-col items-center">
                    <h3 className="text-lg font-semibold mb-2 text-gray-700">Scan to view image</h3>
                    {/* <QRCodeSVG value={imageUrl} size={128} /> */}
                    <QRCodeSVG value={qrData} size={128} />
                </div>
            </div>
        </div>
    );
}

export default Entry