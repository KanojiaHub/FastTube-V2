import React from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';

const DownloadOptions = () => {
    const location = useLocation();
    const videoUrl = location.pathname.split('/').at(-1);
    console.log("URL -> ", videoUrl);

    const { title } = location.state || {}; // Extract videoUrl from state

    const handleDownload = async (quality) => {
        if (!videoUrl) {
            console.log("Video URL not available");
            return;
        }

        try {
            // Axios call to backend to download the video
            console.log("video url : ", videoUrl);
            const response = await axios.get(`http://localhost:4000/api/download`, {
                params: {
                    videoUrl: `/embed/${videoUrl}`, // Pass the embed URL
                    quality, // Pass the desired quality
                },
                responseType: 'blob', // Ensure the response is a Blob
            });


            console.log(response.data.message); // Log the success message
            alert(`Video downloaded successfully: ${response.data.path}`); 

            // Create a Blob and a download link
            const blob = new Blob([response.data], { type: 'video/mp4' });
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = `${title}-${quality}.mp4`; // Set the download filename
            document.body.appendChild(link);
            link.click(); // Trigger the download
            document.body.removeChild(link); // Cleanup
        } catch (error) {
            console.error("Error downloading the video:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center text-white min-h-screen bg-black p-6">
            <h1 className="text-2xl font-bold mb-6">Download Options for {title}</h1>
            <button onClick={() => handleDownload("1080p")} className="mb-4 px-6 py-2 bg-blue-600 rounded-lg">Download 1080p</button>
            <button onClick={() => handleDownload("720p")} className="mb-4 px-6 py-2 bg-green-600 rounded-lg">Download 720p</button>
            <button onClick={() => handleDownload("480p")} className="mb-4 px-6 py-2 bg-yellow-600 rounded-lg">Download 480p</button>
            <button onClick={() => handleDownload("audio")} className="mb-4 px-6 py-2 bg-red-600 rounded-lg">Download Audio</button>
        </div>
    );
};

export default DownloadOptions;
